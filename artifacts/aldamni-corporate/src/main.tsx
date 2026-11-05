import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpLeft, ArrowRight, Mail, MapPin } from 'lucide-react';
import { directionCopy, site, type Direction, type Locale } from './data/site';
import './style.css';

const BASE = import.meta.env.BASE_URL;

function enquiryMessage(locale: Locale, sector?: string) {
  if (locale === 'ar') {
    return `مرحباً، أود الاستفسار${sector ? ` عن ${sector}` : ' عن خدمات الشركة'}.`;
  }
  return `Hello, I’d like to enquire${sector ? ` about ${sector}` : ' about the company’s services'}.`;
}

function whatsappUrl(phone: string, locale: Locale, sector?: string) {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(enquiryMessage(locale, sector))}`;
}

function emailUrl(locale: Locale, sector?: string) {
  const subject = sector
    ? `${locale === 'ar' ? 'استفسار عن' : 'Enquiry about'} ${sector}`
    : locale === 'ar' ? 'استفسار تجاري' : 'Business enquiry';
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryMessage(locale, sector))}`;
}

function App() {
  const [locale, setLocale] = useState<Locale>('ar');
  const [selectedSector, setSelectedSector] = useState<string | undefined>();
  const path = window.location.pathname;
  const direction: Direction = path.endsWith('/b') ? 'b' : path.endsWith('/c') ? 'c' : 'a';
  const rtl = locale === 'ar';
  const tx = (value: { ar: string; en: string }) => value[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.title = `${site.company[locale]} — ${locale === 'ar' ? 'معاينة' : 'Home preview'} ${direction.toUpperCase()}`;
  }, [locale, rtl, direction]);

  const contactHref = (sector?: string) => whatsappUrl(site.offices[0].phone, locale, sector);

  const contactLink = (label: string, sector?: string, className = 'action-link') => (
    <a className={className} href={sector ? '#contact' : contactHref()} target={sector ? undefined : '_blank'} rel={sector ? undefined : 'noreferrer'} onClick={sector ? () => setSelectedSector(sector) : undefined}>
      {label}<ArrowRight size={17} aria-hidden="true" />
    </a>
  );

  const activityImage = (item: typeof site.activities[number], eager = false, className = '') => (
    <img className={`${className} ${['oil', 'foods'].includes(item.id) ? 'is-packaging' : ''}`} src={`${BASE}${item.image.replace(/^\//, '')}`} alt={`${tx(item.title)} — ${tx(item.description)}`}
      loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} />
  );

  return (
    <div className={`site direction-${direction} ${rtl ? 'is-rtl' : 'is-ltr'}`}>
      <div className="preview-switch" aria-label={rtl ? 'اختيار المعاينة' : 'Choose preview'}>
        <span>{rtl ? 'المعاينة' : 'PREVIEW'}</span>
        {(['a', 'b', 'c'] as Direction[]).map((item) => (
          <a key={item} href={`${BASE}preview/${item}`} aria-current={item === direction ? 'page' : undefined}>{item.toUpperCase()}</a>
        ))}
      </div>
      <header className="topbar">
        <a className="company-name" href="#top">{site.company[locale]}</a>
        <nav aria-label={rtl ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a href="#about">{rtl ? 'من نحن' : 'About Us'}</a>
          <a href="#contact">{rtl ? 'تواصل معنا' : 'Contact Us'}</a>
          <button type="button" className="language-toggle" onClick={() => setLocale(rtl ? 'en' : 'ar')} aria-label={rtl ? 'Switch to English' : 'التبديل إلى العربية'}>
            {rtl ? 'EN' : 'عربي'}
          </button>
        </nav>
      </header>

      {direction === 'a' && (
        <main id="top" className="dossier">
          <section className="hero hero-a">
            <div className="hero-copy">
              <p className="edition">{rtl ? 'الكويت · سوريا · منذ 2019' : 'KUWAIT · SYRIA · EST. 2019'}</p>
              <h1>{tx(directionCopy.a)}</h1>
              <p className="lead">{tx(site.overview)}</p>
              {contactLink(rtl ? 'تواصل للاستفسار' : 'Make an enquiry')}
            </div>
            <div className="hero-photo">
              {activityImage(site.activities[2], true)}
              <div className="logo-plaque"><img src={`${BASE}images/official-logo.jpeg`} alt={rtl ? 'الشعار الرسمي لشركة اوتو سيرفس اب' : 'Official Auto Service App company logo'} /></div>
            </div>
          </section>
          <section id="about" className="company-strip">
            <div><span>{rtl ? 'الاسم التجاري' : 'COMPANY'}</span><strong>{site.company[locale]}</strong></div>
            <div><span>{rtl ? 'سنة التأسيس' : 'ESTABLISHED'}</span><strong>{site.founded}</strong></div>
            <div><span>{rtl ? 'نطاق العمل' : 'OPERATING IN'}</span><strong>{rtl ? 'الكويت · سوريا' : 'Kuwait · Syria'}</strong></div>
          </section>
          <section className="dossier-section">
            <div className="section-head"><h2>{rtl ? 'مجالات العمل' : 'Activities register'}</h2><p>{rtl ? 'خمسة مجالات ضمن التجارة العامة.' : 'Five areas within general trading.'}</p></div>
            <div className="ledger">
              {site.activities.map((item) => (
                <article className="ledger-row" key={item.id}>
                  <div className="row-photo">{activityImage(item)}</div>
                  <div className="row-content"><h3>{tx(item.title)}</h3><p>{tx(item.description)}</p><span className="product-list">{tx(item.products)}</span></div>
                  {contactLink(rtl ? 'استفسر' : 'Enquire', tx(item.sector), 'row-link')}
                </article>
              ))}
            </div>
          </section>
          <ContactSection locale={locale} rtl={rtl} selectedSector={selectedSector} />
        </main>
      )}

      {direction === 'b' && (
        <main id="top" className="network">
          <section id="about" className="hero hero-b">
            <div className="hero-b-copy">
              <div className="region-stamp">{rtl ? 'مقر الكويت · نشاط في سوريا' : 'KUWAIT BASE · OPERATING IN SYRIA'}</div>
              <h1>{tx(directionCopy.b)}</h1>
              <p>{tx(site.overview)}</p>
              {contactLink(rtl ? 'ابدأ استفسارك' : 'Start an enquiry')}
            </div>
            <div className="hero-b-image">{activityImage(site.activities[0], true)}<img className="b-logo" src={`${BASE}images/official-logo.jpeg`} alt={rtl ? 'الشعار الرسمي لشركة اوتو سيرفس اب' : 'Official Auto Service App company logo'} /></div>
          </section>
          <section className="network-offices">
            <h2>{rtl ? 'مكاتب التواصل' : 'Office points'}</h2>
            {site.offices.map((office) => <div className="office-sign" key={office.key}>
              <MapPin size={20} aria-hidden="true" />
              <div><span>{tx(office.name)}</span><strong dir={rtl ? 'rtl' : 'ltr'}>{tx(office.address)}</strong></div>
              <a href={whatsappUrl(office.phone, locale)} target="_blank" rel="noreferrer">{rtl ? 'واتساب' : 'WhatsApp'} <ArrowRight size={16} /></a>
            </div>)}
          </section>
          <section className="supply-paths">
            <div className="paths-heading"><h2>{rtl ? 'مسارات التوريد' : 'Supply areas'}</h2><p>{rtl ? 'اختر المجال لبدء التواصل.' : 'Choose an area to begin an enquiry.'}</p></div>
            <div className="path-list">
              {site.activities.map((item) => <article className="path" key={item.id}>
                <div className="path-title"><h3>{tx(item.title)}</h3></div>
                <div className="path-description"><p>{tx(item.description)}</p><small>{tx(item.products)}</small></div>
                <div className="path-image">{activityImage(item)}</div>
                {contactLink(rtl ? 'استفسر عن المجال' : 'Enquire about this area', tx(item.sector), 'path-cta')}
              </article>)}
            </div>
          </section>
          <ContactSection locale={locale} rtl={rtl} selectedSector={selectedSector} />
        </main>
      )}

      {direction === 'c' && (
        <main id="top" className="product-house">
          <section className="hero hero-c">
            <div className="hero-c-visual">
              {activityImage(site.activities[2], true)}
              <div className="logo-seal"><img src={`${BASE}images/official-logo.jpeg`} alt={rtl ? 'الشعار الرسمي لشركة اوتو سيرفس اب' : 'Official Auto Service App company logo'} /></div>
            </div>
            <div className="hero-c-copy">
              <p className="catalog-line">{rtl ? 'المنتجات والعلامات' : 'PRODUCTS & BRANDS'}</p>
              <h1>{tx(directionCopy.c)}</h1>
              <h2>{rtl ? 'Auto-Oil · Shamco / Wafrat El-Sham' : 'Auto-Oil · Shamco / Wafrat El-Sham'}</h2>
              <p>{tx(site.overview)}</p>
              <a className="scroll-link" href="#products">{rtl ? 'استكشف المنتجات' : 'Explore products'} {rtl ? <ArrowUpLeft size={18} /> : <ArrowDownRight size={18} />}</a>
            </div>
          </section>
          <section id="about" className="product-intro">
            <div><h2>{site.company[locale]}</h2><p>{tx(site.overview)}</p></div>
            <span>{rtl ? 'تأسست 2019 · الكويت وسوريا' : 'Established 2019 · Kuwait and Syria'}</span>
          </section>
          <section id="products" className="catalog">
            <div className="catalog-head"><h2>{rtl ? 'المنتجات المختارة' : 'Selected products'}</h2><p>{rtl ? 'أسماء ومواصفات المنتجات كما وردت.' : 'Product names and details as provided.'}</p></div>
            <article className="feature-product">
              <div className="feature-image">{activityImage(site.activities[3])}</div>
              <div className="feature-copy"><span className="product-kicker">{rtl ? 'أغذية مستوردة' : 'FINE FOOD IMPORTS'}</span><h3>Shamco / Wafrat El-Sham</h3><p>{tx(site.activities[3].description)}</p><ul><li>{rtl ? 'زيت زيتون بكر ممتاز · 0.5 لتر و1 لتر' : 'Extra virgin olive oil · 0.5L and 1L'}</li><li>{rtl ? 'زيتون أخضر على الطريقة الإسبانية · زيتون أسود' : 'Spanish-style green olives · Black olives'}</li><li>{rtl ? 'جبنة عكاوي · جبنة فيتا' : 'Akkawi · Feta cheese'}</li></ul><small>{rtl ? '[TO CONFIRM] علاقة العلامتين واكتمال القائمة' : '[TO CONFIRM] brand relationship and list completeness'}</small>{contactLink(rtl ? 'استفسر عن المنتجات' : 'Enquire about products', tx(site.activities[3].sector))}</div>
            </article>
            <article className="oil-product"><div className="oil-copy"><span className="product-kicker">{rtl ? 'زيوت المحركات' : 'ENGINE OILS'}</span><h3>Auto-Oil</h3><p>{tx(site.activities[2].description)}</p><div className="oil-lines" dir="ltr"><b>Auto-Oil 5000</b><b>Auto-Oil 10000</b><b>Auto-Oil 15000</b></div><p>{rtl ? 'مثال: 5W-30 · 1 لتر / 4 لتر' : 'Example: 5W-30 · 1L / 4L'}</p><small>{rtl ? '[TO CONFIRM] الدرجات والأحجام الكاملة' : '[TO CONFIRM] full grades and sizes'}</small>{contactLink(rtl ? 'استفسر عن زيوت Auto-Oil' : 'Enquire about Auto-Oil', tx(site.activities[2].sector))}</div><div className="oil-image">{activityImage(site.activities[2])}</div></article>
          </section>
          <section className="portfolio" aria-labelledby="portfolio-title"><h2 id="portfolio-title">{rtl ? 'مجالات أخرى' : 'Across the portfolio'}</h2>
            {site.activities.filter((activity) => !['foods', 'oil'].includes(activity.id)).map((item) => <article className="portfolio-row" key={item.id}>
              <div className="portfolio-photo">{activityImage(item)}</div><div><h3>{tx(item.title)}</h3><p>{tx(item.description)}</p><p className="product-list">{tx(item.products)}</p>{contactLink(rtl ? 'استفسر' : 'Enquire', tx(item.sector), 'text-link')}</div>
            </article>)}
          </section>
          <ContactSection locale={locale} rtl={rtl} selectedSector={selectedSector} />
        </main>
      )}
      <footer className="footer"><span>{site.company[locale]}</span><a href={emailUrl(locale)}><Mail size={15} />{site.email}</a><span>{rtl ? 'معاينة تصميمية · A / B / C' : 'Design exploration · A / B / C'}</span></footer>
    </div>
  );
}

