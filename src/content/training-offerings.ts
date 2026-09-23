import type { TrainingOffering } from "@/types/training";

export const trainingOfferings = [
  {
    id: "b-manual",
    slug: "b-manuel",
    name: "B Sınıfı Manuel Vites Eğitimi",
    category: "B",
    transmission: "manual",
  },
  {
    id: "b-automatic",
    slug: "b-otomatik",
    name: "B Sınıfı Otomatik Vites Eğitimi",
    category: "B",
    transmission: "automatic",
  },
  { id: "a1", slug: "a1", name: "A1 Motosiklet Eğitimi", category: "A1", transmission: null },
  { id: "a2", slug: "a2", name: "A2 Motosiklet Eğitimi", category: "A2", transmission: null },
] as const satisfies readonly TrainingOffering[];
