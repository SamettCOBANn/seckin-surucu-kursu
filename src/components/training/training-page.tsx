import Link from "next/link";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { VehiclePreview } from "@/components/home/vehicle-preview";
import { Icon } from "@/components/site/icon";
import type { BusinessProfile } from "@/types/business";
import type { TrainingGuide, TrainingOffering, TrainingProcess, TrainingSource, Vehicle } from "@/types/training";
import styles from "./training.module.css";

export function TrainingContact({ business }: { business: BusinessProfile }) {
  return <section className={styles.contact} aria-labelledby="training-contact-title">
    <div><p className="eyebrow">Kayıt ve bilgi</p><h2 id="training-contact-title">Eğitim seçiminizi birlikte konuşalım.</h2>
      <p>{business.name}, {business.address.neighborhood}, {business.address.street}, {business.address.district} / {business.address.city}.</p>
      <p>{business.address.landmark}</p>
    </div>
    <div className={styles.actions}><a className="button button-brand" href={business.phone.telHref}><Icon name="phone" />{business.phone.display}</a><WhatsAppLink phone={business.phone} /></div>
  </section>;
}

export function TrainingSources({ sources }: { sources: readonly TrainingSource[] }) {
  return <section className={styles.sources} aria-labelledby="training-sources-title">
    <h2 id="training-sources-title">Kaynaklar ve bilgi kontrolü</h2>
    <ul>{sources.map((source) => <li key={source.id}>
      <a href={source.url}>{source.title}</a>
      <p>{source.basis}. {source.reviewedAt ? <>Kontrol tarihi: <time dateTime={source.reviewedAt}>{source.reviewedAt}</time>.</> : "Sınıf kapsamı işletmenin doğrulanmış olarak sağladığı bilgiye dayanır; güncel mevzuat bağlantısı başvuru içindir."}</p>
    </li>)}</ul>
  </section>;
}

interface TrainingPageProps {
  guide: TrainingGuide;
  business: BusinessProfile;
  offerings: readonly TrainingOffering[];
  vehicles: readonly Vehicle[];
  documents: readonly string[];
  process: TrainingProcess;
  sources: readonly TrainingSource[];
  related: readonly TrainingGuide[];
}

export function TrainingPage({ guide, business, offerings, vehicles, documents, process, sources, related }: TrainingPageProps) {
  const categoryOfferings = offerings.filter((offering) => offering.category === guide.category);
  const categoryVehicles = vehicles.filter((vehicle) => vehicle.active && vehicle.offeringIds.some((id) => categoryOfferings.some((offering) => offering.id === id)));
  const sourceIds = new Set([...guide.sourceIds, ...process.sourceIds]);
  return <main id="main-content" tabIndex={-1}>
    <div className={`soft-surface section-pad ${styles.hero}`}><div className="site-container">
      <nav className={styles.breadcrumb} aria-label="İçerik yolu"><Link href="/">Ana Sayfa</Link><span aria-hidden="true">/</span><Link href="/egitimler">Eğitimler</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.label}</span></nav>
      <p className="eyebrow">{business.name} · {business.address.city}</p>
      <h1>{business.address.city} {guide.label} Ehliyet Kursu</h1>
      <p className={styles.lead}>{guide.introduction}</p>
      <div className={styles.actions}><a className="button button-brand" href={business.phone.telHref}>Kayıt için bilgi alın <Icon name="arrow" /></a><Link className="button button-outline" href="/fiyatlar">Kurs ücretlerini inceleyin</Link></div>
    </div></div>

    <div className={`site-container section-pad ${styles.content}`}>
      <section aria-labelledby="training-scope-title" className={styles.split}>
        <div className={styles.prose}><h2 id="training-scope-title">{guide.scopeTitle}</h2>{guide.scope.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <aside className={styles.panel} aria-labelledby="training-eligibility-title"><p className="eyebrow">Başvuruya hazırlanırken</p><h2 id="training-eligibility-title">Yaş ve eğitim seçeneği</h2>
          <p className={styles.age}>{guide.minimumAge} yaşını bitirmiş olmak</p>
          <ul className={styles.list}>{categoryOfferings.map((offering) => <li key={offering.id}>{offering.name}</li>)}</ul>
          <p>{process.eligibilityNote}</p>
        </aside>
      </section>
      <section className={styles.prose} aria-labelledby="training-choice-title"><h2 id="training-choice-title">{guide.adviceTitle}</h2>{guide.advice.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    </div>

    {categoryVehicles.some((vehicle) => vehicle.image) && <VehiclePreview vehicles={categoryVehicles} />}

    <div className={`site-container section-pad ${styles.content}`}>
      <section aria-labelledby="training-process-title"><div className={styles.prose}><p className="eyebrow">Adım adım</p><h2 id="training-process-title">Kayıttan sürücü belgesine</h2><p>{process.introduction}</p></div>
        <ol className={styles.steps}>{process.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        <p className={styles.note}>{process.timingNote}</p>
      </section>
      <div className={styles.split}>
        <section className={styles.panel} aria-labelledby="training-documents-title"><h2 id="training-documents-title">Kayıt İçin Gerekli Belgeler</h2><p>{process.documentsNote}</p><ul className={styles.documents}>{documents.map((document) => <li key={document}>{document}</li>)}</ul></section>
        <section className={styles.panel} aria-labelledby="training-pricing-title"><p className="eyebrow">Ücretleri ayrı değerlendirin</p><h2 id="training-pricing-title">{guide.label} eğitim ücretleri</h2><p>{process.pricingNote}</p><Link className="text-link" href="/fiyatlar">Kurs ve resmî ücretleri inceleyin <Icon name="arrow" /></Link></section>
      </div>
      <section aria-labelledby="training-faq-title"><h2 id="training-faq-title" className={styles.sectionTitle}>{guide.label} hakkında sık sorulanlar</h2><div className="faq-list">{guide.faq.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <nav aria-labelledby="training-related-title"><h2 id="training-related-title" className={styles.sectionTitle}>Diğer eğitim seçenekleri</h2><div className={styles.actions}>{related.filter((item) => item.category !== guide.category).map((item) => {
        const offering = offerings.find((entry) => entry.category === item.category);
        return offering && <Link key={item.category} className="button button-outline" href={offering.detailHref}>{item.label} eğitimini inceleyin <Icon name="arrow" /></Link>;
      })}<Link className="text-link" href="/egitimler">Tüm eğitimleri karşılaştırın <Icon name="arrow" /></Link></div></nav>
      <TrainingContact business={business} />
      <TrainingSources sources={sources.filter((source) => sourceIds.has(source.id))} />
    </div>
  </main>;
}