function ContactSection({ locale, rtl, selectedSector }: { locale: Locale; rtl: boolean; selectedSector?: string }) {
  return <section id="contact" className="contact-section">
    <div className="contact-heading"><h2>{rtl ? 'مكاتب الشركة' : 'Contact the company'}</h2><p>{rtl ? 'للاستفسارات التجارية، تواصل مع المكتب المناسب.' : 'For business enquiries, contact the relevant office.'}</p></div>
    {selectedSector && <p className="selected-enquiry">{rtl ? 'استفسار عن:' : 'Enquiry about:'} {selectedSector}</p>}
    <div className="contact-offices">{site.offices.map((office) => <article className="contact-office" key={office.key}>
      <span className="office-country">{rtl ? 'مكتب' : 'OFFICE'} · {office.name[locale]}</span>
      <h3>{office.name[locale]}</h3><p dir={rtl ? 'rtl' : 'ltr'}>{office.address[locale]}</p>
      <a href={whatsappUrl(office.phone, locale, selectedSector)} target="_blank" rel="noreferrer">{rtl ? 'تواصل عبر واتساب' : 'Message on WhatsApp'} <ArrowRight size={16} /></a>
    </article>)}</div>
    <a className="email-contact" href={emailUrl(locale, selectedSector)}>{site.email}<Mail size={18} /></a>
  </section>;
}

const baseRoot = BASE.endsWith('/') ? BASE : `${BASE}/`;
if (window.location.pathname === baseRoot) {
  window.location.replace(`${baseRoot}preview/a`);
} else {
  createRoot(document.getElementById('root')!).render(<App />);
}
