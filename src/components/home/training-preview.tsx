import type { TrainingOffering } from "@/types/training";
import Link from "next/link";
import { Icon } from "@/components/site/icon";

export function TrainingPreview({ offerings }: { offerings: readonly TrainingOffering[] }) {
  return <section id="egitimler" tabIndex={-1} className="section-pad soft-surface" aria-labelledby="training-title"><div className="site-container">
    <div className="section-heading"><div><p className="eyebrow">Size uygun bir başlangıç</p><h2 id="training-title">Hangi yoldan başlayalım?</h2></div><p>Otomobil ya da motosiklet.<br />Eğitim seçeneğiniz hakkında konuşalım.</p></div>
    <div className="training-grid">{offerings.map((offering) => <article className="training-card" key={offering.id}>
      <span className="category-mark" aria-hidden="true">{offering.category}</span><h3>{offering.name}</h3><Link href={offering.detailHref} className="text-link" aria-label={`${offering.name} detaylarını inceleyin`}>Eğitimi inceleyin <Icon name="arrow" /></Link>
    </article>)}</div>
  </div></section>;
}
