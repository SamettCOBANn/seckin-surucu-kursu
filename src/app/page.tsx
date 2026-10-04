import { Hero } from "@/components/home/hero";
import { RegistrationNotice } from "@/components/home/registration-notice";
import { SocialSection } from "@/components/home/social-section";
import { TrainingPreview } from "@/components/home/training-preview";
import { VehiclePreview } from "@/components/home/vehicle-preview";
import { InformationPreviews } from "@/components/home/information-previews";
import { getBusiness, getExternalServices, getPricing, getRegistrationDocuments, getRegistrationPolicy, getSocialProfiles, getTrainingOfferings, getVehicles } from "@/lib/content";

export default function Home() {
  const business = getBusiness();
  const offerings = getTrainingOfferings();
  const vehicles = getVehicles();
  return <main id="main-content" tabIndex={-1}>
    <Hero business={business} offerings={offerings} vehicles={vehicles} />
    <RegistrationNotice policy={getRegistrationPolicy()} documents={getRegistrationDocuments()} />
    <SocialSection profiles={getSocialProfiles()} />
    <TrainingPreview offerings={offerings} />
    <VehiclePreview vehicles={vehicles} />
    <InformationPreviews business={business} services={getExternalServices()} year={getPricing().year} />
  </main>;
}
