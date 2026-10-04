import { connection } from "next/server";
import type { RegistrationPolicy } from "@/types/registration";
import { getNextRegistrationDeadline } from "@/lib/registration";
import { Icon } from "@/components/site/icon";

export async function RegistrationNotice({ policy, documents }: { policy: RegistrationPolicy; documents: readonly string[] }) {
  await connection();
  const { deadline } = getNextRegistrationDeadline(new Date(), policy);
  const date = new Intl.DateTimeFormat("tr-TR", { timeZone: policy.timeZone, day: "numeric", month: "long", year: "numeric" }).format(deadline);
  const time = new Intl.DateTimeFormat("tr-TR", { timeZone: policy.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(deadline);
  return <section className="site-container registration-wrap" aria-labelledby="registration-title">
    <div className="registration-notice">
      <div><p className="eyebrow" id="registration-title">Yaklaşan dönem için son kayıt</p><time dateTime={deadline.toISOString()}>{date} <span>· {time}</span></time></div>
      <p>Belgelerinizi tamamlayarak son kayıt saatinden önce başvurunuzu yapabilirsiniz.</p>
      <a href="#iletisim" className="text-link">Kayıt için iletişime geçin <Icon name="arrow" /></a>
      <div className="registration-documents">
        <h2 id="registration-documents-title">Kayıt İçin Gerekli Belgeler</h2>
        <ul aria-labelledby="registration-documents-title" role="list">
          {documents.map((document) => <li key={document}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
            <span>{document}</span>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
