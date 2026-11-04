import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, Menu, MessageCircle, Printer, Search, X } from 'lucide-react';

type Language = 'en' | 'ar';
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

const copy = {
  en: {
    nav: ['Sectors', 'Our approach', 'History', 'Contact'],
    heroEyebrow: 'ALDAMNI GROUP  /  KUWAIT & SYRIA',
    heroTitle: <>A connected view<br />of <em>essential</em> business.</>,
    heroText: 'From national-scale energy supply to the parts, products and food people rely on every day. ALDAMNI Group brings distinct sectors together across the region.',
    explore: 'Explore our sectors',
    profile: 'Corporate profile',
    ticker: ['Energy supply', 'Automotive commerce', 'Lubricants', 'Fine foods', 'Smart agriculture'],
    sectorsKicker: '01  /  What we do',
    sectorsTitle: 'A portfolio built around what keeps life moving.',
    sectorsIntro: 'Independent business lines, connected by a regional perspective and a practical understanding of how essential supply works.',
    viewSector: 'Explore sector',
    rows: [
      ['01', 'Oil & petroleum', 'Supply for the Syrian Ministry of Petroleum and the wider energy sector. Our primary business, focused on the dependable movement of essential resources.', 'National energy'],
      ['02', 'Auto Service App', 'A digital marketplace connecting automotive customers with spare parts and service needs.', 'Auto commerce'],
      ['03', 'Automotive lubricants', 'Engine oils and lubricants for vehicles, workshops and the broader automotive market.', 'Engine oils'],
      ['04', 'Fine foods', 'A considered selection of Syrian olive oil, artisanal cheeses and premium olives.', 'Syrian produce'],
      ['05', 'Hydroponics & agriculture', 'Smart growing approaches designed for Syria’s climate, water realities and agricultural potential.', 'Climate aware'],
    ],
    sectorDetailKicker: 'Sector focus',
    details: [
      { eyebrow: 'PRIMARY SECTOR', title: 'Oil & petroleum supply', lead: 'Supply for the Syrian Ministry of Petroleum and the wider energy sector is the Group’s primary focus.', body: 'A regional energy scope shaped around the movement of essential petroleum resources and the infrastructure that supports it.', bullets: ['Crude oil', 'Diesel', 'Petroleum derivatives'], visual: 'TANKERS · REFINERIES · PIPELINES · LOGISTICS', imageAlt: 'Oil storage and tanker logistics', cta: 'Discuss energy supply' },
      { eyebrow: 'DIGITAL AUTOMOTIVE', title: 'Auto Service App', lead: 'A spare-parts marketplace concept that brings vehicle needs into a clear mobile browsing experience.', body: 'The screen shown here is an illustrative product preview only. It does not connect to live inventory, sellers or ordering.', bullets: ['Browse spare-parts categories', 'Search-oriented mobile interface', 'Designed for automotive customers'], visual: 'ILLUSTRATIVE PREVIEW · NOT LIVE INVENTORY', imageAlt: 'Workshop parts for an illustrative marketplace preview', cta: 'Explore the portfolio' },
      { eyebrow: 'AUTOMOTIVE PRODUCTS', title: 'Engine oils & lubricants', lead: 'A product scope spanning passenger vehicles, workshops and heavy machinery.', body: 'The categories below describe the range of focus; no technical specifications or performance claims are implied.', bullets: ['Passenger vehicle oils', 'Workshop & commercial lubricants', 'Heavy machinery oils'], visual: 'PRODUCT CATEGORIES', imageAlt: 'Unbranded automotive lubricant containers', cta: 'Discuss product range' },
      { eyebrow: 'SYRIAN PRODUCE', title: 'Fine foods', lead: 'A focused selection that brings Syrian agricultural character to the table.', body: 'Olive oil, artisanal cheeses and premium olives reflect the variety of Syrian food traditions and agricultural context.', bullets: ['Syrian olive oil', 'Artisanal cheeses', 'Premium olives'], visual: 'SYRIAN AGRICULTURAL CONTEXT', imageAlt: 'Syrian olive oil, cheese and olives', cta: 'Explore fine foods' },
      { eyebrow: 'CLIMATE-AWARE GROWING', title: 'Hydroponics for Syria', lead: 'Greenhouse installations designed around Syria’s climate, water realities and growing needs.', body: 'The agricultural approach includes nutrient-film technique, solar-powered pumps and automation for climate-aware growing.', bullets: ['Greenhouse installations', 'Nutrient-film technique (NFT)', 'Solar pumps & automation'], visual: 'WATER · SUN · CONTROLLED GROWING', imageAlt: 'Hydroponic greenhouse growing channels', cta: 'Explore smart agriculture' },
    ],
    autoSearch: 'Search spare parts',
    autoCategories: ['Engine filters', 'Brake components'],
    illustrative: 'Illustrative only',
    hydroLogo: 'Illustrative green-tech mark',
    productLabels: ['Passenger vehicle', 'Workshop & commercial', 'Heavy machinery'],
    approachKicker: '02  /  The operating idea',
    approachTitle: 'Serious about supply. Curious about what comes next.',
    approachText: 'ALDAMNI Group works across essential sectors where local knowledge and reliable connections matter. Our portfolio spans energy, automotive commerce, consumer products and agricultural production—each with its own expertise and audience.',
    approachNote: 'A regional company with practical roots in Kuwait and Syria.',
    photoLabel: 'A view of smart agriculture',
    brandsKicker: '03  /  Across the portfolio',
    brandsTitle: 'Distinct brands. One regional point of view.',
    brandsIntro: 'Use the image controls to add your own brand marks or product photography. Previews stay in this browser only and are not uploaded.',
    upload: 'Choose image',
    uploaded: 'Image preview added',
    localOnly: 'Browser-local preview · not uploaded',
    addImageHint: 'Add a brand or product image',
    brandCards: [
      ['ALDAMNI Group', 'Parent company mark or corporate image.'],
      ['Auto Service App', 'Automotive marketplace brand or product imagery.'],
      ['Engine oils', 'Lubricants and automotive product imagery.'],
      ['Fine foods', 'Syrian olive oil, cheeses and premium olives.'],
    ],
    historyKicker: '04  /  Company history',
    historyTitle: 'Built with a regional horizon.',
    historyText: 'Established in 2019. This timeline marks the company’s history through 2026—without suggesting milestones beyond the facts presented here.',
    historyLabel: 'Company history',
    contactKicker: '05  /  Get in touch',
    contactTitle: 'Let’s talk about the work.',
    contactText: 'For business enquiries, connect with our regional offices. WhatsApp is the contact channel for the numbers listed below.',
    emailLabel: 'Email',
    kuwait: 'Kuwait headquarters',
    syria: 'Regional office · Syria',
    kuwaitAddress: 'Al-Aqaila, Taiba Mall Building, 7th Floor',
    syriaAddress: 'Rif Dimashq, Qura Al-Assad / Qura Al-Sham, Building 43',
    whatsappOnly: 'WhatsApp only',
    whatsapp: 'Message on WhatsApp',
    whatsappQuick: 'Choose a regional office',
    footerNote: 'Regional business across essential sectors.',
    print: 'Print / save PDF',
    profileTitle: 'Corporate profile',
    profileIntro: 'ALDAMNI Group is a regional company connecting energy supply, automotive commerce, premium products and climate-aware agriculture.',
    profileEstablished: 'Established 2019',
    profileSectors: 'Business sectors',
    profileContacts: 'Regional offices',
    profileFinePrint: 'Company history presented: 2019–2026. No additional milestones or performance claims are implied.',
    domainTitle: 'Make this address yours.',
    domainText: 'Add your preferred website address for this corporate profile. This setting is stored only in this browser and can be skipped.',
    domainPlaceholder: 'e.g. aldamni.com',
    domainSave: 'Save address',
    domainSkip: 'Skip for now',
    domainEdit: 'Website address',
    close: 'Close',
    hydroMark: 'Water-wise growing',
    openMenu: 'Open navigation',
  },
  ar: {
    nav: ['القطاعات', 'نهجنا', 'تاريخنا', 'تواصل معنا'],
    heroEyebrow: 'مجموعة الدمني  /  الكويت وسوريا',
    heroTitle: <>رؤية مترابطة<br />لأعمال <em>أساسية.</em></>,
    heroText: 'من إمدادات الطاقة على المستوى الوطني إلى قطع الغيار والمنتجات والأغذية التي يعتمد عليها الناس يومياً. تجمع مجموعة الدمني قطاعات متنوعة ضمن رؤية إقليمية.',
    explore: 'اكتشف قطاعاتنا',
    profile: 'الملف المؤسسي',
    ticker: ['إمدادات الطاقة', 'تجارة السيارات', 'زيوت المحركات', 'أغذية مختارة', 'زراعة ذكية'],
    sectorsKicker: '٠١  /  مجالات عملنا',
    sectorsTitle: 'مجموعة أعمال ترتكز على ما يحرك الحياة.',
    sectorsIntro: 'مجالات مستقلة تجمعها رؤية إقليمية وفهم عملي لكيفية عمل الإمدادات الأساسية.',
    viewSector: 'اكتشف القطاع',
    rows: [
      ['٠١', 'النفط والطاقة', 'إمدادات لوزارة النفط السورية وقطاع الطاقة الأوسع. مجالنا الأساسي، مع التركيز على حركة الموارد الضرورية.', 'الطاقة الوطنية'],
      ['٠٢', 'تطبيق Auto Service', 'سوق رقمي يربط عملاء السيارات باحتياجات قطع الغيار والخدمات.', 'تجارة السيارات'],
      ['٠٣', 'زيوت السيارات', 'زيوت محركات ومواد تشحيم للمركبات وورش الصيانة وسوق السيارات الأوسع.', 'زيوت المحركات'],
      ['٠٤', 'أغذية مختارة', 'مجموعة مختارة من زيت الزيتون السوري والأجبان الحرفية والزيتون الفاخر.', 'منتجات سورية'],
      ['٠٥', 'الزراعة الذكية', 'أساليب زراعة ذكية مصممة لمناخ سوريا وواقع المياه وإمكاناتها الزراعية.', 'مراعية للمناخ'],
    ],
    sectorDetailKicker: 'مجال التركيز',
    details: [
      { eyebrow: 'القطاع الأساسي', title: 'إمدادات النفط والطاقة', lead: 'تُعد الإمدادات لوزارة النفط السورية وقطاع الطاقة الأوسع محور أعمال المجموعة الأساسي.', body: 'نطاق إقليمي في قطاع الطاقة يركز على حركة الموارد النفطية الأساسية والبنية التحتية الداعمة لها.', bullets: ['النفط الخام', 'الديزل', 'المشتقات النفطية'], visual: 'ناقلات · مصافٍ · خطوط أنابيب · خدمات لوجستية', imageAlt: 'خزانات نفط وعمليات نقل بالناقلات', cta: 'استفسر عن إمدادات الطاقة' },
      { eyebrow: 'تجارة السيارات الرقمية', title: 'تطبيق Auto Service', lead: 'تصور لسوق قطع غيار يضع احتياجات المركبات ضمن تجربة تصفح واضحة عبر الهاتف.', body: 'الشاشة المعروضة هنا تصور توضيحي فقط. لا تتصل بمخزون أو بائعين أو طلبات مباشرة.', bullets: ['تصفح فئات قطع الغيار', 'واجهة هاتف تعتمد على البحث', 'مصممة لعملاء السيارات'], visual: 'تصور توضيحي · ليس مخزوناً مباشراً', imageAlt: 'قطع غيار ضمن ورشة لتصور سوق رقمي', cta: 'اكتشف محفظة الأعمال' },
      { eyebrow: 'منتجات السيارات', title: 'زيوت المحركات ومواد التشحيم', lead: 'مجموعة منتجات تشمل سيارات الركاب والورش والآليات الثقيلة.', body: 'توضح الفئات أدناه نطاق التركيز؛ ولا تتضمن مواصفات تقنية أو ادعاءات أداء.', bullets: ['زيوت سيارات الركاب', 'مواد تشحيم للورش والاستخدام التجاري', 'زيوت الآليات الثقيلة'], visual: 'فئات المنتجات', imageAlt: 'عبوات زيوت سيارات دون علامات تجارية', cta: 'استفسر عن فئات المنتجات' },
      { eyebrow: 'منتجات سورية', title: 'أغذية مختارة', lead: 'تشكيلة مختارة تنقل ملامح الزراعة السورية إلى المائدة.', body: 'يعكس زيت الزيتون والأجبان الحرفية والزيتون الفاخر تنوع التقاليد الغذائية والسياق الزراعي في سوريا.', bullets: ['زيت زيتون سوري', 'أجبان حرفية', 'زيتون فاخر'], visual: 'سياق زراعي سوري', imageAlt: 'زيت زيتون سوري وجبن وزيتون', cta: 'اكتشف الأغذية المختارة' },
      { eyebrow: 'زراعة مراعية للمناخ', title: 'الزراعة المائية في سوريا', lead: 'منشآت بيوت محمية مصممة لمناخ سوريا وواقع المياه واحتياجات الزراعة.', body: 'يشمل النهج الزراعي تقنية الغشاء المغذي، ومضخات تعمل بالطاقة الشمسية، والأتمتة لدعم زراعة تراعي المناخ.', bullets: ['منشآت بيوت محمية', 'تقنية الغشاء المغذي (NFT)', 'مضخات شمسية وأتمتة'], visual: 'مياه · شمس · زراعة محكومة', imageAlt: 'قنوات زراعة مائية داخل بيت محمي', cta: 'اكتشف الزراعة الذكية' },
    ],
    autoSearch: 'ابحث عن قطع غيار',
    autoCategories: ['فلاتر المحرك', 'مكونات الفرامل'],
    illustrative: 'تصور توضيحي فقط',
    hydroLogo: 'علامة توضيحية للتقنيات الزراعية',
    productLabels: ['سيارات الركاب', 'الورش والاستخدام التجاري', 'الآليات الثقيلة'],
    approachKicker: '٠٢  /  فكرتنا التشغيلية',
    approachTitle: 'جدية في الإمداد. وانفتاح على ما يأتي بعده.',
    approachText: 'تعمل مجموعة الدمني في قطاعات أساسية حيث تكتسب المعرفة المحلية والروابط الموثوقة أهمية كبيرة. تشمل محفظتنا الطاقة وتجارة السيارات والمنتجات الاستهلاكية والإنتاج الزراعي، ولكل مجال خبرته وجمهوره.',
    approachNote: 'شركة إقليمية بجذور عملية في الكويت وسوريا.',
    photoLabel: 'لمحة عن الزراعة الذكية',
    brandsKicker: '٠٣  /  ضمن محفظتنا',
    brandsTitle: 'علامات متنوعة. ورؤية إقليمية واحدة.',
    brandsIntro: 'استخدم أدوات الصور لإضافة شعارات العلامات أو صور المنتجات. تبقى المعاينات في هذا المتصفح فقط ولا يتم رفعها.',
    upload: 'اختر صورة',
    uploaded: 'تمت إضافة معاينة الصورة',
    localOnly: 'معاينة محلية في المتصفح · لم يتم الرفع',
    addImageHint: 'أضف صورة للعلامة التجارية أو المنتج',
    brandCards: [
      ['مجموعة الدمني', 'شعار الشركة الأم أو صورة مؤسسية.'],
      ['تطبيق Auto Service', 'العلامة التجارية أو صور سوق السيارات.'],
      ['زيوت المحركات', 'صور الزيوت والمنتجات الخاصة بالسيارات.'],
      ['أغذية مختارة', 'زيت الزيتون السوري والأجبان والزيتون الفاخر.'],
    ],
    historyKicker: '٠٤  /  تاريخ الشركة',
    historyTitle: 'انطلقت برؤية إقليمية.',
    historyText: 'تأسست عام ٢٠١٩. يعرض هذا الخط الزمني تاريخ الشركة حتى عام ٢٠٢٦، دون الإيحاء بإنجازات تتجاوز المعلومات المذكورة.',
    historyLabel: 'تاريخ الشركة',
    contactKicker: '٠٥  /  تواصل معنا',
    contactTitle: 'يسعدنا الحديث عن أعمالنا.',
    contactText: 'للاستفسارات التجارية، تواصلوا مع مكاتبنا الإقليمية. واتساب هو قناة التواصل للأرقام المدرجة أدناه.',
    emailLabel: 'البريد الإلكتروني',
    kuwait: 'المقر الرئيسي · الكويت',
    syria: 'المكتب الإقليمي · سوريا',
    kuwaitAddress: 'Al-Aqaila, Taiba Mall Building, 7th Floor',
    syriaAddress: 'Rif Dimashq, Qura Al-Assad / Qura Al-Sham, Building 43',
    whatsappOnly: 'واتساب فقط',
    whatsapp: 'تواصل عبر واتساب',
    whatsappQuick: 'اختر مكتباً إقليمياً',
    footerNote: 'أعمال إقليمية في قطاعات أساسية.',
    print: 'طباعة / حفظ PDF',
    profileTitle: 'الملف المؤسسي',
    profileIntro: 'مجموعة الدمني شركة إقليمية تربط بين إمدادات الطاقة وتجارة السيارات والمنتجات المميزة والزراعة المراعية للمناخ.',
    profileEstablished: 'تأسست عام ٢٠١٩',
    profileSectors: 'قطاعات الأعمال',
    profileContacts: 'المكاتب الإقليمية',
    profileFinePrint: 'تاريخ الشركة المعروض: ٢٠١٩–٢٠٢٦. لا يتضمن ذلك أي ادعاءات إضافية حول الإنجازات أو الأداء.',
    domainTitle: 'خصص عنوان هذا الموقع.',
    domainText: 'أضف عنوان الموقع الذي تفضله لهذا الملف المؤسسي. يُحفظ هذا الإعداد في هذا المتصفح فقط ويمكنك تخطيه.',
    domainPlaceholder: 'مثال: aldamni.com',
    domainSave: 'حفظ العنوان',
    domainSkip: 'تخطي الآن',
    domainEdit: 'عنوان الموقع',
    close: 'إغلاق',
    hydroMark: 'زراعة موفرة للمياه',
    openMenu: 'فتح قائمة التنقل',
  },
} as const;

