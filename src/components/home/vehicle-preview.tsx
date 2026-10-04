import Image from "next/image";
import type { Vehicle } from "@/types/training";

export function VehiclePreview({ vehicles }: { vehicles: readonly Vehicle[] }) {
  const active = vehicles.filter((vehicle) => vehicle.active);
  return <section id="araclar" tabIndex={-1} className="site-container section-pad" aria-labelledby="vehicles-title">
    <div className="section-heading"><div><p className="eyebrow">Eğitim araçlarımız</p><h2 id="vehicles-title">Yolda size eşlik edecekler.</h2></div><p>{active.some((vehicle) => vehicle.kind === "car") ? "Manuel ve otomatik eğitim otomobillerimiz." : "Motosiklet eğitiminde kullandığımız aracımız."}{active.some((vehicle) => vehicle.kind === "car") && active.some((vehicle) => vehicle.kind === "motorcycle") && <><br />A1 ve A2 eğitim motosikletlerimiz.</>}</p></div>
    <div className="vehicle-grid">{active.filter((vehicle) => vehicle.image).map((vehicle) => <article className="vehicle-card" key={vehicle.id}>
      {vehicle.image && <Image {...vehicle.image} alt={vehicle.image.alt} sizes="(max-width: 365px) calc(100vw - 66px), (max-width: 639px) 300px, (max-width: 1113px) calc((100vw - 154px) / 3), 320px" />}
      <div><h3>{vehicle.name}</h3><p>{vehicle.transmission === "manual" ? "B · Manuel" : vehicle.transmission === "automatic" ? "B · Otomatik" : "Motosiklet"}</p></div>
    </article>)}</div>
    {active.some((vehicle) => !vehicle.image) && <div className="vehicle-note"><span className="eyebrow">Motosiklet eğitimi</span><p>{active.filter((vehicle) => !vehicle.image).map((vehicle) => vehicle.name).join(" · ")}</p></div>}
  </section>;
}
