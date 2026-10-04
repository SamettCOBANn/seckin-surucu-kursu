import type { BusinessProfile } from "@/types/business";
import { Icon } from "@/components/site/icon";

export function WhatsAppLink({ phone, floating = false }: { phone: BusinessProfile["phone"]; floating?: boolean }) {
  const message = "Merhaba, sürücü kursu eğitimleri ve kayıt hakkında bilgi almak istiyorum.";
  return <a href={`${phone.whatsappHref}?text=${encodeURIComponent(message)}`} className={floating ? "floating-whatsapp" : "button button-outline"} aria-label="WhatsApp üzerinden bilgi alın">
    <Icon name="whatsapp" /><span className={floating ? "floating-label" : undefined}>WhatsApp</span>
  </a>;
}
