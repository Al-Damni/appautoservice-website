import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { ArrowDown, ArrowDownToLine, ArrowUpRight, ChevronDown, ImagePlus, Menu, Trash2, X } from 'lucide-react';
import oliveOilAndCheeseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(2)_1793863143115.jpg';
import autoOilImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(1)_1793863143115.jpg';
import companyLogoImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(3)_1793863143116.jpg';
import hydroponicGreenhouseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_1793863143117.jpg';

type Language = 'en' | 'ar';
type AssetRecord = { slot: string; blob: Blob };
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const DB_NAME = 'auto-service-corporate-assets';
const STORE_NAME = 'images';
const ASSET_CHANGE_EVENT = 'auto-service-image-updated';
const BRAND_ASSETS = {
  logo: companyLogoImage,
  lubricants: autoOilImage,
  food: oliveOilAndCheeseImage,
  hydroponics: hydroponicGreenhouseImage,
};

function openAssetDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME, { keyPath: 'slot' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getSavedAsset(slot: string): Promise<Blob | undefined> {
  const db = await openAssetDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(slot);
    request.onsuccess = () => { resolve((request.result as AssetRecord | undefined)?.blob); db.close(); };
    request.onerror = () => { reject(request.error); db.close(); };
  });
}

async function saveAsset(slot: string, blob: Blob): Promise<void> {
  const db = await openAssetDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put({ slot, blob } satisfies AssetRecord);
    transaction.oncomplete = () => { db.close(); resolve(); };
    transaction.onerror = () => { db.close(); reject(transaction.error); };
  });
}

async function removeAsset(slot: string): Promise<void> {
  const db = await openAssetDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(slot);
    transaction.oncomplete = () => { db.close(); resolve(); };
    transaction.onerror = () => { db.close(); reject(transaction.error); };
  });
}

