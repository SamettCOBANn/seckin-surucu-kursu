import type { SocialProfile } from "@/types/business";

const instagramUsername = "68seckinsurucukursu";
const tiktokUsername = "sekin.src.kursu";

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
    username: tiktokUsername,
    destination: { status: "available", url: `https://www.tiktok.com/@${tiktokUsername}` },
  },
] as const satisfies readonly SocialProfile[];
