"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Vehicle } from "@/types/training";
import { Icon } from "@/components/site/icon";
import styles from "./vehicle-carousel.module.css";

export type CarouselVehicle = Pick<Vehicle, "id" | "name" | "transmission"> & {
  readonly image: NonNullable<Vehicle["image"]>;
};

function transmissionLabel(transmission: Vehicle["transmission"]) {
  return transmission === "manual" ? "Manuel vites" : transmission === "automatic" ? "Otomatik vites" : "Eğitim aracı";
}

export function VehicleCarousel({ vehicles }: { vehicles: readonly CarouselVehicle[] }) {
  const [index, setIndex] = useState(0);
  const slidesId = useId();
  const selected = vehicles[index] ?? vehicles[0];
  if (!selected) return null;

  function move(direction: number) {
    setIndex((current) => (current + direction + vehicles.length) % vehicles.length);
  }

  return (
    <div
      className={styles.carousel}
      role="group"
      aria-roledescription="araç karuseli"
      aria-label="Eğitim araçlarımız"
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        switch (event.key) {
          case "ArrowLeft": event.preventDefault(); move(-1); break;
          case "ArrowRight": event.preventDefault(); move(1); break;
          case "Home": event.preventDefault(); setIndex(0); break;
          case "End": event.preventDefault(); setIndex(vehicles.length - 1); break;
        }
      }}
    >
      <div className={styles.cardControls}>
        <div id={slidesId} className={styles.slides}>
          {vehicles.map((vehicle, vehicleIndex) => (
            <figure
              className={`hero-vehicle ${styles.slide}`}
              key={vehicle.id}
              data-active={vehicle.id === selected.id}
              aria-hidden={vehicle.id !== selected.id}
            >
              {vehicle.id === selected.id && <Image
                {...vehicle.image}
                alt={vehicle.image.alt}
                sizes="(max-width: 390px) 260px, 320px"
                preload={vehicleIndex === 0}
                loading={vehicleIndex === 0 ? undefined : "lazy"}
                className={styles.image}
                style={{ aspectRatio: "1.3" }}
              />}
              <figcaption><span>{vehicle.name}</span><span>{transmissionLabel(vehicle.transmission)}</span></figcaption>
            </figure>
          ))}
        </div>
        {vehicles.length > 1 && <>
          <button className={`${styles.arrow} ${styles.previous}`} type="button" aria-label="Önceki aracı göster" aria-controls={slidesId} onClick={() => move(-1)}><Icon name="arrow" /></button>
          <button className={`${styles.arrow} ${styles.next}`} type="button" aria-label="Sonraki aracı göster" aria-controls={slidesId} onClick={() => move(1)}><Icon name="arrow" /></button>
        </>}
      </div>
      {vehicles.length > 1 && <div className={styles.pagination} role="group" aria-label="Araç seçimi">
        {vehicles.map((vehicle, vehicleIndex) => (
          <button key={vehicle.id} className={styles.dot} type="button" aria-label={`${vehicle.name} aracını göster`} aria-pressed={vehicle.id === selected.id} aria-controls={slidesId} onClick={() => setIndex(vehicleIndex)}><span /></button>
        ))}
      </div>}
      <p className="sr-only" aria-live="polite" aria-atomic="true">{selected.name}, {transmissionLabel(selected.transmission)}. Araç {vehicles.indexOf(selected) + 1} / {vehicles.length}.</p>
    </div>
  );
}
