import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownToLine, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import oliveOilAndCheeseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(2)_1793863143115.jpg';
import autoOilImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(1)_1793863143115.jpg';
import companyLogoImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(3)_1793863143116.jpg';
import hydroponicGreenhouseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_1793863143117.jpg';

type Language = 'en' | 'ar';
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const BRAND_ASSETS = {
  logo: companyLogoImage,
  lubricants: autoOilImage,
  food: oliveOilAndCheeseImage,
  hydroponics: hydroponicGreenhouseImage,
};

const copy = {
  en: {
    nav: ['About Us', 'Contact Us'],
    language: 'AR',
    menu: 'Open navigation',
    brandCardLabel: 'Official company mark',
    heroEyebrow: 'AUTO SERVICE APP FOR GENERAL TRADING',
    heroTitle: <>Regional supply.<br /><em>Practical connections.</em></>,
    heroText: 'Supplying the Syrian Ministry of Petroleum and connecting automotive parts, lubricants, Syrian food products and hydroponic agriculture across Kuwait and Syria.',
    explore: 'Explore our sectors',
    downloadProfile: 'Download company profile (PDF)',
    contactWhatsApp: 'Contact our team',
    inquire: 'Choose a contact option',
    inquiryKuwait: 'Kuwait WhatsApp · +965 55554199',
    inquirySyria: 'Syria WhatsApp · +963 959811087',
    inquiryEmail: 'Email · anas@appautoservice.com',
    established: 'ESTABLISHED',
    sectorsEyebrow: 'A connected portfolio',
    sectorsTitle: 'Five sectors. One regional perspective.',
    sectorsText: 'A general trading company working across essential products and supply categories.',
    categories: [
      { title: 'Engine oils & lubricants', sub: 'Automotive products', image: 'auto-service-lubricants.jpg', alt: 'Auto-Oil 5000, 10000 and 15000 engine oil bottles' },
      { title: 'Olive oil & artisanal cheese', sub: 'Syrian food products', image: 'auto-service-food.jpg', alt: 'Shamco Wafrat El-Sham olive oil, olives and cheeses' },
      { title: 'Automotive spare parts', sub: 'Through the Auto Service App', image: 'auto-service-parts.jpg', alt: 'Automotive spare parts in a working garage' },
      { title: 'Hydroponic agriculture', sub: 'Controlled growing', image: 'auto-service-greenhouse.jpg', alt: 'Hydroponic greenhouse growing lettuce, tomatoes and cucumbers' },
      { title: 'Petroleum tankers', sub: 'Petroleum supply', image: 'auto-service-petroleum.jpg', alt: 'Petroleum tanker and storage infrastructure at dusk' },
    ],
    sectorCards: [
      { id: 'energy', name: 'Petroleum & energy', description: 'Petroleum supply and logistics for the Syrian Ministry of Petroleum.' },
      { id: 'automotive', name: 'Auto service & lubricants', description: 'The Auto Service App, spare parts, and Auto-Oil 5000, 10000 and 15000 in 5W-30, 10W-40 and 20W-50.' },
      { id: 'food', name: 'Fine food products', description: 'Shamco Wafrat El-Sham olive oil, olives, feta, Akkawi and Syrian cheeses.' },
      { id: 'hydroponics', name: 'Hydroponic agriculture', description: 'Modern greenhouse production for local lettuce, tomatoes and cucumbers in Syria.' },
    ],
    companyEyebrow: 'The company',
    companyTitle: <>Built around the work<br />of moving things forward.</>,
    companyCopy: 'Auto Service App for General Trading is a regional general trading company supplying the Syrian Ministry of Petroleum and connecting automotive spare parts through its app, lubricants, Syrian food products and hydroponic agriculture.',
    companyNote: 'Established in 2019, with business hubs in Kuwait and Syria.',
    establishedLabel: 'Established',
    years: '2019',
    hubs: 'Regional hubs',
    hubNames: 'Kuwait · Syria',
    contactEyebrow: 'Business enquiries',
    contactTitle: 'Talk to our regional offices.',
    contactCopy: 'For business enquiries, reach us by email or WhatsApp at the appropriate office.',
    kuwait: 'Kuwait',
    syria: 'Syria',
    address: 'Address',
    whatsapp: 'WhatsApp',
    message: 'Message on WhatsApp',
    email: 'Email',
    footerNote: 'Auto Service App for General Trading',
    logoAlt: 'Company logo',
  },
  ar: {
    nav: ['من نحن', 'تواصل معنا'],
    language: 'EN',
    menu: 'فتح قائمة التنقل',
    brandCardLabel: 'العلامة الرسمية للشركة',
    heroEyebrow: 'أوتو سيرفس اب للتجارة العامة',
    heroTitle: <>إمداد إقليمي.<br /><em>روابط عملية.</em></>,
    heroText: 'نورد لوزارة النفط السورية ونربط بين قطع غيار السيارات والزيوت والمنتجات الغذائية السورية والزراعة المائية في الكويت وسوريا.',
    explore: 'اكتشف قطاعاتنا',
    downloadProfile: 'تنزيل الملف التعريفي (PDF)',
    contactWhatsApp: 'تواصل مع فريقنا',
    inquire: 'اختر وسيلة التواصل',
    inquiryKuwait: 'تواصل عبر واتساب الكويت (Kuwait WhatsApp)',
    inquirySyria: 'تواصل عبر واتساب سوريا (Syria WhatsApp)',
    inquiryEmail: 'إرسال بريد إلكتروني (Email)',
    established: 'تأسست عام',
    sectorsEyebrow: 'محفظة مترابطة',
    sectorsTitle: 'خمسة قطاعات. ورؤية إقليمية واحدة.',
    sectorsText: 'شركة تجارة عامة تعمل عبر فئات أساسية من المنتجات والإمدادات.',
    categories: [
      { title: 'زيوت المحركات ومواد التشحيم', sub: 'منتجات السيارات', image: 'auto-service-lubricants.jpg', alt: 'عبوات زيوت محركات أوتو أويل 5000 و10000 و15000' },
      { title: 'زيت الزيتون والأجبان الحرفية', sub: 'منتجات غذائية سورية', image: 'auto-service-food.jpg', alt: 'منتجات شامكو وفرات الشام من زيت الزيتون والزيتون والأجبان' },
      { title: 'قطع غيار السيارات', sub: 'من خلال تطبيق Auto Service', image: 'auto-service-parts.jpg', alt: 'قطع غيار سيارات في ورشة عمل' },
      { title: 'الزراعة المائية', sub: 'زراعة محكومة', image: 'auto-service-greenhouse.jpg', alt: 'بيت محمي للزراعة المائية للخس والطماطم والخيار' },
      { title: 'ناقلات النفط', sub: 'إمدادات نفطية', image: 'auto-service-petroleum.jpg', alt: 'ناقلة نفط وبنية تخزين عند الغروب' },
    ],
    sectorCards: [
      { id: 'energy', name: 'النفط والطاقة', description: 'إمدادات نفطية وخدمات لوجستية لوزارة النفط السورية.' },
      { id: 'automotive', name: 'خدمات السيارات والزيوت', description: 'تطبيق أوتو سيرفس وقطع الغيار وزيوت Auto-Oil 5000 و10000 و15000 بدرجات 5W-30 و10W-40 و20W-50.' },
      { id: 'food', name: 'المنتجات الغذائية الفاخرة', description: 'زيت زيتون وثمار زيتون وأجبان فيتا وعكاوي وأجبان سورية من شامكو وفرات الشام.' },
      { id: 'hydroponics', name: 'الزراعة المائية', description: 'إنتاج حديث داخل البيوت المحمية للخس والطماطم والخيار في سوريا.' },
    ],
    companyEyebrow: 'الشركة',
    companyTitle: <>نعمل على ربط<br />ما يدفع الأعمال للأمام.</>,
    companyCopy: 'أوتو سيرفس اب للتجارة العامة شركة تجارة عامة إقليمية تورّد لوزارة النفط السورية وتربط بين قطع غيار السيارات عبر تطبيقها وزيوت التشحيم والمنتجات الغذائية السورية والزراعة المائية.',
    companyNote: 'تأسست عام ٢٠١٩، ولها مركزا أعمال في الكويت وسوريا.',
    establishedLabel: 'تأسست',
    years: '٢٠١٩',
    hubs: 'مراكز إقليمية',
    hubNames: 'الكويت · سوريا',
    contactEyebrow: 'استفسارات الأعمال',
    contactTitle: 'تواصل مع مكاتبنا الإقليمية.',
    contactCopy: 'لاستفسارات الأعمال، تواصلوا معنا عبر البريد الإلكتروني أو واتساب للمكتب المناسب.',
    kuwait: 'الكويت',
    syria: 'سوريا',
    address: 'العنوان',
    whatsapp: 'واتساب',
    message: 'تواصل عبر واتساب',
    email: 'البريد الإلكتروني',
    footerNote: 'أوتو سيرفس اب للتجارة العامة',
    logoAlt: 'شعار الشركة',
  },
} as const;

