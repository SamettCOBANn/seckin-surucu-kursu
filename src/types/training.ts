import type { ImageAsset } from "@/types/business";

export type Transmission = "manual" | "automatic";
export type TrainingOfferingId = "b-manual" | "b-automatic" | "a1" | "a2";

interface OfferingContent {
  readonly slug: string;
  readonly detailHref: `/egitimler/${string}`;
  readonly name: string;
}

export type TrainingCategory = TrainingOffering["category"];

export interface TrainingSource {
  readonly id: string;
  readonly title: string;
  readonly url: `https://${string}`;
  readonly basis: string;
  readonly verification: "authority-reviewed" | "user-confirmed";
  readonly reviewedAt: string | null;
  readonly note: string;
}

export interface TrainingGuide {
  readonly category: TrainingCategory;
  readonly label: string;
  readonly minimumAge: number;
  readonly vehicleType: string;
  readonly description: string;
  readonly introduction: string;
  readonly scopeTitle: string;
  readonly scope: readonly string[];
  readonly adviceTitle: string;
  readonly advice: readonly string[];
  readonly faq: readonly { readonly question: string; readonly answer: string }[];
  readonly sourceIds: readonly string[];
}

export interface TrainingProcess {
  readonly introduction: string;
  readonly steps: readonly { readonly title: string; readonly description: string }[];
  readonly timingNote: string;
  readonly eligibilityNote: string;
  readonly documentsNote: string;
  readonly pricingNote: string;
  readonly sourceIds: readonly string[];
}

// B is one category with two training variants; motorcycle transmission is unknown.
export type TrainingOffering = OfferingContent &
  (
    | { readonly id: "b-manual"; readonly category: "B"; readonly transmission: "manual" }
    | { readonly id: "b-automatic"; readonly category: "B"; readonly transmission: "automatic" }
    | { readonly id: "a1"; readonly category: "A1"; readonly transmission: null }
    | { readonly id: "a2"; readonly category: "A2"; readonly transmission: null }
  );

export interface Vehicle {
  readonly id: string;
  readonly kind: "car" | "motorcycle";
  readonly name: string;
  readonly manufacturer: string | null;
  readonly model: string | null;
  readonly transmission: Transmission | null;
  readonly offeringIds: readonly TrainingOfferingId[];
  readonly image: ImageAsset | null;
  readonly active: boolean;
}
