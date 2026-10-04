import type {
  RegistrationDeadline,
  RegistrationOverride,
  RegistrationPolicy,
} from "@/types/registration";

type LocalDeadline = RegistrationOverride["deadline"];
type Period = RegistrationOverride["period"];

const localClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Istanbul",
  calendar: "gregory",
  numberingSystem: "latn",
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit",
  hourCycle: "h23",
});

function localParts(instant: Date): LocalDeadline & { second: number } {
  const parts = localClock.formatToParts(instant);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return {
    year: read("year"), month: read("month"), day: read("day"),
    hour: read("hour"), minute: read("minute"), second: read("second"),
  };
}

// UTC is used as a calendar workspace, not as the business timezone.
function calendarTimestamp(local: LocalDeadline, second = 0): number {
  const date = new Date(0);
  date.setUTCFullYear(local.year, local.month - 1, local.day);
  date.setUTCHours(local.hour, local.minute, second, 0);
  return date.getTime();
}

function integerInRange(value: number, min: number, max: number): void {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`Expected an integer between ${min} and ${max}; received ${value}.`);
  }
}

function validatePeriod(period: Period): void {
  integerInRange(period.year, 1, 9999);
  integerInRange(period.month, 1, 12);
}

function validateLocal(local: LocalDeadline): void {
  validatePeriod(local);
  integerInRange(local.day, 1, 31);
  integerInRange(local.hour, 0, 23);
  integerInRange(local.minute, 0, 59);
  if (new Date(calendarTimestamp(local)).getUTCDate() !== local.day) {
    throw new RangeError("The configured deadline is not a valid calendar date.");
  }
}

function toInstant(local: LocalDeadline): Date {
  validateLocal(local);
  const wallTime = calendarTimestamp(local);
  const matches = new Set<number>();
  // Intl converts instants to local time, not the reverse. Sample nearby offsets,
  // then round-trip candidates. Never silently choose a DST gap/fold interpretation.
  for (const hours of [-24, 0, 24]) {
    const sample = wallTime + hours * 60 * 60 * 1000;
    const parts = localParts(new Date(sample));
    const offset = calendarTimestamp(parts, parts.second) - sample;
    const candidate = wallTime - offset;
    const roundTrip = localParts(new Date(candidate));
    if (calendarTimestamp(roundTrip, roundTrip.second) === wallTime) {
      matches.add(candidate);
    }
  }
  if (matches.size !== 1) {
    throw new RangeError("The Istanbul deadline is nonexistent or ambiguous in timezone data.");
  }
  const [timestamp] = matches;
  return new Date(timestamp);
}

function periodIndex(period: Period): number {
  return period.year * 12 + period.month - 1;
}

/**
 * Returns the first unclosed registration period, starting with the current
 * Istanbul month (or an earlier period whose override is still open).
 * At the exact cutoff the period is closed. Neither argument is mutated.
 */
export function getNextRegistrationDeadline(
  now: Date,
  policy: RegistrationPolicy,
): RegistrationDeadline {
  if (!Number.isFinite(now.getTime())) throw new RangeError("now must be a valid instant.");
  if (policy.timeZone !== "Europe/Istanbul" || policy.recurrence !== "monthly" ||
      policy.cutoffBoundary !== "exclusive") {
    throw new RangeError("Unsupported registration policy semantics.");
  }
  // A recurring day must exist in every month; special dates use overrides.
  integerInRange(policy.dayOfMonth, 1, 28);
  integerInRange(policy.cutoff.hour, 0, 23);
  integerInRange(policy.cutoff.minute, 0, 59);
  const localNow = localParts(now);
  validatePeriod(localNow);
  let index = periodIndex(localNow);
  const overrides = new Map<number, Date>();
  for (const override of policy.overrides) {
    validatePeriod(override.period);
    const key = periodIndex(override.period);
    if (overrides.has(key)) throw new RangeError("Duplicate registration-period override.");
    const deadline = toInstant(override.deadline);
    overrides.set(key, deadline);
    if (deadline.getTime() > now.getTime()) index = Math.min(index, key);
  }

  // Finite overrides may move several consecutive deadlines into the past.
  // Advancing the period, rather than adding days, also handles year rollover.
  while (index <= 9999 * 12 + 11) {
    const period = { year: Math.floor(index / 12), month: index % 12 + 1 };
    const override = overrides.get(index);
    const deadline = override ?? toInstant({
      ...period, day: policy.dayOfMonth,
      hour: policy.cutoff.hour, minute: policy.cutoff.minute,
    });
    if (now.getTime() < deadline.getTime()) {
      return { deadline, period, isOverride: override !== undefined };
    }
    index += 1;
  }
  throw new RangeError("The next deadline exceeds the supported calendar range.");
}
