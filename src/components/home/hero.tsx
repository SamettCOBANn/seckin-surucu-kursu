import type { BusinessProfile } from "@/types/business";
import type { TrainingOffering, Vehicle } from "@/types/training";
import { Icon } from "@/components/site/icon";
import { VehicleCarousel, type CarouselVehicle } from "./vehicle-carousel";

export function Hero({ business, offerings, vehicles }: { business: BusinessProfile; offerings: readonly TrainingOffering[]; vehicles: readonly Vehicle[] }) {
  const carouselVehicles = vehicles
    .filter((vehicle): vehicle is Vehicle & { image: NonNullable<Vehicle["image"]> } => vehicle.active && vehicle.kind === "car" && vehicle.image !== null)
    .map(({ id, name, transmission, image }): CarouselVehicle => ({ id, name, transmission, image }));
  return <section className="hero" id="ana-sayfa" tabIndex={-1} aria-labelledby="hero-title">
    <div className="site-container hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><span className="accent-line" />{business.address.city} · {business.name}</p>
        <h1 id="hero-title">Yola çıkmanın<br />ilk adımı,<br /><span>Seçkin.</span></h1>
        <p className="hero-description">Ehliyet yolculuğunuz burada başlasın. Size uygun eğitimi birlikte seçelim, ilk adımı birlikte atalım.</p>
        <ul className="offering-tags" aria-label="Eğitim seçenekleri">{offerings.map((offering) => <li key={offering.id}>{offering.category}{offering.transmission ? ` · ${offering.transmission === "manual" ? "Manuel" : "Otomatik"}` : " · Motosiklet"}</li>)}</ul>
        <div className="flex flex-wrap gap-3"><a href={business.phone.telHref} className="button button-brand">Bilgi alın <Icon name="arrow" /></a><a href="#egitimler" className="button button-outline">Eğitimleri keşfedin</a></div>
        <p className="hero-location"><Icon name="pin" />{business.address.landmark}</p>
      </div>
      <div className="hero-visual">
        <div className="road-motif" aria-hidden="true"><span /></div>
        <p className="visual-caption">YENİ BİR YOLCULUĞA<br /><strong>Hazır mısınız?</strong></p>
        <VehicleCarousel vehicles={carouselVehicles} />
        <div className="visual-note"><span aria-hidden="true">↗</span><p>Direksiyon başına geçmeden,<br /><strong>tanışarak başlayalım.</strong></p></div>
      </div>
    </div>
  </section>;
}
