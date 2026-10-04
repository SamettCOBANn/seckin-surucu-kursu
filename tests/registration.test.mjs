// Run with: node --test tests/registration.test.mjs
// Transpile the pure modules in memory with the existing TypeScript dependency.
// Build validation separately checks their types; no generated test files remain.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadTypeScript(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { getNextRegistrationDeadline: calculate } = await loadTypeScript("../src/lib/registration.ts");
const { registrationPolicy: policy } = await loadTypeScript("../src/content/registration.ts");

const cases = [
  ["before cutoff day", "2026-10-09T12:00:00+03:00", "2026-10-10T15:00:00.000Z", 2026, 10],
  ["one minute before", "2026-10-10T17:59:00+03:00", "2026-10-10T15:00:00.000Z", 2026, 10],
  ["one millisecond before", "2026-10-10T14:59:59.999Z", "2026-10-10T15:00:00.000Z", 2026, 10],
  ["exact cutoff", "2026-10-10T18:00:00+03:00", "2026-11-10T15:00:00.000Z", 2026, 11],
  ["after cutoff", "2026-10-11T09:00:00+03:00", "2026-11-10T15:00:00.000Z", 2026, 11],
  ["year rollover", "2026-12-10T18:01:00+03:00", "2027-01-10T15:00:00.000Z", 2027, 1],
  ["leap day", "2028-02-29T12:00:00+03:00", "2028-03-10T15:00:00.000Z", 2028, 3],
  ["UTC equivalent", "2026-10-10T15:00:00Z", "2026-11-10T15:00:00.000Z", 2026, 11],
  ["different offset", "2026-10-10T08:00:00-07:00", "2026-11-10T15:00:00.000Z", 2026, 11],
  ["Istanbul month differs from UTC", "2026-10-31T22:00:00Z", "2026-11-10T15:00:00.000Z", 2026, 11],
];
for (const [name, now, expected, year, month] of cases) {
  test(name, () => {
    const result = calculate(new Date(now), policy);
    assert.equal(result.deadline.toISOString(), expected);
    assert.deepEqual(result.period, { year, month });
    assert.equal(result.isOverride, false);
  });
}

const november = {
  period: { year: 2026, month: 11 },
  deadline: { year: 2026, month: 11, day: 12, hour: 17, minute: 0 },
  note: "Test exception",
};
test("override replaces normal cutoff and expires at its exact boundary", () => {
  const config = { ...policy, overrides: [november] };
  const result = calculate(new Date("2026-11-11T12:00:00Z"), config);
  assert.equal(result.deadline.toISOString(), "2026-11-12T14:00:00.000Z");
  assert.deepEqual(result.period, november.period);
  assert.equal(result.isOverride, true);
  const next = calculate(new Date("2026-11-12T14:00:00Z"), config);
  assert.equal(next.deadline.toISOString(), "2026-12-10T15:00:00.000Z");
  assert.equal(next.isOverride, false);
});
test("consecutive overrides and early cutoff", () => {
  const december = { ...november, period: { year: 2026, month: 12 },
    deadline: { year: 2026, month: 12, day: 5, hour: 16, minute: 0 } };
  const config = { ...policy, overrides: [november, december] };
  assert.equal(calculate(new Date("2026-11-12T14:00:00Z"), config).deadline.toISOString(), "2026-12-05T13:00:00.000Z");
  assert.equal(calculate(new Date("2026-12-05T13:00:00Z"), config).deadline.toISOString(), "2027-01-10T15:00:00.000Z");
});
test("an extended previous period retains its identity across month rollover", () => {
  const extended = { ...november, deadline: { year: 2026, month: 12, day: 2, hour: 18, minute: 0 } };
  const config = { ...policy, overrides: [extended] };
  assert.deepEqual(calculate(new Date("2026-12-01T12:00:00Z"), config).period, november.period);
  assert.deepEqual(calculate(new Date("2026-12-02T15:00:00Z"), config).period, { year: 2026, month: 12 });
});
test("leap-day override", () => {
  const leap = { ...november, period: { year: 2028, month: 2 },
    deadline: { year: 2028, month: 2, day: 29, hour: 18, minute: 0 } };
  assert.equal(calculate(new Date("2028-02-28T12:00:00Z"), { ...policy, overrides: [leap] }).deadline.toISOString(), "2028-02-29T15:00:00.000Z");
});
test("invalid dates, policy values, and duplicate overrides are rejected", () => {
  const now = new Date("2026-10-01T00:00:00Z");
  assert.throws(() => calculate(new Date(NaN), policy), RangeError);
  for (const config of [
    { ...policy, dayOfMonth: 0 }, { ...policy, dayOfMonth: 29 },
    { ...policy, dayOfMonth: 10.5 }, { ...policy, cutoff: { hour: 24, minute: 0 } },
    { ...policy, cutoff: { hour: 18, minute: 60 } },
    { ...policy, timeZone: "UTC" }, { ...policy, overrides: [november, november] },
    { ...policy, overrides: [{ ...november, deadline: { ...november.deadline, month: 2, day: 29 } }] },
  ]) assert.throws(() => calculate(now, config), RangeError);
});
test("same input stays deterministic and unmodified under different host timezones", () => {
  const previous = process.env.TZ;
  const now = new Date("2026-10-10T15:00:00Z");
  const originalTime = now.getTime();
  const originalPolicy = JSON.stringify(policy);
  try {
    for (const zone of ["UTC", "America/Los_Angeles", "Asia/Tokyo"]) {
      process.env.TZ = zone;
      assert.equal(calculate(now, policy).deadline.toISOString(), "2026-11-10T15:00:00.000Z");
    }
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
  assert.equal(now.getTime(), originalTime);
  assert.equal(JSON.stringify(policy), originalPolicy);
});
