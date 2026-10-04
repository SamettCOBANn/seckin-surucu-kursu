export interface RegistrationDeadline {
  readonly deadline: Date;
  readonly period: { readonly year: number; readonly month: number };
  readonly isOverride: boolean;
}

export interface RegistrationOverride {
  /** Identifies the registration period, independently of its exceptional deadline. */
  readonly period: { readonly year: number; readonly month: number };
  /** Local calendar date and time interpreted in the policy's timezone. */
  readonly deadline: {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
  };
  readonly note: string;
}

export interface RegistrationPolicy {
  readonly recurrence: "monthly";
  readonly dayOfMonth: number;
  readonly cutoff: { readonly hour: number; readonly minute: number };
  readonly timeZone: "Europe/Istanbul";
  readonly cutoffBoundary: "exclusive";
  readonly requiresCompleteDocuments: boolean;
  readonly overrides: readonly RegistrationOverride[];
}
