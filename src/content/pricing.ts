import type { PricingContent } from "@/types/pricing";

// Manually maintained source-sheet transcription. Amounts are integer kuruş.
// These source labels do not expand the advertised training-offering catalogue.
export const pricing = {
  year: 2026,
  currency: "TRY",
  updatedAt: null,
  courseFees: {
    vatIncluded: true,
    source: {
      note: "İşletmenin sağladığı 2026 Aksaray kurs/taban fiyat listesi; KDV dahildir.",
      verification: "user-supplied",
      authoritativeUrl: null,
      verifiedAt: null,
    },
    items: [
      { id: "course-a1", kind: "base-training", category: "A1", label: "A1", amountKurus: 1_200_000 },
      { id: "course-a2", kind: "base-training", category: "A2", label: "A2", amountKurus: 1_200_000 },
      { id: "course-a", kind: "base-training", category: "A", label: "A", amountKurus: 1_440_000 },
      { id: "course-b", kind: "base-training", category: "B", label: "B", amountKurus: 1_800_000 },
      { id: "course-100-ceza", kind: "penalty-training", label: "100 Ceza", amountKurus: 1_090_000 },
      {
        id: "driving-exam-retake",
        kind: "driving-exam-retake",
        label: "2. / 3. / 4. direksiyon sınavı ücreti",
        attempts: [2, 3, 4],
        amountKurus: 525_000,
      },
    ],
  },
  officialFees: {
    source: {
      note: "İşletmenin sağladığı 2026 sürücü belgesi ücret listesi; yayımlanmadan önce güncel yetkili kaynakla doğrulanmalıdır.",
      verification: "user-supplied",
      authoritativeUrl: null,
      verifiedAt: null,
    },
    items: [
      {
        id: "official-a-group",
        sourceCategoryLabels: ["A", "A1", "A2", "F", "H", "Engelli A"],
        harcKurus: 223_990,
        valuablePaperKurus: 169_000,
        foundationServiceKurus: 42_500,
        totalKurus: 435_490,
      },
      {
        id: "official-b",
        sourceCategoryLabels: ["B"],
        harcKurus: 675_460,
        valuablePaperKurus: 169_000,
        foundationServiceKurus: 42_500,
        totalKurus: 886_960,
      },
      {
        id: "official-other-group",
        sourceCategoryLabels: ["B1", "BE", "C", "C1", "C1E", "CE", "D", "D1", "D1E", "G", "M"],
        harcKurus: 1_127_120,
        valuablePaperKurus: 169_000,
        foundationServiceKurus: 42_500,
        totalKurus: 1_338_620,
      },
    ],
  },
  notes: [
    "Kurs/eğitim ücretleri ile resmî sürücü belgesi ücretleri ayrı kalemlerdir.",
    "Fiyatlar ve resmî ücretler değişebilir; güncel tutarları kayıt öncesinde teyit ediniz.",
    "Sınıflar arası geçiş ücretleri henüz sağlanmamıştır.",
  ],
} as const satisfies PricingContent;
