import Image from "next/image";
import Link from "next/link";
import type { BusinessProfile } from "@/types/business";
import { MobileNavigation } from "./mobile-navigation";
import { Icon } from "./icon";

const navigation = [
  { href: "/#ana-sayfa", label: "Ana Sayfa" },
  { href: "/egitimler", label: "Eğitimler" },
  { href: "/#araclar", label: "Araçlarımız" },
  { href: "/fiyatlar", label: "Fiyatlar" },
  { href: "/#sss", label: "SSS" },
  { href: "/#iletisim", label: "İletişim" },
];

export function Header({ business }: { business: BusinessProfile }) {
  const links = navigation.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>);
  return (
    <header>
      <div className="utility-bar"><div className="site-container flex items-center justify-between gap-4">
        <span className="flex items-center gap-2"><Icon name="pin" />{business.address.city} · {business.address.neighborhood}</span>
        <Link href="/#kursiyer">Kursiyer Girişi <span aria-hidden="true">↗</span></Link>
      </div></div>
      <div className="site-container header-main">
        <Link href="/#ana-sayfa" aria-label={`${business.name} — Ana sayfa`} className="brand-link">
          <Image {...business.logo} alt={business.logo.alt} sizes="(max-width: 390px) 136px, (max-width: 639px) 160px, 200px" preload />
        </Link>
        <nav className="desktop-navigation" aria-label="Ana menü">{links}</nav>
        <a className="button button-brand header-cta" href={business.phone.telHref}>Bilgi Al <Icon name="arrow" /></a>
        <MobileNavigation>{links}<a className="button button-brand" href={business.phone.telHref}>Bizi arayın</a></MobileNavigation>
      </div>
    </header>
  );
}
