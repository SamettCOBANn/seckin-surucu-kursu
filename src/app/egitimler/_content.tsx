import type { Metadata } from "next";
import { TrainingPage } from "@/components/training/training-page";
import { getBusiness, getRegistrationDocuments, getTrainingGuide, getTrainingGuides, getTrainingOfferings, getTrainingProcess, getTrainingSources, getVehicles } from "@/lib/content";
import type { TrainingCategory } from "@/types/training";
import { pageMetadata } from "@/lib/seo";

export function trainingMetadata(category: TrainingCategory): Metadata {
  const guide = getTrainingGuide(category);
  const business = getBusiness();
  const path = getTrainingOfferings().find((offering) => offering.category === category)?.detailHref;
  if (!path) throw new Error(`Missing training route for ${category}`);
  return pageMetadata(path, `${business.address.city} ${guide.label} Ehliyet Kursu | ${business.name}`, `${business.address.city} ${business.name}: ${guide.description}`);
}

export function renderTrainingPage(category: TrainingCategory) {
  return <TrainingPage guide={getTrainingGuide(category)} business={getBusiness()} offerings={getTrainingOfferings()} vehicles={getVehicles()} documents={getRegistrationDocuments()} process={getTrainingProcess()} sources={getTrainingSources()} related={getTrainingGuides()} />;
}
