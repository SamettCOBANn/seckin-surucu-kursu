import type { ImageAsset } from "@/types/business";

export type Transmission = "manual" | "automatic";
export type TrainingOfferingId = "b-manual" | "b-automatic" | "a1" | "a2";

interface OfferingContent {
  readonly slug: string;
  readonly name: string;
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
