import { business } from "@/content/business";
import { externalServices } from "@/content/external-services";
import { pricing } from "@/content/pricing";
import { registrationDocuments, registrationPolicy } from "@/content/registration";
import { socialProfiles } from "@/content/social";
import { trainingOfferings } from "@/content/training-offerings";
import { trainingGuides, trainingOverviewParagraphs, trainingProcess, trainingSources } from "@/content/training-guides";
import { vehicles } from "@/content/vehicles";
import type { BusinessProfile, ExternalServices, SocialProfile } from "@/types/business";
import type { PricingContent } from "@/types/pricing";
import type { RegistrationPolicy } from "@/types/registration";
import type { TrainingCategory, TrainingGuide, TrainingOffering, TrainingProcess, TrainingSource, Vehicle } from "@/types/training";

// Routes read through this small boundary and pass domain data to components.
// Explicit return types keep consumers independent of the local literal records.
export function getBusiness(): BusinessProfile {
  return business;
}

export function getSocialProfiles(): readonly SocialProfile[] {
  return socialProfiles;
}

export function getExternalServices(): ExternalServices {
  return externalServices;
}

export function getTrainingOfferings(): readonly TrainingOffering[] {
  return trainingOfferings;
}

export function getTrainingGuide(category: TrainingCategory): TrainingGuide {
  return trainingGuides[category];
}

export function getTrainingGuides(): readonly TrainingGuide[] {
  return Object.values(trainingGuides);
}

export function getTrainingProcess(): TrainingProcess {
  return trainingProcess;
}

export function getTrainingSources(): readonly TrainingSource[] {
  return trainingSources;
}

export function getTrainingOverviewParagraphs(): readonly string[] {
  return trainingOverviewParagraphs;
}

export function getVehicles(): readonly Vehicle[] {
  return vehicles;
}

export function getRegistrationPolicy(): RegistrationPolicy {
  return registrationPolicy;
}

export function getRegistrationDocuments(): readonly string[] {
  return registrationDocuments;
}

export function getPricing(): PricingContent {
  return pricing;
}
