/** Monetary fields ending in Kurus contain integer minor units, never formatted text. */
export interface PricingSource {
  readonly note: string;
  readonly verification: "user-supplied" | "authority-verified";
  readonly authoritativeUrl: `https://${string}` | null;
  readonly verifiedAt: string | null;
}

export type CourseFee = {
  readonly id: string;
  readonly label: string;
  readonly amountKurus: number;
} & (
  | { readonly kind: "base-training"; readonly category: "A1" | "A2" | "A" | "B" }
  | { readonly kind: "penalty-training" }
  | { readonly kind: "driving-exam-retake"; readonly attempts: readonly number[] }
);

export interface OfficialFee {
  readonly id: string;
  /** Source-sheet labels, not a declaration of currently marketed/legal categories. */
  readonly sourceCategoryLabels: readonly string[];
  readonly harcKurus: number;
  readonly valuablePaperKurus: number;
  readonly foundationServiceKurus: number;
  readonly totalKurus: number;
}

export interface PricingContent {
  readonly year: number;
  readonly currency: "TRY";
  /** ISO calendar date of the actual content update, or null when not supplied. */
  readonly updatedAt: string | null;
  readonly courseFees: {
    readonly vatIncluded: boolean;
    readonly source: PricingSource;
    readonly items: readonly CourseFee[];
  };
  readonly officialFees: {
    readonly source: PricingSource;
    readonly items: readonly OfficialFee[];
  };
  readonly notes: readonly string[];
}
