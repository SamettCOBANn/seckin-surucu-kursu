import type { BusinessProfile } from "@/types/business";
import Link from "next/link";

export function Footer({ business }: { business: BusinessProfile }) {
  return <footer className="site-footer"><div className="site-container flex flex-wrap items-center justify-between gap-5">
    <div><strong>{business.name}</strong><p>{business.address.city}’da, yolculuğunuzun ilk adımında.</p></div>
    <nav aria-label="Alt menü"><Link href="/fiyatlar">Fiyatlar</Link><Link href="/#iletisim">İletişim</Link><Link href="/#ana-sayfa">Başa dön <span aria-hidden="true">↑</span></Link></nav>
  </div></footer>;
}
