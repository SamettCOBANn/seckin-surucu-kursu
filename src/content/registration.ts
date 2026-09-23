import type { RegistrationPolicy } from "@/types/registration";

// Policy only. Future calculation must use server time and calendar-month rollover.
// At 18:00 the period closes; a matching manual override takes precedence.
export const registrationPolicy = {
  recurrence: "monthly",
  dayOfMonth: 10,
  cutoff: { hour: 18, minute: 0 },
  timeZone: "Europe/Istanbul",
  cutoffBoundary: "exclusive",
  requiresCompleteDocuments: true,
  overrides: [],
} as const satisfies RegistrationPolicy;
