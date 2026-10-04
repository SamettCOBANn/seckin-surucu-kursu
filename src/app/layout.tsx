import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { getBusiness, getSite } from "@/lib/content";
import { getBusinessStructuredData, pageMetadata, serializeJsonLd } from "@/lib/seo";
import "./globals.css";

const business = getBusiness();

export const metadata: Metadata = {
  metadataBase: new URL(getSite().origin),
  ...pageMetadata("/", `${business.name} | ${business.address.city}`, `${business.address.city} ${business.address.neighborhood}’nde ${business.name}. Eğitim seçenekleri ve kayıt hakkında bilgi alın.`),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="tr"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getBusinessStructuredData()) }} />
    <a className="skip-link" href="#main-content">İçeriğe geç</a>
    <Header business={business} />
    {children}
    <Footer business={business} />
    <WhatsAppLink phone={business.phone} floating />
  </body></html>;
}
