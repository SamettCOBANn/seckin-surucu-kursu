import type { BusinessProfile } from "@/types/business";

const internationalPhone = "+905453036768";

export const business = {
  name: "Seçkin Sürücü Kursu",
  address: {
    neighborhood: "Taşpazarı Mahallesi",
    street: "807. Sokak",
    district: "Merkez",
    city: "Aksaray",
    country: "Türkiye",
    landmark: "Aksaray Kurşunlu Cami arkası",
  },
  phone: {
    display: "0545 303 67 68",
    international: internationalPhone,
    telHref: `tel:${internationalPhone}`,
    whatsappHref: `https://wa.me/${internationalPhone.slice(1)}`,
  },
  logo: {
    src: "/images/brand/seckin-logo.png",
    alt: "Seçkin Sürücü Kursu — Farkı Seçkin'le Yaşayın",
    width: 617,
    height: 265,
  },
} as const satisfies BusinessProfile;