function getInquiryMessage(language: Language, topic: string) {
  return language === 'en'
    ? `Hello Auto Service App for General Trading, I would like to enquire about ${topic}. Please share product details, availability and next steps.`
    : `مرحباً، أود الاستفسار عن ${topic} من شركة أوتو سيرفس اب للتجارة العامة. يرجى تزويدي بالتفاصيل والتوافر والخطوات التالية.`;
}

function getWhatsAppUrl(phone: string, language: Language, topic: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(getInquiryMessage(language, topic))}`;
}

function getEmailUrl(language: Language, topic: string) {
  const subject = language === 'en' ? `Business enquiry: ${topic}` : `استفسار أعمال: ${topic}`;
  return `mailto:anas@appautoservice.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getInquiryMessage(language, topic))}`;
}

function InquiryMenu({
  language,
  topic,
  label,
  testId,
  className = '',
  summaryClassName = '',
}: {
  language: Language;
  topic: string;
  label: string;
  testId: string;
  className?: string;
  summaryClassName?: string;
}) {
  const t = copy[language];
  return (
    <details className={`inquiry-menu ${className}`}>
      <summary className={summaryClassName} data-testid={`button-${testId}`}>
        <span>{label}</span><ChevronDown size={14} aria-hidden="true" />
      </summary>
      <div className="inquiry-options">
        <a href={getWhatsAppUrl('96555554199', language, topic)} target="_blank" rel="noopener noreferrer" data-testid={`link-${testId}-kuwait-whatsapp`}>
          {t.inquiryKuwait}<ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a href={getWhatsAppUrl('963959811087', language, topic)} target="_blank" rel="noopener noreferrer" data-testid={`link-${testId}-syria-whatsapp`}>
          {t.inquirySyria}<ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a href={getEmailUrl(language, topic)} data-testid={`link-${testId}-email`}>
          {t.inquiryEmail}<ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </details>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trackPaused, setTrackPaused] = useState(false);
  const t = copy[language];
  const navIds = ['company', 'contact'];
  const categoryImage = (index: number, image: string) => {
    if (index === 0) return BRAND_ASSETS.lubricants;
    if (index === 1) return BRAND_ASSETS.food;
    if (index === 3) return BRAND_ASSETS.hydroponics;
    return asset(image);
  };
  const brandCard = (duplicate = false) => (
    <article
      className="showcase-card card-brand"
      key={duplicate ? 'duplicate-brand' : 'brand'}
      aria-hidden={duplicate || undefined}
    >
      <div className="showcase-image brand-showcase-image">
        <img src={BRAND_ASSETS.logo} alt={duplicate ? '' : t.logoAlt} />
        <span className="card-index">{language === 'en' ? 'BRAND' : 'العلامة'}</span>
      </div>
      <div className="showcase-card-copy">
        <span>{t.brandCardLabel}</span>
        <h3>{t.footerNote}</h3>
      </div>
    </article>
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const whatsapp = (phone: string, topic = language === 'en' ? 'general business enquiry' : 'استفسار أعمال عام') => getWhatsAppUrl(phone, language, topic);
  const showcase = (
    <div className="showcase-viewport" onMouseEnter={() => setTrackPaused(true)} onMouseLeave={() => setTrackPaused(false)} onFocus={() => setTrackPaused(true)} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setTrackPaused(false);
    }}>
      <div className={`showcase-track${trackPaused ? ' is-paused' : ''}`}>
        {brandCard()}
        {t.categories.map((item, index) => (
          <article className={`showcase-card card-${index + 1}`} key={item.title}>
            <div className="showcase-image">
              <img src={categoryImage(index, item.image)} alt={item.alt} />
              <span className="card-index">0{index + 1} / 05</span>
            </div>
            <div className="showcase-card-copy"><span>{item.sub}</span><h3>{item.title}</h3></div>
          </article>
        ))}
        {brandCard(true)}
        {t.categories.map((item, index) => (
          <article className={`showcase-card card-${index + 1} showcase-duplicate`} key={`duplicate-${item.title}`} aria-hidden="true">
            <div className="showcase-image"><img src={categoryImage(index, item.image)} alt="" /><span className="card-index">0{index + 1} / 05</span></div>
            <div className="showcase-card-copy"><span>{item.sub}</span><h3>{item.title}</h3></div>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <main className={`site-shell${language === 'ar' ? ' rtl' : ''}`}>
      <header className="header">
        <div className="wrap header-inner">
          <div className="brand">
            <a href="#top" className="brand-text" aria-label={t.footerNote} onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <strong>{language === 'en' ? 'Auto Service App' : 'أوتو سيرفس اب'}</strong>
              <small>{language === 'en' ? 'for General Trading' : 'للتجارة العامة'}</small>
            </a>
          </div>
          <nav className="main-nav" aria-label={language === 'en' ? 'Main navigation' : 'التنقل الرئيسي'}>
            {t.nav.map((label, index) => <button type="button" key={label} onClick={() => go(navIds[index])}>{label}</button>)}
          </nav>
          <div className="header-actions">
            <button type="button" className="language-btn" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}>{t.language}<ChevronDown size={13} /></button>
            <button type="button" className="menu-btn" aria-label={t.menu} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {mobileOpen && <nav className="mobile-panel" aria-label={language === 'en' ? 'Mobile navigation' : 'تنقل الهاتف'}>{t.nav.map((label, index) => <button type="button" key={label} onClick={() => go(navIds[index])}>{label}</button>)}</nav>}
      </header>

      <section className="hero" id="top">
        <div className="hero-image" style={{ backgroundImage: `url("${asset('auto-service-petroleum.jpg')}")` }} role="img" aria-label={language === 'en' ? 'Petroleum storage and regional tanker infrastructure' : 'خزانات نفط وبنية نقل إقليمية'} />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <div className="hero-eyebrow"><span className="eyebrow-line" />{t.heroEyebrow}</div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="hero-cta" href={`${import.meta.env.BASE_URL}corporate-profile.pdf`} download data-testid="link-company-profile">
              {t.downloadProfile}<ArrowDownToLine size={15} />
            </a>
            <InquiryMenu
              language={language}
              topic={language === 'en' ? 'general trading and product enquiries' : 'استفسارات التجارة العامة والمنتجات'}
              label={t.contactWhatsApp}
              testId="hero-inquiry"
              className="inquiry-menu-hero"
              summaryClassName="hero-cta hero-cta-secondary"
            />
          </div>
          <button type="button" className="hero-explore" onClick={() => go('sectors')}>{t.explore}<ArrowDown size={15} /></button>
          <div className="hero-bottom"><span>{language === 'en' ? 'KUWAIT / SYRIA' : 'الكويت / سوريا'}</span><span className="hero-est"><b>2019</b> {t.established}</span></div>
        </div>
        <span className="hero-coordinate">29°22' N&nbsp; 47°59' E</span>
      </section>

      <section className="showcase-section" id="sectors">
        <div className="wrap showcase-heading">
          <div><div className="section-kicker">{t.sectorsEyebrow}</div><h2>{t.sectorsTitle}</h2></div>
          <p>{t.sectorsText}</p>
        </div>
        {showcase}
        <div className="wrap showcase-foot"><span>{language === 'en' ? 'SUPPLY · MOBILITY · PRODUCTION' : 'الإمداد · الحركة · الإنتاج'}</span><span>{language === 'en' ? 'A regional portfolio since 2019' : 'محفظة إقليمية منذ ٢٠١٩'}</span></div>
      </section>

      <section className="sector-directory" aria-labelledby="sector-directory-title">
        <div className="wrap">
          <div className="sector-directory-heading">
            <div className="section-kicker">{t.sectorsEyebrow}</div>
            <h2 id="sector-directory-title">{language === 'en' ? 'Trading across essential sectors.' : 'تجارة في قطاعات أساسية.'}</h2>
          </div>
          <div className="sector-directory-grid">
            {t.sectorCards.map((sector, index) => (
              <article className={`sector-detail sector-detail-${index + 1}`} id={sector.id} key={sector.id}>
                <span className="sector-number">0{index + 1}</span>
                <h3>{sector.name}</h3>
                <p>{sector.description}</p>
                <InquiryMenu language={language} topic={sector.name} label={t.inquire} testId={`sector-${sector.id}`} className="inquiry-menu-sector" summaryClassName="sector-inquiry-button" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-section" id="company">
        <div className="wrap company-grid">
          <div className="company-image">
            <img src={BRAND_ASSETS.hydroponics} alt={language === 'en' ? 'Hydroponic greenhouse producing lettuce, tomatoes and cucumbers' : 'بيت محمي للزراعة المائية ينتج الخس والطماطم والخيار'} />
            <span className="image-caption">{language === 'en' ? 'REGIONAL BUSINESS · SINCE 2019' : 'أعمال إقليمية · منذ ٢٠١٩'}</span>
          </div>
          <div className="company-copy">
            <div className="section-kicker">{t.companyEyebrow}</div>
            <h2>{t.companyTitle}</h2>
            <p>{t.companyCopy}</p>
            <div className="company-note">{t.companyNote}</div>
            <div className="company-facts">
              <div><span>{t.establishedLabel}</span><strong>{t.years}</strong></div>
              <div><span>{t.hubs}</span><strong>{t.hubNames}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="wrap">
          <div className="contact-intro">
            <div><div className="section-kicker">{t.contactEyebrow}</div><h2>{t.contactTitle}</h2></div>
            <div className="contact-aside"><p>{t.contactCopy}</p><span className="contact-email-label">{t.email}</span><a className="email-link" href={getEmailUrl(language, language === 'en' ? 'general business enquiry' : 'استفسار أعمال عام')}>anas@appautoservice.com<ArrowUpRight size={15} /></a></div>
          </div>
          <div className="offices">
            <article className="office">
              <span className="office-code">{language === 'en' ? '01 — KUWAIT' : '٠١ — الكويت'}</span><h3>{t.kuwait}</h3>
              <span className="office-label">{t.address}</span><p className="office-address" dir="ltr">Al-Aqaila, Taiba Mall Building, 7th Floor</p>
              <a className="office-link" href={whatsapp('96555554199', t.kuwait)} target="_blank" rel="noreferrer"><span>{t.message}</span><span dir="ltr">+965 5555 4199</span><ArrowUpRight size={15} /></a>
            </article>
            <article className="office">
              <span className="office-code">{language === 'en' ? '02 — SYRIA' : '٠٢ — سوريا'}</span><h3>{t.syria}</h3>
              <span className="office-label">{t.address}</span><p className="office-address" dir="ltr">Rif Dimashq, Qura Al-Sham, Building 43</p>
              <a className="office-link" href={whatsapp('963959811087', t.syria)} target="_blank" rel="noreferrer"><span>{t.message}</span><span dir="ltr">+963 959 811 087</span><ArrowUpRight size={15} /></a>
            </article>
          </div>
          <div className="footer-bottom">
            <a href="#top" className="footer-brand" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.footerNote}</a>
            <span>KUWAIT · SYRIA</span><span>© 2019</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
