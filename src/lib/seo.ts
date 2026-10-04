import type { Metadata } from "next";
import { getBusiness, getSite, getSocialProfiles, getTrainingOfferings } from "@/lib/content";

export function absoluteSiteUrl(path: string): string {
  return new URL(path, getSite().origin).href;
}

export function getPublicPagePaths(): readonly string[] {
  return ["/", "/fiyatlar", "/egitimler", ...new Set(getTrainingOfferings().map((offering) => offering.detailHref))];
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const business = getBusiness();
  const image = {
    url: absoluteSiteUrl(business.logo.src),
    width: business.logo.width,
    height: business.logo.height,
    alt: business.logo.alt,
  };
  return {
    title,
    description,
    alternates: { canonical: absoluteSiteUrl(path) },
    openGraph: {
      type: "website",
      locale: getSite().locale,
      siteName: business.name,
      url: absoluteSiteUrl(path),
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function getBusinessStructuredData() {
  const business = getBusiness();
  const { address } = business;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteSiteUrl("/#business"),
    name: business.name,
    url: absoluteSiteUrl("/"),
    telephone: business.phone.international,
    description: address.landmark,
    logo: absoluteSiteUrl(business.logo.src),
    image: absoluteSiteUrl(business.logo.src),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.neighborhood}, ${address.street}, ${address.district}`,
      addressLocality: address.city,
      addressCountry: address.country,
    },
    sameAs: getSocialProfiles().flatMap((profile) => profile.destination.status === "available" ? [profile.destination.url] : []),
  };
}

// Escape HTML-significant characters even if a future content source contains markup.
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
