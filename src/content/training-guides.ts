import type { TrainingCategory, TrainingGuide, TrainingProcess, TrainingSource } from "@/types/training";

// Manually reviewed content. Do not use render/build time as a review date.
// Scope limits were explicitly supplied as verified by the business. The current
// consolidated regulation could not be fetched during this review, so its source
// remains user-confirmed rather than claiming independent authority verification.
export const trainingSources = [
  {
    id: "nvi-eligibility",
    title: "NVİ — Sürücü Belgeleri Hizmetleri Sıkça Sorulan Sorular",
    url: "https://www.nvi.gov.tr/sss-surucu-belgeleri-hizmetleri",
    basis: "Karayolları Trafik Yönetmeliği m. 76; yaş şartları ve sürücü belgesi başvurusu",
    verification: "authority-reviewed",
    reviewedAt: "2026-09-26",
    note: "A1 için 16; A2 ve B için 18 yaşını bitirme şartı ve sertifika/belge ayrımı kontrol edildi.",
  },
  {
    id: "licence-scope",
    title: "Karayolları Trafik Yönetmeliği — Sürücü belgesi sınıfları",
    url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5",
    basis: "Madde 75: A1 ve A2 kapsamı",
    verification: "user-confirmed",
    reviewedAt: null,
    note: "A1/A2 kapsamı işletmenin doğrulanmış bilgi olarak sağladığı metinden alınmıştır; güncel konsolide metin bu oturumda erişilemedi.",
  },
  {
    id: "meb-esinav",
    title: "MEB — Motorlu Taşıt Sürücü Kursiyerleri e-Sınav Kılavuzu 2026 (PDF)",
    url: "https://www.meb.gov.tr/meb_iys_dosyalar/2026_07/6a6b50c06daf3993652350_MTSK_e-Sinav_Kilavuzu_2026.pdf",
    basis: "Temmuz 2026 kılavuzu; sınav uygulaması ve değerlendirme bölümü",
    verification: "authority-reviewed",
    reviewedAt: "2026-09-26",
    note: "Teorik sınavın e-Sınav olarak uygulanması ve 100 üzerinden en az 70 başarı puanı kontrol edildi.",
  },
  {
    id: "meb-process",
    title: "MEB — Sürücü kursları hakkında sıkça sorulan sorular",
    url: "https://www.meb.gov.tr/sss.php",
    basis: "Teorik eğitim ve direksiyon uygulama sınav tarihlerinin belirlenmesi",
    verification: "authority-reviewed",
    reviewedAt: "2026-09-26",
    note: "Yalnızca eğitim aşamaları ve il/ilçe millî eğitim müdürlüğünün takvim yetkisi kullanıldı; eski sınav süresi/saat bilgileri aktarılmadı.",
  },
] as const satisfies readonly TrainingSource[];

const ages = { B: 18, A1: 16, A2: 18 } as const;
const a1Scope = "A1 kapsamında iki tekerlekli motosikletin motor hacmi en fazla 125 cc, gücü en fazla 11 kW ve güç/ağırlık oranı en fazla 0,1 kW/kg olmalıdır. Bu üç sınırın birlikte sağlanması gerekir.";
const a2Scope = "A2 kapsamında iki tekerlekli motosikletin gücü en fazla 35 kW ve güç/ağırlık oranı en fazla 0,2 kW/kg olmalıdır. Yalnızca motor hacmine bakarak uygunluk kararı verilmez.";
const threeWheelScope = "Gücü 15 kW’ı aşmayan üç tekerlekli motosikletler de bu sınıfın kapsamındadır.";
const bOptions = "Manuel ve otomatik, B sınıfı içindeki vites ve eğitim seçenekleridir; birbirinden ayrı ehliyet sınıfları değildir.";

