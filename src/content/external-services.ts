import type { ExternalServices } from "@/types/business";

export const externalServices = {
  kursum: {
    website: { status: "available", url: "https://kursum.app/" },
    studentLogin: { status: "not-provided", url: null },
  },
  googlePlay: { status: "not-provided", url: null },
  directions: { status: "not-provided", url: null },
} as const satisfies ExternalServices;
