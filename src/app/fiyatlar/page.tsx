import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/site/icon";
import { getBusiness, getPricing } from "@/lib/content";
import { formatTurkishLira } from "@/lib/money";
import type { PricingSource } from "@/types/pricing";
import styles from "./pricing.module.css";

const pricing = getPricing();
const business = getBusiness();

export const metadata: Metadata = {
  title: `${pricing.year} Kurs ve Ehliyet Ücretleri | ${business.name}`,
  description: `${business.address.city} ${business.name} ${pricing.year} kurs, eğitim ve direksiyon sınavı ücretleri. Resmî sürücü belgesi ücretleri ayrı olarak gösterilir.`,
};

function SourceNote({ source }: { source: PricingSource }) {
  return (
    <div className={styles.source}>
      <p>{source.note}</p>
      <p>
        {source.verification === "authority-verified"
          ? "Yetkili kaynakla doğrulanmıştır."
          : "İşletme tarafından sağlanmıştır; bağımsız resmî doğrulama yapılmamıştır."}
        {source.verifiedAt && <> Doğrulama tarihi: <time dateTime={source.verifiedAt}>{source.verifiedAt}</time>.</>}
      </p>
      {source.authoritativeUrl && <a className="text-link" href={source.authoritativeUrl}>Yetkili kaynağı inceleyin <Icon name="arrow" /></a>}
    </div>
  );
}

export default function PricingPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className={`soft-surface section-pad ${styles.intro}`}>
        <div className="site-container">
          <nav aria-label="İçerik yolu" className={styles.breadcrumb}>
            <Link href="/">Ana Sayfa</Link><span aria-hidden="true">/</span><span aria-current="page">Fiyatlar</span>
          </nav>
          <p className="eyebrow">{pricing.year} fiyat listesi</p>
          <h1>Kurs ve <span>ehliyet ücretleri.</span></h1>
          <p className={styles.lead}>Kurs / eğitim ücretleri ile resmî sürücü belgesi ücretleri ayrı kalemlerdir. Aşağıdaki tutarlar tek bir kayıt paketi veya her şey dahil toplam değildir.</p>
          <div className={styles.actions}>
            <a className="button button-brand" href="#kurs-ucretleri">Kurs ücretleri <Icon name="arrow" /></a>
            <a className="button button-outline" href="#resmi-ucretler">Resmî ücretler</a>
          </div>
        </div>
      </div>

      <div className={`site-container section-pad ${styles.content}`}>
        <section id="kurs-ucretleri" aria-labelledby="course-title" tabIndex={-1}>
          <div className="section-heading">
            <div><p className="eyebrow">Kurs / eğitim</p><h2 id="course-title">Eğitim ve sınav ücretleri</h2></div>
            <p>{pricing.courseFees.vatIncluded ? "KDV dahildir." : "KDV dahil değildir."}</p>
          </div>
          <div className={styles.tablePanel}>
            <table className={styles.table}>
              <caption>{pricing.year} kurs / eğitim fiyat listesi — resmî sürücü belgesi ücretleri hariç</caption>
              <thead><tr><th scope="col">Eğitim / işlem</th><th scope="col">Ücret</th></tr></thead>
              <tbody>{pricing.courseFees.items.map((fee) => (
                <tr key={fee.id}><th scope="row">{fee.label}</th><td>{formatTurkishLira(fee.amountKurus)}</td></tr>
              ))}</tbody>
            </table>
          </div>
          <p className={styles.explanation}>Fiyat listesinde bir sınıfın yer alması, kursumuzda o eğitimin sunulduğu anlamına gelmez. <Link href="/#egitimler">Eğitim seçeneklerimizi inceleyin</Link> ve kayıt öncesinde bilgi alın.</p>
          <SourceNote source={pricing.courseFees.source} />
        </section>

        <section id="resmi-ucretler" aria-labelledby="official-title" tabIndex={-1}>
          <div className="section-heading"><div><p className="eyebrow">Kurs ücretinden ayrı</p><h2 id="official-title">Resmî sürücü belgesi ücretleri</h2></div></div>
          <p className={styles.explanation}>Harç, değerli kâğıt ve vakıf hizmet bedelleri kursa ödenen eğitim ücretine dahil değildir. Buradaki toplamlar yalnızca bu üç kalemi kapsar.</p>
          {pricing.officialFees.source.verification !== "authority-verified" && (
            <p className={styles.notice}>Aşağıdaki tutarlar işletmenin sağladığı listedendir; güncel resmî tarife olarak doğrulanmamıştır. Ödeme öncesinde yetkili kurumdan teyit ediniz.</p>
          )}
          <div className={styles.officialGrid}>{pricing.officialFees.items.map((fee) => (
            <article className={styles.officialCard} key={fee.id} aria-labelledby={fee.id}>
              <p className="eyebrow">Kaynak listedeki sınıflar</p>
              <h3 id={fee.id}>{fee.sourceCategoryLabels.join(" / ")}</h3>
              <dl>
                <div><dt>Harç</dt><dd>{formatTurkishLira(fee.harcKurus)}</dd></div>
                <div><dt>Değerli kâğıt</dt><dd>{formatTurkishLira(fee.valuablePaperKurus)}</dd></div>
                <div><dt>Vakıf hizmet bedeli</dt><dd>{formatTurkishLira(fee.foundationServiceKurus)}</dd></div>
                <div className={styles.total}><dt>Resmî ücret toplamı</dt><dd>{formatTurkishLira(fee.totalKurus)}</dd></div>
              </dl>
            </article>
          ))}</div>
          <SourceNote source={pricing.officialFees.source} />
        </section>

        <aside className={styles.notes} aria-labelledby="pricing-notes">
          <div>
            <h2 id="pricing-notes">Kayıt öncesinde</h2>
            <ul>{pricing.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            <p className={styles.updated}>{pricing.updatedAt ? <>Son güncelleme: <time dateTime={pricing.updatedAt}>{pricing.updatedAt}</time></> : "Fiyat listesinin son güncelleme tarihi belirtilmemiştir."}</p>
          </div>
          <a className="button button-brand" href={business.phone.telHref}><Icon name="phone" />{business.phone.display}</a>
        </aside>
      </div>
    </main>
  );
}
