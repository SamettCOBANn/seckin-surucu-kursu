import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { getBusiness } from "@/lib/content";
import "./globals.css";

const business = getBusiness();

export const metadata: Metadata = {
  title: `${business.name} | ${business.address.city}`,
  description: `${business.address.city} ${business.address.neighborhood}’nde ${business.name}. Eğitim seçenekleri ve kayıt hakkında bilgi alın.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="tr"><body>
    <a className="skip-link" href="#main-content">İçeriğe geç</a>
    <Header business={business} />
    {children}
    <Footer business={business} />
    <WhatsAppLink phone={business.phone} floating />
  </body></html>;
}