export const trainingOverviewParagraphs = [
  `Otomobil için B sınıfı sayfasında manuel ve otomatik seçeneklerini birlikte inceleyin. ${bOptions} Kullanmayı planladığınız araçla ilgili sorularınızı kayıt görüşmesinde paylaşın.`,
  "Motosiklet için A1 ve A2 sayfalarındaki kapsam açıklamalarına bakın. Yalnızca model adı veya cc bilgisiyle karar vermek yerine aracın teknik bilgilerini de değerlendirin. Başka bir ehliyetiniz varsa kursumuza bildirerek size uygulanacak süreci görüşün.",
  "Her eğitim sayfasında kurs kayıt belgeleri, genel eğitim ve sınav akışı, ücret sayfası bağlantısı ve iletişim seçenekleri bulunur. Ders ve sınav takvimi hakkında güncel bilgiyi kursumuzdan alın.",
] as const satisfies readonly string[];

export const trainingGuides = {
  B: {
    category: "B", label: "B Sınıfı", minimumAge: ages.B, vehicleType: "Otomobil — manuel ve otomatik",
    description: "B sınıfı manuel ve otomatik eğitim seçenekleri, yaş şartı, gerçek eğitim araçları, kayıt belgeleri ve sınav süreci.",
    introduction: "Otomobil kullanmayı öğrenmek isteyen adaylar için B sınıfı eğitiminde manuel ve otomatik vites seçenekleri bulunur. Hangi aracı kullanmayı planladığınızı ve mevcut sürüş deneyiminizi konuşarak size uygun seçeneği değerlendirebiliriz.",
    scopeTitle: "B sınıfı ve vites seçimi",
    scope: [bOptions, "Manuel araçta debriyaj ve vites değişimini sürücü yönetir. Otomatik araçta vites geçişleri otomatik yapılır; sürücü yine aracın kontrolünden ve trafik kurallarına uygun kullanımdan sorumludur.", "Seçiminizi yalnızca eğitim aracı üzerinden yapmayın. Sonrasında kullanmak istediğiniz aracın vitesini de düşünün; vites seçiminin sürücü belgenize yansıyacak koşullarını kayıt öncesinde kursumuzla görüşün."],
    adviceTitle: "Kayıttan önce hangi seçeneği konuşmalısınız?",
    advice: ["Kullanmayı planladığınız otomobilin manuel mi otomatik mi olduğunu belirleyin. Evde veya işte kullanacağınız araç, görüşmeye başlamak için yararlı bir bilgidir.", "Daha önce direksiyon başına geçip geçmediğinizi ve öğrenirken zorlandığınız konuları paylaşın. Eğitim seçimi, araç bilgisi ve kayıt hazırlığını birlikte değerlendirelim.", "Eğitim araçlarımız aşağıda vites bilgileriyle birlikte yer alır. Ders planlaması ve araçla ilgili sorularınızı kayıt görüşmesinde sorabilirsiniz; belirli bir bitirme süresi vaat edilmez."],
    faq: [
      { question: "B manuel ve B otomatik farklı ehliyet sınıfları mı?", answer: bOptions },
      { question: "B sınıfı için kaç yaşında olmalıyım?", answer: `B sınıfı sürücü belgesi için ${ages.B} yaşını bitirmiş olmanız gerekir. Yaş dışındaki başvuru koşulları da ayrıca değerlendirilir.` },
      { question: "Manuel veya otomatik eğitim için ücreti nereden öğrenebilirim?", answer: "Fiyatlar sayfasında B sınıfına ait merkezi fiyat listesi bulunur. Manuel ve otomatik için ayrıca bir fiyat farkı yayımlanmamıştır; seçiminizin güncel ücretini ve kapsamını kursumuzdan teyit edin." },
    ],
    sourceIds: ["nvi-eligibility"],
  },
  A1: {
    category: "A1", label: "A1", minimumAge: ages.A1, vehicleType: "Motosiklet — A1 kapsamı",
    description: "A1 motosiklet eğitimi, 16 yaş şartı, 125 cc ve güç sınırları, kayıt belgeleri, eğitim ve sınav aşamaları.",
    introduction: "Motosiklet kullanmaya başlamak için A1 seçeneğini değerlendiriyorsanız, yaşınızın yanında kullanmak istediğiniz motosikletin teknik özelliklerine de bakmalısınız. A1 seçimi yalnızca motorun küçük veya hafif görünmesine göre yapılmaz.",
    scopeTitle: "A1 hangi motosikletler için uygundur?",
    scope: [a1Scope, threeWheelScope, "125 cc ifadesi tek başına yeterli değildir: güç ve güç/ağırlık oranı da sınırların içinde kalmalıdır. Motosikletin ruhsatındaki veya üreticinin teknik belgelerindeki bilgileri birlikte kontrol edin."],
    adviceTitle: "A1 mi, A2 mi düşünmelisiniz?",
    advice: ["Önce kullanmak istediğiniz motosikletin motor hacmini, gücünü ve güç/ağırlık oranını öğrenin. Bu bilgileri kayıt görüşmesine getirmeniz sınıf seçimini netleştirir.", "A1 kapsamının dışındaki bir motosiklet için yalnızca bu sayfadaki yaş koşulunu sağlamak yeterli değildir. A2 sayfasındaki güç ve yaş koşullarını da karşılaştırın.", "Kursumuzun A1 motosiklet eğitimi hakkında bilgi alabilirsiniz. Eğitim motosikletinin modelini, ders planlamasını ve hazırlıkla ilgili sorularınızı doğrudan kursumuzla görüşün."],
    faq: [
      { question: "A1 için en az kaç yaş gerekir?", answer: `A1 sınıfı sürücü belgesi için ${ages.A1} yaşını bitirmiş olmak gerekir. Diğer başvuru koşulları kayıt öncesinde ayrıca değerlendirilir.` },
      { question: "Her 125 cc motosiklet A1 kapsamına girer mi?", answer: a1Scope },
      { question: "A1 üç tekerlekli motosikletleri kapsar mı?", answer: threeWheelScope },
    ],
    sourceIds: ["nvi-eligibility", "licence-scope"],
  },
  A2: {
    category: "A2", label: "A2", minimumAge: ages.A2, vehicleType: "Motosiklet — A2 kapsamı",
    description: "A2 motosiklet eğitimi, 18 yaş şartı, 35 kW ve güç/ağırlık sınırları, kayıt belgeleri ve sınav süreci.",
    introduction: "A2 seçeneği, kullanmayı düşündüğü motosikletin güç ve güç/ağırlık özelliklerini değerlendiren adaylar içindir. Motor hacmiyle ifade edilen cc değeri, A2 kapsamını tek başına açıklamaz; teknik belgelerdeki güç bilgisi de önemlidir.",
    scopeTitle: "A2 kapsamını nasıl değerlendirmelisiniz?",
    scope: [a2Scope, threeWheelScope, "Güç, motorun üretebildiği gücü; güç/ağırlık oranı ise bu gücün motosikletin ağırlığına göre durumunu ifade eder. İki sınır birlikte değerlendirilir; motosikletin yalnızca 35 kW altında olması tek başına yeterli değildir."],
    adviceTitle: "Motosiklet seçerken nelere bakmalısınız?",
    advice: ["İlgilendiğiniz motosikletin marka veya model adından hareketle ehliyet uygunluğu varsaymayın. Ruhsat ve üretici teknik bilgilerini kontrol ederek güç ile güç/ağırlık oranını öğrenin.", "A1 ile A2’yi karşılaştırırken hem yaş koşuluna hem araç kapsamına bakın. Daha düşük hacimli bir motosiklet düşünüyorsanız A1 sayfasındaki sınırlar da seçiminizi anlamanıza yardımcı olur.", "Mevcut bir sürücü belgeniz varsa kayıt görüşmesinde belirtin. İlk kez belge alacak adaylar için aşağıdaki genel akış geçerlidir; sizin için uygulanacak aşamaları ayrıca görüşelim. Eğitim motosikleti ve ders planı hakkında bilgiyi kursumuzdan alabilirsiniz."],
    faq: [
      { question: "A2 için kaç yaşını bitirmek gerekir?", answer: `A2 sınıfı sürücü belgesi için ${ages.A2} yaşını bitirmiş olmak gerekir. Yaş, başvuru koşullarından biridir; diğer koşullar ayrıca değerlendirilir.` },
      { question: "A2 motosiklet seçimini sadece cc değerine göre yapabilir miyim?", answer: a2Scope },
      { question: "35 kW sınırını sağlamak tek başına yeterli mi?", answer: "Hayır. Güç/ağırlık oranının da 0,2 kW/kg sınırını aşmaması gerekir. İki tekerlekli motosikletlerde bu koşullar birlikte değerlendirilir." },
    ],
    sourceIds: ["nvi-eligibility", "licence-scope"],
  },
} as const satisfies Record<TrainingCategory, TrainingGuide>;