function SavedAssetImage({ slot, initial, fallback, alt }: { slot: string; initial: string; fallback: string; alt: string }) {
  const [source, setSource] = useState(initial);

  useEffect(() => {
    let alive = true;
    let objectUrl = '';
    const refresh = async () => {
      try {
        const blob = await getSavedAsset(slot);
        if (!alive) return;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = blob ? URL.createObjectURL(blob) : '';
        setSource(objectUrl || initial);
      } catch {
        if (alive) setSource(initial);
      }
    };
    const onAssetChange = (event: Event) => {
      if ((event as CustomEvent<{ slot: string }>).detail?.slot === slot) void refresh();
    };
    void refresh();
    window.addEventListener(ASSET_CHANGE_EVENT, onAssetChange);
    return () => {
      alive = false;
      window.removeEventListener(ASSET_CHANGE_EVENT, onAssetChange);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [slot, initial]);

  return <img src={source} alt={alt} onError={() => setSource(fallback)} />;
}

const copy = {
  en: {
    nav: ['Home', 'Energy sector', 'Automotive & lubricants', 'Food products', 'Hydroponics', 'About us', 'Contact'],
    locationLine: 'KUWAIT  ·  SYRIA  ·  ESTABLISHED 2019',
    language: 'عربي',
    menu: 'Open navigation',
    editLogo: 'Add company logo',
    replaceLogo: 'Replace logo',
    remove: 'Remove image',
    heroEyebrow: 'AUTO SERVICE APP FOR GENERAL TRADING',
    heroTitle: <>Regional supply.<br /><em>Practical connections.</em></>,
    heroText: 'Supplying the Syrian Ministry of Petroleum and connecting automotive parts, lubricants, Syrian food products and hydroponic agriculture across Kuwait and Syria.',
    explore: 'Explore our sectors',
    downloadProfile: 'Download company profile (PDF)',
    contactWhatsApp: 'Contact us on WhatsApp',
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
    imageAdd: 'Add image',
    imageReplace: 'Replace image',
    imageAdded: 'Saved on this device',
    imageReady: 'Default image · choose to replace',
    imageHint: 'Drop an image here or choose a file',
    imageError: 'Please choose an image under 12 MB.',
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
    logoHint: 'Add your logo',
    logoSaved: 'Logo saved on this device',
    logoReady: 'Logo placeholder',
    imagePrivacy: 'Images are saved only on this device',
  },
  ar: {
    nav: ['الرئيسية', 'قطاع الطاقة', 'السيارات والزيوت', 'المنتجات الغذائية', 'الزراعة المائية', 'من نحن', 'تواصل معنا'],
    locationLine: 'الكويت  ·  سوريا  ·  تأسست عام ٢٠١٩',
    language: 'EN',
    menu: 'فتح قائمة التنقل',
    editLogo: 'أضف شعار الشركة',
    replaceLogo: 'استبدل الشعار',
    remove: 'إزالة الصورة',
    heroEyebrow: 'أوتو سيرفس اب للتجارة العامة',
    heroTitle: <>إمداد إقليمي.<br /><em>روابط عملية.</em></>,
    heroText: 'نورد لوزارة النفط السورية ونربط بين قطع غيار السيارات والزيوت والمنتجات الغذائية السورية والزراعة المائية في الكويت وسوريا.',
    explore: 'اكتشف قطاعاتنا',
    downloadProfile: 'تنزيل الملف التعريفي (PDF)',
    contactWhatsApp: 'تواصل عبر واتساب',
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
    imageAdd: 'أضف صورة',
    imageReplace: 'استبدل الصورة',
    imageAdded: 'حُفظت على هذا الجهاز',
    imageReady: 'الصورة الافتراضية · اختر للاستبدال',
    imageHint: 'أفلت صورة هنا أو اختر ملفاً',
    imageError: 'يرجى اختيار صورة يقل حجمها عن ١٢ ميغابايت.',
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
    logoHint: 'أضف شعارك',
    logoSaved: 'حُفظ الشعار على هذا الجهاز',
    logoReady: 'مساحة مخصصة للشعار',
    imagePrivacy: 'تُحفظ الصور على هذا الجهاز فقط',
  },
} as const;

type ImageControlProps = {
  slot: string;
  initial?: string;
  fallback?: string;
  alt: string;
  label: string;
  addText: string;
  replaceText: string;
  removeText: string;
  savedText: string;
  readyText: string;
  hintText: string;
  errorText: string;
  className?: string;
  compact?: boolean;
};

function ImageControl({ slot, initial, fallback, alt, label, addText, replaceText, removeText, savedText, readyText, hintText, errorText, className = '', compact = false }: ImageControlProps) {
  const [source, setSource] = useState(initial ?? '');
  const [hasSaved, setHasSaved] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrl = useRef('');

  useEffect(() => {
    let alive = true;
    getSavedAsset(slot).then((blob) => {
      if (!alive || !blob) return;
      objectUrl.current = URL.createObjectURL(blob);
      setSource(objectUrl.current);
      setHasSaved(true);
    }).catch(() => { if (alive) setError(errorText); });
    return () => { alive = false; if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); };
  }, [slot, errorText]);

  const acceptFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 12 * 1024 * 1024) {
      setError(errorText);
      return;
    }
    setError('');
    try {
      await saveAsset(slot, file);
      window.dispatchEvent(new CustomEvent(ASSET_CHANGE_EVENT, { detail: { slot } }));
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = URL.createObjectURL(file);
      setSource(objectUrl.current);
      setHasSaved(true);
    } catch {
      setError(errorText);
    }
  };
  const onPick = (event: ChangeEvent<HTMLInputElement>) => {
    void acceptFile(event.target.files?.[0]);
    event.target.value = '';
  };
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    void acceptFile(event.dataTransfer.files?.[0]);
  };
  const clear = async () => {
    try {
      await removeAsset(slot);
      window.dispatchEvent(new CustomEvent(ASSET_CHANGE_EVENT, { detail: { slot } }));
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = '';
       setSource(fallback ?? initial ?? '');
      setHasSaved(false);
      setError('');
    } catch {
      setError(errorText);
    }
  };

  return (
    <div className={`image-control ${className}${source ? ' image-control-filled' : ''}${compact ? ' image-control-compact' : ''}`} onDragOver={(event) => event.preventDefault()} onDrop={onDrop}>
      {source && <img className="image-control-preview" src={source} alt={alt} onError={() => { if (fallback && source !== fallback) setSource(fallback); }} />}
      <div className="image-control-tools">
        <span className="image-control-label">{hasSaved ? savedText : source ? readyText : hintText}</span>
        {error && <span className="image-control-error" role="status">{error}</span>}
        <input ref={inputRef} type="file" accept="image/*" aria-label={`${source ? replaceText : addText}: ${label}`} hidden onChange={onPick} />
        <div className="image-control-actions">
          <button className="image-pick" type="button" onClick={() => inputRef.current?.click()} aria-label={`${source ? replaceText : addText}: ${label}`}>
            <ImagePlus size={14} />{source ? replaceText : addText}
          </button>
          {hasSaved && <button className="image-remove" type="button" onClick={() => void clear()} aria-label={`${removeText}: ${label}`} title={`${removeText}: ${label}`}><Trash2 size={14} /></button>}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trackPaused, setTrackPaused] = useState(false);
  const t = copy[language];
  const navIds = ['top', 'energy', 'automotive', 'food', 'hydroponics', 'company', 'contact'];
  const categoryInitial = (index: number, image: string) => {
    if (index === 0) return BRAND_ASSETS.lubricants;
    if (index === 1) return BRAND_ASSETS.food;
    if (index === 3) return BRAND_ASSETS.hydroponics;
    return asset(image);
  };
  const logoControl = {
    slot: 'company-logo',
    initial: BRAND_ASSETS.logo,
    fallback: BRAND_ASSETS.logo,
    alt: t.logoAlt,
    label: t.footerNote,
    addText: t.editLogo,
    replaceText: t.replaceLogo,
    removeText: t.remove,
    savedText: t.logoSaved,
    readyText: t.logoReady,
    hintText: t.logoHint,
    errorText: t.imageError,
    compact: true,
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const whatsapp = (phone: string) => `https://wa.me/${phone}`;
  const showcase = (
    <div className="showcase-viewport" onMouseEnter={() => setTrackPaused(true)} onMouseLeave={() => setTrackPaused(false)} onFocus={() => setTrackPaused(true)} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setTrackPaused(false);
    }}>
      <div className={`showcase-track${trackPaused ? ' is-paused' : ''}`}>
        {t.categories.map((item, index) => (
          <article className={`showcase-card card-${index + 1}`} key={item.title}>
            <div className="showcase-image">
              <ImageControl
                slot={`showcase-${index}`}
                initial={categoryInitial(index, item.image)}
                fallback={asset(item.image)}
                alt={item.alt}
                label={item.title}
                addText={t.imageAdd}
                replaceText={t.imageReplace}
                removeText={t.remove}
                savedText={t.imageAdded}
                readyText={t.imageReady}
                hintText={t.imageHint}
                errorText={t.imageError}
              />
              <span className="card-index">0{index + 1} / 05</span>
            </div>
            <div className="showcase-card-copy"><span>{item.sub}</span><h3>{item.title}</h3></div>
          </article>
        ))}
        {t.categories.map((item, index) => (
          <article className={`showcase-card card-${index + 1} showcase-duplicate`} key={`duplicate-${item.title}`} aria-hidden="true">
            <div className="showcase-image"><SavedAssetImage slot={`showcase-${index}`} initial={categoryInitial(index, item.image)} fallback={asset(item.image)} alt="" /><span className="card-index">0{index + 1} / 05</span></div>
            <div className="showcase-card-copy"><span>{item.sub}</span><h3>{item.title}</h3></div>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <main className={`site-shell${language === 'ar' ? ' rtl' : ''}`}>
      <div className="utility-bar"><div className="wrap utility-inner"><span>{t.locationLine}</span><a href="mailto:anas@appautoservice.com">anas@appautoservice.com</a></div></div>
      <header className="header">
        <div className="wrap header-inner">
          <div className="brand">
            <ImageControl {...logoControl} className="logo-uploader" />
            <a href="#top" className="brand-text" aria-label={t.footerNote} onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <strong>{language === 'en' ? 'AUTO SERVICE APP' : 'أوتو سيرفس اب'}</strong><small>{language === 'en' ? 'FOR GENERAL TRADING' : 'للتجارة العامة'}</small>
            </a>
          </div>
          <nav className="main-nav" aria-label={language === 'en' ? 'Main navigation' : 'التنقل الرئيسي'}>
            {t.nav.map((label, index) => <button type="button" key={label} onClick={() => go(navIds[index])}>{label}</button>)}
          </nav>
          <div className="header-actions">
            <a className="header-wa" href={whatsapp('96555554199')} target="_blank" rel="noreferrer" aria-label={`${t.kuwait} WhatsApp`}>KW <ArrowUpRight size={13} /></a>
            <a className="header-wa" href={whatsapp('963959811087')} target="_blank" rel="noreferrer" aria-label={`${t.syria} WhatsApp`}>SY <ArrowUpRight size={13} /></a>
            <button type="button" className="language-btn" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}>{t.language}<ChevronDown size={13} /></button>
            <button type="button" className="menu-btn" aria-label={t.menu} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {mobileOpen && <nav className="mobile-panel" aria-label={language === 'en' ? 'Mobile navigation' : 'تنقل الهاتف'}>{t.nav.map((label, index) => <button type="button" key={label} onClick={() => go(navIds[index])}>{label}</button>)}<div className="mobile-wa"><a href={whatsapp('96555554199')} target="_blank" rel="noreferrer">{t.kuwait} · WhatsApp</a><a href={whatsapp('963959811087')} target="_blank" rel="noreferrer">{t.syria} · WhatsApp</a></div></nav>}
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
            <a className="hero-cta hero-cta-secondary" href={whatsapp('96555554199')} target="_blank" rel="noreferrer" data-testid="link-hero-whatsapp">
              {t.contactWhatsApp}<ArrowUpRight size={15} />
            </a>
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
        <div className="wrap showcase-foot"><span>{language === 'en' ? 'SUPPLY · MOBILITY · PRODUCTION' : 'الإمداد · الحركة · الإنتاج'}</span><span>{language === 'en' ? 'Drag and drop images to personalize the cards' : 'أفلت الصور لتخصيص البطاقات'} · {t.imagePrivacy}</span></div>
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
                <button type="button" onClick={() => go('contact')} data-testid={`button-sector-contact-${sector.id}`}>
                  {language === 'en' ? 'Business enquiries' : 'استفسارات الأعمال'} <ArrowUpRight size={14} />
                </button>
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
            <div className="contact-aside"><p>{t.contactCopy}</p><span className="contact-email-label">{t.email}</span><a className="email-link" href="mailto:anas@appautoservice.com">anas@appautoservice.com<ArrowUpRight size={15} /></a></div>
          </div>
          <div className="offices">
            <article className="office">
              <span className="office-code">01 — KUWAIT</span><h3>{t.kuwait}</h3>
              <span className="office-label">{t.address}</span><p className="office-address" dir="ltr">Al-Aqaila, Taiba Mall Building, 7th Floor</p>
              <a className="office-link" href={whatsapp('96555554199')} target="_blank" rel="noreferrer"><span>{t.message}</span><span dir="ltr">+965 5555 4199</span><ArrowUpRight size={15} /></a>
            </article>
            <article className="office">
              <span className="office-code">02 — SYRIA</span><h3>{t.syria}</h3>
              <span className="office-label">{t.address}</span><p className="office-address" dir="ltr">Rif Dimashq, Qura Al-Sham, Building 43</p>
              <a className="office-link" href={whatsapp('963959811087')} target="_blank" rel="noreferrer"><span>{t.message}</span><span dir="ltr">+963 959 811 087</span><ArrowUpRight size={15} /></a>
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
