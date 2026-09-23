import type { SocialProfile } from "@/types/business";

const instagramUsername = "68seckinsurucukursu";

// Both channels belong in the same section with equal visual importance.
export const socialProfiles = [
  {
    platform: "instagram",
    username: instagramUsername,
    destination: {
      status: "available",
      url: `https://www.instagram.com/${instagramUsername}/`,
    },
  },
  {
    platform: "tiktok",
    username: null,
    destination: { status: "not-provided", url: null },
  },
] as const satisfies readonly SocialProfile[];
