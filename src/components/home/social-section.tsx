import type { SocialProfile } from "@/types/business";
import { Icon } from "@/components/site/icon";

export function SocialSection({ profiles }: { profiles: readonly SocialProfile[] }) {
  return <section className="site-container social-section" aria-labelledby="social-title">
    <div className="section-intro"><p className="eyebrow">Kursun içinden</p><h2 id="social-title">Bizi bir de <br />yakından tanıyın.</h2><p>Derslerden anlara, kurs duyurularına… <br />Seçkin’in sosyal medya hesaplarını keşfedin.</p></div>
    <div className="social-cards">{profiles.map((profile) => <article className="social-card" key={profile.platform}>
      <div className="social-card-top"><Icon name={profile.platform} /><span aria-hidden="true">↗</span></div>
      <h3>{profile.platform === "instagram" ? "Instagram" : "TikTok"}</h3>
      <p>{profile.username ? `@${profile.username}` : "Seçkin’i TikTok’ta da keşfedin."}</p>
      {profile.destination.status === "available" ? <a className="text-link" href={profile.destination.url} aria-label={`${profile.platform === "instagram" ? "Instagram" : "TikTok"} profilini ziyaret edin`}>Profili ziyaret edin <Icon name="arrow" /></a> : <span className="unavailable-link">Profil bağlantısı yakında</span>}
    </article>)}</div>
  </section>;
}
