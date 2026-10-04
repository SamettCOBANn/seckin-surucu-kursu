import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/site/icon";
import { VehiclePreview } from "@/components/home/vehicle-preview";
import { TrainingContact, TrainingSources } from "@/components/training/training-page";
import { getBusiness, getTrainingGuides, getTrainingOfferings, getTrainingOverviewParagraphs, getTrainingProcess, getTrainingSources, getVehicles } from "@/lib/content";
import styles from "@/components/training/training.module.css";

const business = getBusiness();
export const metadata: Metadata = {
  title: `${business.address.city} Ehliyet Eğitimleri: B, A1 ve A2 | ${business.name}`,
  description: `${business.address.city} ${business.name} B sınıfı manuel ve otomatik, A1 ve A2 motosiklet eğitimleri. Yaş koşullarını, eğitim seçeneklerini ve kayıt adımlarını karşılaştırın.`,
};

export default function TrainingOverviewPage() {
  const guides = getTrainingGuides();
  const offerings = getTrainingOfferings();
  const process = getTrainingProcess();
  return <main id="main-content" tabIndex={-1}>
    <div className={`soft-surface section-pad ${styles.hero}`}><div className="site-container">
      <nav className={styles.breadcrumb} aria-label="İçerik yolu"><Link href="/">Ana Sayfa</Link><span aria-hidden="true">/</span><span aria-current="page">Eğitimler</span></nav>
      <p className="eyebrow">{business.name}</p><h1>{business.address.city} ehliyet eğitimleri</h1>
      <p className={styles.lead}>Otomobil veya motosiklet kullanmayı öğrenmek için önce size uygun sınıfı belirleyin. Kursumuzun B, A1 ve A2 eğitimlerini yaş koşulu ve araç türüne göre karşılaştırabilir, ayrıntılı sayfalarda kayıt belgelerini ve sınav sürecini inceleyebilirsiniz.</p>
    </div></div>
    <div className={`site-container section-pad ${styles.content}`}>
      <section aria-labelledby="training-comparison-title"><h2 className={styles.sectionTitle} id="training-comparison-title">Hangi eğitim size uygun?</h2>
        <div className={styles.comparison}>{guides.map((guide) => {
          const options = offerings.filter((offering) => offering.category === guide.category);
          return <article key={guide.category}><h3>{guide.label}</h3><dl><dt>En az yaş</dt><dd>{guide.minimumAge} yaşını bitirmiş olmak</dd><dt>Araç / eğitim türü</dt><dd>{guide.vehicleType}</dd></dl>
            <ul className={styles.list}>{options.map((option) => <li key={option.id}>{option.name}</li>)}</ul>
            <p>{guide.description}</p>
            <Link className="text-link" href={options[0].detailHref}>{guide.label} eğitimini inceleyin <Icon name="arrow" /></Link>
          </article>;
        })}</div><p className={styles.note}>{process.eligibilityNote}</p>
      </section>
      <section className={styles.prose} aria-labelledby="training-selection-title"><h2 id="training-selection-title">Seçim yaparken nereden başlamalısınız?</h2>
        {getTrainingOverviewParagraphs().map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <section className={styles.panel} aria-labelledby="training-overview-prices"><h2 id="training-overview-prices">Kurs ücreti ve resmî ücretler</h2><p>{process.pricingNote}</p><Link className="text-link" href="/fiyatlar">Fiyat listesini inceleyin <Icon name="arrow" /></Link></section>
    </div>
    <VehiclePreview vehicles={getVehicles()} />
    <div className={`site-container section-pad ${styles.content}`}>
      <TrainingContact business={business} />
      <TrainingSources sources={getTrainingSources().filter((source) => source.id === "nvi-eligibility")} />
    </div>
  </main>;
}