type ImageSlotProps = { label: string; t: { upload: string; uploaded: string; localOnly: string; addImageHint: string }; initial?: string };

function ImageSlot({ label, t, initial }: ImageSlotProps) {
  const [preview, setPreview] = useState(initial ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const onPick = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };
  return (
    <div className={`image-slot${preview ? ' has-image' : ''}`}>
      {preview && <img src={preview} alt={`${label} preview`} />}
      <div className="image-slot-content">
        <strong>{preview ? t.uploaded : label}</strong>
        <small>{preview ? t.localOnly : t.addImageHint}</small>
        <input ref={inputRef} type="file" accept="image/*" aria-label={`${t.upload}: ${label}`} hidden onChange={onPick} />
        <button type="button" className="upload-trigger" onClick={() => inputRef.current?.click()}>{t.upload}</button>
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [domainOpen, setDomainOpen] = useState(false);
  const [domain, setDomain] = useState('');
  const [domainInput, setDomainInput] = useState('');
  const [activeSector, setActiveSector] = useState(0);
  const t = copy[language];
  const detail = t.details[activeSector];
  const navIds = ['sectors', 'approach', 'history', 'contact'];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  useEffect(() => {
    const stored = localStorage.getItem('aldamni-profile-domain');
    if (stored) {
      setDomain(stored);
    } else if (!localStorage.getItem('aldamni-domain-prompt-seen')) {
      setDomainOpen(true);
    }
  }, []);

  const moveTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };
  const selectSector = (index: number, scrollToDetail = false) => {
    setActiveSector(index);
    if (scrollToDetail) {
      window.setTimeout(() => document.getElementById('sector-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    }
  };
  const closeDomain = () => {
    localStorage.setItem('aldamni-domain-prompt-seen', 'true');
    setDomainOpen(false);
  };
  const saveDomain = () => {
    const normalized = domainInput.trim();
    if (!normalized) return;
    localStorage.setItem('aldamni-profile-domain', normalized);
    localStorage.setItem('aldamni-domain-prompt-seen', 'true');
    setDomain(normalized);
    setDomainOpen(false);
  };
  const editDomain = () => {
    setDomainInput(domain);
    setDomainOpen(true);
  };
  const whatsappKuwait = 'https://wa.me/96555554199';
  const whatsappSyria = 'https://wa.me/963959811087';
  const go = (id: string) => moveTo(id);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');
  const openProfile = () => setProfileOpen(true);
  const printProfile = () => {
    if (!profileOpen) setProfileOpen(true);
    window.setTimeout(() => window.print(), 100);
  };

  return (
    <main className={`site-shell${language === 'ar' ? ' rtl' : ''}`}>
      <div className="topline">
        <div className="wrap topline-inner">
          <span>{language === 'en' ? 'KUWAIT  ·  SYRIA  ·  REGIONAL REACH' : 'الكويت  ·  سوريا  ·  حضور إقليمي'}</span>
          <a href="mailto:anas@appautoservice.com">anas@appautoservice.com</a>
        </div>
      </div>
      <header className="nav-shell">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="ALDAMNI Group home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="brand-mark">AD</span>
            <span className="brand-word"><b>ALDAMNI</b><small>GROUP  ·  EST. 2019</small></span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {t.nav.map((label, index) => <button type="button" key={label} onClick={() => go(navIds[index])}>{label}</button>)}
          </nav>
          <div className="nav-actions">
            <button type="button" className="language-btn" onClick={toggleLanguage} aria-label="Switch language">{language === 'en' ? 'عربي' : 'EN'} <ChevronDown size={13} /></button>
            <button type="button" className="menu-btn" aria-label={t.openMenu} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={18} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {mobileOpen && <nav className="mobile-panel" aria-label="Mobile navigation">{t.nav.map((label, index) => <button type="button" key={label} onClick={() => go(navIds[index])}>{label}</button>)}<button type="button" onClick={openProfile}>{t.profile}</button></nav>}
      </header>

      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="reveal">
            <div className="eyebrow">{t.heroEyebrow}</div>
            <h1>{t.heroTitle}</h1>
            <p className="hero-copy">{t.heroText}</p>
            <div className="hero-cta">
              <button type="button" className="btn" onClick={() => go('sectors')}>{t.explore} <ArrowDown size={15} /></button>
              <button type="button" className="btn btn-quiet" onClick={openProfile}>{t.profile} <ArrowUpRight size={15} /></button>
            </div>
          </div>
          <div className="hero-art reveal-delay" aria-hidden="true">
              <img src={asset('aldamni-hero.jpg')} alt="" />
            <div className="hero-stamp"><strong>2019</strong>{language === 'en' ? 'ESTABLISHED' : 'تأسست'}</div>
          </div>
          <div className="hero-meta"><span>{language === 'en' ? 'Essential sectors · Regional connections' : 'قطاعات أساسية · روابط إقليمية'}</span><span>01 — 05</span></div>
        </div>
      </section>
      <div className="ticker"><div className="wrap ticker-inner">{t.ticker.map((item) => <span key={item}><i />{item}</span>)}</div></div>

      <section className="section" id="sectors">
        <div className="wrap">
          <div className="section-head">
            <div><div className="section-kicker">{t.sectorsKicker}</div><h2>{t.sectorsTitle}</h2></div>
            <p className="section-intro">{t.sectorsIntro}</p>
          </div>
          <div className="sector-list">
            {t.rows.map((row, index) => <article className="sector-row" key={row[0]} id={`sector-${index + 1}`}>
              <span className="sector-num">{row[0]}</span>
              <h3 className="sector-title">{row[1]}</h3>
              <p className="sector-desc">{row[2]}</p>
              <button type="button" className="sector-link" onClick={() => selectSector(index, true)}><span>{language === 'en' ? '↗' : '↖'}</span>{t.viewSector} · {row[3]}</button>
            </article>)}
          </div>
        </div>
      </section>

      <section className="sector-detail-section" id="sector-details">
        <div className="wrap">
          <div className="sector-detail-heading">
            <div><div className="section-kicker">{t.sectorDetailKicker}</div><h2>{language === 'en' ? 'A closer look at each business.' : 'نظرة أقرب إلى كل مجال.'}</h2></div>
            <span className="detail-count">{String(activeSector + 1).padStart(2, '0')} <i>/</i> 05</span>
          </div>
          <div className="sector-tabs" role="tablist" aria-label={language === 'en' ? 'Business sectors' : 'قطاعات الأعمال'}>
            {t.rows.map((row, index) => <button type="button" role="tab" id={`sector-tab-${index}`} aria-controls="sector-panel" aria-selected={activeSector === index} tabIndex={activeSector === index ? 0 : -1} className={`sector-tab${activeSector === index ? ' active' : ''}`} key={row[0]} onClick={() => selectSector(index)} onKeyDown={(event) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const rtl = language === 'ar';
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : event.key === 'ArrowRight' ? (activeSector + (rtl ? 4 : 1)) % 5 : (activeSector + (rtl ? 1 : 4)) % 5;
              selectSector(next);
              document.getElementById(`sector-tab-${next}`)?.focus();
            }}>
              <span>{row[0]}</span>{row[1]}
            </button>)}
          </div>
          <article className="sector-detail-panel" id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${activeSector}`}>
            <div className="detail-copy">
              <div className="detail-eyebrow">{detail.eyebrow}</div>
              <h3>{detail.title}</h3>
              <p className="detail-lead">{detail.lead}</p>
              <p className="detail-body">{detail.body}</p>
              <ul className="detail-bullets">{detail.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              <button type="button" className="btn detail-cta" onClick={() => go('contact')}>{detail.cta}<ArrowUpRight size={15} /></button>
            </div>
            <div className={`detail-visual detail-visual-${activeSector + 1}`}>
              {activeSector === 1 ? (
                <div className="marketplace-stage">
                  <div className="marketplace-caption">{detail.visual}</div>
                  <div className="phone-device">
                    <div className="phone-notch" />
                    <div className="phone-status"><span>9:41</span><span>● ● ●</span></div>
                    <div className="phone-apphead"><b>Auto Service</b><span>⌕</span></div>
                    <div className="phone-search"><Search size={13} /><span>{t.autoSearch}</span></div>
                    <div className="phone-feature-image"><img src={asset('aldamni-auto.jpg')} alt="" /></div>
                    <div className="phone-section-title">{language === 'en' ? 'Browse parts' : 'تصفح القطع'}</div>
                    {t.autoCategories.map((category, index) => <div className="phone-product" key={category}><span className="phone-product-thumb" style={{ backgroundImage: `url(${asset('aldamni-auto.jpg')})`, backgroundPosition: index === 0 ? '35% 50%' : '70% 50%' }} /><span>{category}<small>{language === 'en' ? 'Sample category' : 'فئة تجريبية'}</small></span><ArrowUpRight size={12} /></div>)}
                    <div className="phone-bottom-nav"><i /><i /><i /><i /></div>
                  </div>
                  <span className="illustrative-label">{t.illustrative}</span>
                </div>
              ) : activeSector === 2 ? (
                <div className="lubricant-visual">
                  <img src={asset('aldamni-lubricants.jpg')} alt={detail.imageAlt} />
                  <span className="visual-tag">{detail.visual}</span>
                  <div className="lubricant-categories">{t.productLabels.map((label, index) => <div className="lubricant-category" key={label}><span>0{index + 1}</span><b>{label}</b></div>)}</div>
                </div>
              ) : activeSector === 4 ? (
                <div className="hydro-visual">
                  <img src={asset('aldamni-greenhouse.jpg')} alt={detail.imageAlt} />
                  <div className="hydro-mark">
                    <svg viewBox="0 0 64 64" role="img" aria-label={t.hydroLogo}>
                      <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M32 48V21m0 16c-10 0-15-5-15-13 9 0 15 4 15 13Zm0-8c0-9 5-14 14-14 0 9-5 14-14 14Zm-9 16h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="32" cy="13" r="3" fill="currentColor" />
                    </svg>
                    <span>{t.hydroLogo}</span>
                  </div>
                  <span className="visual-tag">{detail.visual}</span>
                </div>
              ) : (
                <div className={`photo-detail photo-detail-${activeSector + 1}`}>
                  <img src={asset(activeSector === 0 ? 'aldamni-hero.jpg' : 'aldamni-food.jpg')} alt={detail.imageAlt} />
                  <span className="visual-tag">{detail.visual}</span>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="feature" id="approach">
        <div className="wrap feature-layout">
          <div className="feature-visual">
            <img src={asset('aldamni-greenhouse.jpg')} alt={t.photoLabel} />
            <div className="visual-tag">{t.hydroMark}</div>
          </div>
          <div className="feature-copy">
            <div className="section-kicker">{t.approachKicker}</div>
            <h2>{t.approachTitle}</h2>
            <p>{t.approachText}</p>
            <div className="feature-note">{t.approachNote}</div>
          </div>
        </div>
      </section>

      <section className="brands" id="brands">
        <div className="wrap">
          <div className="section-head">
            <div><div className="section-kicker">{t.brandsKicker}</div><h2>{t.brandsTitle}</h2></div>
            <p className="section-intro">{t.brandsIntro}</p>
          </div>
          <div className="brand-grid">
            {t.brandCards.map((card, index) => <article className="brand-card" key={card[0]}>
              <ImageSlot label={card[0]} t={t} initial={index === 1 ? asset('aldamni-auto.jpg') : index === 2 ? asset('aldamni-lubricants.jpg') : index === 3 ? asset('aldamni-food.jpg') : undefined} />
              <h3>{card[0]}</h3><p>{card[1]}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="history" id="history">
        <div className="wrap history-grid">
          <div><div className="section-kicker">{t.historyKicker}</div><h2>{t.historyTitle}</h2></div>
          <p className="history-copy">{t.historyText}</p>
          <div className="history-years">2019–2026<small>{t.historyLabel}</small></div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <div className="section-kicker">{t.contactKicker}</div>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <a className="contact-email" href="mailto:anas@appautoservice.com">{t.emailLabel} <ArrowUpRight size={15} /> anas@appautoservice.com</a>
          </div>
          <div className="office-grid">
            <article className="office">
              <span className="office-label">{t.kuwait}</span><h3>Kuwait</h3>
              <p>{t.kuwaitAddress}<br /><span>{t.whatsappOnly}</span></p>
              <a href={whatsappKuwait} target="_blank" rel="noreferrer">{t.whatsapp} · +965 55554199 <ArrowUpRight size={14} /></a>
            </article>
            <article className="office">
              <span className="office-label">{t.syria}</span><h3>Syria</h3>
              <p>{t.syriaAddress}<br /><span>{t.whatsappOnly}</span></p>
              <a href={whatsappSyria} target="_blank" rel="noreferrer">{t.whatsapp} · +963 959811087 <ArrowUpRight size={14} /></a>
            </article>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span className="footer-brand">ALDAMNI GROUP</span>
          <span>{t.footerNote} · 2019–2026</span>
          <button type="button" onClick={openProfile}>{t.profile}</button>
          <button type="button" onClick={printProfile}><Printer size={13} /> {t.print}</button>
          <button type="button" onClick={editDomain}>{domain ? `${t.domainEdit}: ${domain}` : t.domainEdit}</button>
        </div>
      </footer>

      <div className={`whatsapp-float${whatsappOpen ? ' is-open' : ''}`}>
        {whatsappOpen && <div className="whatsapp-popover" aria-label={t.whatsappQuick}>
          <strong>{t.whatsappQuick}</strong>
          <a href={whatsappKuwait} target="_blank" rel="noreferrer">{t.kuwait}<span>+965 55554199</span></a>
          <a href={whatsappSyria} target="_blank" rel="noreferrer">{t.syria}<span>+963 959811087</span></a>
        </div>}
        <button type="button" className="whatsapp-toggle" aria-label={t.whatsapp} aria-expanded={whatsappOpen} onClick={() => setWhatsappOpen(!whatsappOpen)}>
          {whatsappOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>

      {profileOpen && <div className="profile-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setProfileOpen(false); }}>
        <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title">
          <button type="button" className="profile-close" aria-label={t.close} onClick={() => setProfileOpen(false)}><X size={17} /></button>
          <div className="section-kicker">ALDAMNI GROUP · 2019–2026</div>
          <h2 id="profile-title">{t.profileTitle}</h2>
          <p>{t.profileIntro}</p>
          <ul><li>{t.profileEstablished}</li><li>{t.profileSectors}: {t.rows.map((row) => row[1]).join(' · ')}</li><li>{t.kuwait}: {t.kuwaitAddress} · +965 55554199</li><li>{t.syria}: {t.syriaAddress} · +963 959811087</li><li>anas@appautoservice.com</li></ul>
          <p>{t.profileFinePrint}</p>
          <button type="button" className="btn" onClick={printProfile}><Printer size={15} />{t.print}</button>
        </section>
      </div>}

      {domainOpen && <div className="target-backdrop">
        <section className="target-dialog" role="dialog" aria-modal="true" aria-labelledby="domain-title">
          <div className="section-kicker">{language === 'en' ? 'ALDAMNI GROUP' : 'مجموعة الدمني'}</div>
          <h2 id="domain-title">{t.domainTitle}</h2><p>{t.domainText}</p>
          <label htmlFor="domain-input" className="section-kicker">{t.domainEdit}</label>
          <input id="domain-input" value={domainInput} onChange={(e) => setDomainInput(e.target.value)} placeholder={t.domainPlaceholder} onKeyDown={(e) => { if (e.key === 'Enter') saveDomain(); }} />
          <div className="dialog-actions"><button type="button" onClick={saveDomain}>{t.domainSave}</button><button type="button" className="skip" onClick={closeDomain}>{t.domainSkip}</button></div>
        </section>
      </div>}
    </main>
  );
}

export default App;
