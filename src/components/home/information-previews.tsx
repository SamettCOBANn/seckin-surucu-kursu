import type { BusinessProfile, ExternalServices } from "@/types/business";
import Link from "next/link";
import { Icon } from "@/components/site/icon";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";

export function InformationPreviews({ year, services, business }: { year: number; services: ExternalServices; business: BusinessProfile }) {
  const { address, phone } = business;
  const login = services.kursum.studentLogin;
  const website = services.kursum.website;
  return <>
    <div className="site-container information-grid">
      <section id="fiyatlar" tabIndex={-1} className="pricing-preview" aria-labelledby="pricing-title"><p className="eyebrow">Ücretler hakkında</p><h2 id="pricing-title">{year} kurs ve<br />ehliyet ücretleri</h2><p>Kurs / eğitim ücretleri ile resmî sürücü belgesi ücretleri ayrı kalemlerdir. Seçtiğiniz eğitim için güncel ücretleri bizden öğrenebilirsiniz.</p><Link className="text-link" href="/fiyatlar">Ücret bilgisi alın <Icon name="arrow" /></Link></section>
      <section id="kursiyer" tabIndex={-1} className="student-preview" aria-labelledby="student-title"><p className="eyebrow">Mevcut kursiyerlerimiz için</p><h2 id="student-title">Derslere dijital<br />bir destek.</h2><p>Dijital öğrenme, e-sınav hazırlığı ve deneme sınavları için kursiyerlerimiz Kursum.app hizmetini kullanır.</p>
        {login.status === "available" ? <a className="text-link" href={login.url}>Kursiyer girişine gidin <Icon name="arrow" /></a> : website.status === "available" && <><a className="text-link" href={website.url}>Kursum.app sitesini ziyaret edin <Icon name="arrow" /></a><p className="small-note">Harici hizmettir. Giriş yönlendirmesi için kursumuzdan destek alabilirsiniz.</p></>}
        {services.googlePlay.status === "available" && <a className="text-link" href={services.googlePlay.url}>Google Play’de görüntüleyin <Icon name="arrow" /></a>}
      </section>
    </div>
    <section id="sss" tabIndex={-1} className="site-container section-pad faq-section" aria-labelledby="faq-title"><div><p className="eyebrow">Aklınızdaki sorular</p><h2 id="faq-title">Başlamadan önce.</h2><p>Diğer sorularınız için bir telefon uzağınızdayız.</p></div><div className="faq-list">
      <details><summary>Kayıt hakkında nasıl bilgi alabilirim?</summary><p>Kursumuzu arayabilir veya WhatsApp üzerinden bize ulaşabilirsiniz. Eğitim seçimi ve kayıt süreci hakkında birlikte konuşalım.</p></details>
      <details><summary>Kurs ücreti ve resmî ehliyet ücretleri aynı mı?</summary><p>Hayır. Kurs / eğitim ücreti ile resmî sürücü belgesi ücretleri ayrı kalemlerdir. Güncel tutarlar ve kapsam için kursumuzla iletişime geçebilirsiniz.</p></details>
      <details><summary>Online ders ve deneme sınavlarına nereden ulaşabilirim?</summary><p>Kursiyerlerimiz bu hizmetler için harici Kursum.app platformunu kullanır. Giriş konusunda kursumuzdan destek alabilirsiniz.</p></details>
    </div></section>
    <section id="iletisim" tabIndex={-1} className="contact-section" aria-labelledby="contact-title"><div className="site-container contact-grid"><div><p className="eyebrow">Tanışalım</p><h2 id="contact-title">İlk adım için<br />bize ulaşın.</h2><p>Eğitimler, ücretler ve kayıt hakkında<br />sorularınızı yanıtlayalım.</p><div className="flex flex-wrap gap-3"><a className="button button-brand" href={phone.telHref}><Icon name="phone" />{phone.display}</a><WhatsAppLink phone={phone} /></div></div><div className="address-panel"><Icon name="pin" /><h3>{business.name}</h3><address>{address.neighborhood}, {address.street}<br />{address.district} / {address.city}, {address.country}</address><p>{address.landmark}</p><span className="address-rule" /></div></div></section>
  </>;
}
