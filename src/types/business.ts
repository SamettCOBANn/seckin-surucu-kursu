export interface ImageAsset {
  readonly src: `/images/${string}`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface BusinessProfile {
  readonly name: string;
  readonly address: {
    readonly neighborhood: string;
    readonly street: string;
    readonly district: string;
    readonly city: string;
    readonly country: string;
    readonly landmark: string;
  };
  readonly phone: {
    readonly display: string;
    readonly international: `+${string}`;
    readonly telHref: `tel:+${string}`;
    readonly whatsappHref: `https://wa.me/${string}`;
  };
  readonly logo: ImageAsset;
}

// Missing destinations cannot accidentally become clickable placeholder URLs.
export type ExternalDestination =
  | { readonly status: "available"; readonly url: `https://${string}` }
  | { readonly status: "not-provided"; readonly url: null };

export interface SocialProfile {
  readonly platform: "instagram" | "tiktok";
  readonly username: string | null;
  readonly destination: ExternalDestination;
}

export interface ExternalServices {
  // The public product website is known; the student login destination is not.
  readonly kursum: {
    readonly website: ExternalDestination;
    readonly studentLogin: ExternalDestination;
  };
  readonly googlePlay: ExternalDestination;
  readonly directions: ExternalDestination;
}