export const trainingProcess = {
  introduction: "İlk kez sürücü belgesi alacak adaylar için genel yol aşağıdaki aşamalardan oluşur. Mevcut belgeniz veya farklı bir başvuru durumunuz varsa size uygulanacak aşamaları kayıt öncesinde kursumuzla netleştirin.",
  steps: [
    { title: "Kayıt", description: "Eğitim seçeneğiniz ve başvuru durumunuz değerlendirilir; kurs kayıt belgelerinizi hazırlarsınız." },
    { title: "Teorik eğitim", description: "Trafik ve çevre, ilk yardım, araç tekniği ve trafik adabı konularında teorik eğitim aşamasına katılırsınız." },
    { title: "e-Sınav", description: "Teorik sınav elektronik ortamda yapılır. Başarılı sayılmak için 100 üzerinden 70 veya daha yüksek puan gerekir." },
    { title: "Direksiyon / sürüş eğitimi", description: "Seçtiğiniz sınıfa uygun araçla uygulamalı eğitim aşamasını tamamlarsınız." },
    { title: "Direksiyon uygulama sınavı", description: "Uygulamalı sınava katılırsınız. Sınav takvimi ilgili il/ilçe millî eğitim müdürlüğünce belirlenir." },
    { title: "Sertifika ve sürücü belgesi", description: "Başarılı adaylar sertifika ve sürücü belgesi başvuru işlemlerine geçer. Sertifika, sürücü belgesine dönüştürülmeden karayolunda araç kullanma yetkisi vermez." },
  ],
  timingNote: "Ders ve sınav planlaması ile başvuru işlemleri toplam süreyi etkiler. Kesin bir tamamlama tarihi veya belirli bir sürede ehliyet garantisi verilmez.",
  eligibilityNote: "Yaş koşulunu sağlamak tek başına yeterli değildir. Öğrenim, sağlık ve diğer başvuru koşulları da değerlendirilir; kişisel durumunuzu kayıt öncesinde kursumuzla görüşün.",
  documentsNote: "Aşağıdaki liste kursumuzun kayıt için istediği belgelerdir. Nüfus müdürlüğündeki sürücü belgesi başvurusu ayrı bir işlemdir; bu liste o başvurunun belge listesi yerine geçmez.",
  pricingNote: "Kurs / eğitim ücretleri ile resmî sürücü belgesi ücretleri ayrı kalemlerdir. Fiyatlar sayfasında yayımlanan yıl, KDV ve geçerlilik açıklamalarını inceleyin; seçtiğiniz eğitim için güncel ücret ve kapsamı kayıt öncesinde teyit edin.",
  sourceIds: ["nvi-eligibility", "meb-esinav", "meb-process"],
} as const satisfies TrainingProcess;
