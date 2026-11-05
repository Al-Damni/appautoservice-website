import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowDownToLine, ArrowUpRight, ChevronDown, Pause, Play } from 'lucide-react';
import { heroSlides } from '@/data/heroSlides';

type Language = 'en' | 'ar';
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const HERO_SECONDS_PER_SLIDE = 5.6;
const HERO_FADE_SECONDS = 0.9;

const copy = {
  en: {
    nav: ['About Us', 'Contact Us'],
    language: 'AR',
    menu: 'Open navigation',
    heroTitle: 'Auto Service App for General Trading LLC',
    pauseShowcase: 'Pause slideshow',
    resumeShowcase: 'Play slideshow',
    chooseSlide: 'Choose a company image',
    showSlide: 'Show image',
    slideDescription: 'Company image slideshow',
    currentSlide: (current: number, total: number) => `Image ${current} of ${total}`,
    downloadProfile: 'Download company profile (PDF)',
    inquire: 'Choose a contact option',
    inquiryKuwait: 'Kuwait WhatsApp · +965 55554199',
    inquirySyria: 'Syria WhatsApp · +963 959811087',
    inquiryEmail: 'Email · anas@appautoservice.com',
    established: 'ESTABLISHED',
    sectorCards: [
      { id: 'energy', name: 'Petroleum & energy', description: 'Petroleum supply and logistics for the Syrian Ministry of Petroleum.' },
      { id: 'automotive', name: 'Auto spare parts', description: 'The Auto Service App for automotive spare parts.' },
      { id: 'lubricants', name: 'Auto-Oil lubricants', description: 'Our own Auto-Oil 5000, 10000 and 15000 lubricants.' },
      { id: 'food', name: 'Fine food products', description: 'Fine-food imports for Kuwait’s cooperative societies, including Shamco Wafrat El-Sham olive oil, olives and Syrian cheeses.' },
      { id: 'hydroponics', name: 'Hydroponic agriculture', description: 'Modern greenhouse production for local lettuce, tomatoes and cucumbers in Syria.' },
    ],
    companyTitle: <>From an auto service app<br />to a regional supplier.</>,
    companyCopy: 'Auto Service App for General Trading LLC was established in Kuwait in 2019 (Commercial Registration No. 421940) as a limited liability company. It began with its automotive spare-parts app, then expanded into fine-food imports for Kuwait’s cooperative societies, developed its own automotive lubricants brand, and introduced hydroponic systems in Syria for lettuce, tomatoes and cucumbers. Today, it also supplies vital petroleum derivatives, including to the Syrian Ministry of Petroleum.',
    companyNote: 'A Kuwait-established limited liability company.',
    establishedLabel: 'Established in Kuwait',
    years: '2019',
    registration: 'Commercial Registration',
    registrationNumber: '421940',
    hubs: 'Regional hubs',
    hubNames: 'Kuwait · Syria',
    contactTitle: 'Talk to our regional offices.',
    contactCopy: 'For business enquiries, reach us by email or WhatsApp at the appropriate office.',
    kuwait: 'Kuwait',
    kuwaitAddress: 'Al-Aqaila, Taiba Mall Building, 7th Floor',
    syria: 'Syria',
    syriaAddress: 'Rif Dimashq, Qura Al-Sham, Building 43',
    address: 'Address',
    whatsapp: 'WhatsApp',
    message: 'Message on WhatsApp',
    email: 'Email',
    footerNote: 'Auto Service App for General Trading LLC',
  },
  ar: {
    nav: ['من نحن', 'تواصل معنا'],
    language: 'EN',
    menu: 'فتح قائمة التنقل',
    heroTitle: 'شركة أوتو سيرفس اب للتجارة العامة ذ.م.م',
    pauseShowcase: 'إيقاف عرض الصور مؤقتاً',
    resumeShowcase: 'تشغيل عرض الصور',
    chooseSlide: 'اختر صورة للشركة',
    showSlide: 'اعرض الصورة',
    slideDescription: 'عرض صور الشركة',
    currentSlide: (current: number, total: number) => `الصورة ${current} من ${total}`,
    downloadProfile: 'تنزيل الملف التعريفي للشركة (PDF)',
    inquire: 'اختر وسيلة التواصل',
    inquiryKuwait: 'تواصل عبر واتساب الكويت (Kuwait WhatsApp)',
    inquirySyria: 'تواصل عبر واتساب سوريا (Syria WhatsApp)',
    inquiryEmail: 'إرسال بريد إلكتروني (Email)',
    established: 'تأسست عام',
    sectorCards: [
      { id: 'energy', name: 'النفط والطاقة', description: 'إمدادات نفطية وخدمات لوجستية لوزارة النفط السورية.' },
      { id: 'automotive', name: 'قطع غيار السيارات', description: 'تطبيق أوتو سيرفس لقطع غيار السيارات.' },
      { id: 'lubricants', name: 'زيوت Auto-Oil', description: 'زيوت Auto-Oil 5000 و10000 و15000 بعلامتنا الخاصة.' },
      { id: 'food', name: 'المنتجات الغذائية الفاخرة', description: 'استيراد منتجات غذائية للجمعيات التعاونية في الكويت، تشمل زيت زيتون وزيتون وأجباناً سورية من شامكو وفرات الشام.' },
      { id: 'hydroponics', name: 'الزراعة المائية', description: 'إنتاج حديث داخل البيوت المحمية للخس والطماطم والخيار في سوريا.' },
    ],
    companyTitle: <>من تطبيق لخدمة السيارات<br />إلى مورّد إقليمي.</>,
    companyCopy: 'تأسست شركة أوتو سيرفس اب للتجارة العامة ذ.م.م في الكويت عام ٢٠١٩ (رقم السجل التجاري ٤٢١٩٤٠) كشركة ذات مسؤولية محدودة. بدأت بتطبيقها لقطع غيار السيارات، ثم توسعت إلى استيراد المنتجات الغذائية للجمعيات التعاونية في الكويت، وطورت علامتها الخاصة لزيوت التشحيم، وأدخلت أنظمة الزراعة المائية في سوريا لإنتاج الخس والطماطم والخيار. وتورد اليوم مشتقات نفطية حيوية، منها الإمداد لوزارة النفط السورية.',
    companyNote: 'شركة ذات مسؤولية محدودة تأسست في الكويت.',
    establishedLabel: 'تأسست في الكويت',
    years: '٢٠١٩',
    registration: 'رقم السجل التجاري',
    registrationNumber: '٤٢١٩٤٠',
    hubs: 'مراكز إقليمية',
    hubNames: 'الكويت · سوريا',
    contactTitle: 'تواصل مع مكاتبنا الإقليمية.',
    contactCopy: 'لاستفسارات الأعمال، تواصلوا معنا عبر البريد الإلكتروني أو واتساب للمكتب المناسب.',
    kuwait: 'الكويت',
    kuwaitAddress: 'العقيلة، مبنى طيبة مول، الطابق السابع',
    syria: 'سوريا',
    syriaAddress: 'ريف دمشق، قرى الشام، بناء ٤٣',
    address: 'العنوان',
    whatsapp: 'واتساب',
    message: 'تواصل عبر واتساب',
    email: 'البريد الإلكتروني',
    footerNote: 'شركة أوتو سيرفس اب للتجارة العامة ذ.م.م',
  },
} as const;

function getInquiryMessage(language: Language, topic: string) {
  return language === 'en'
    ? `Hello Auto Service App for General Trading LLC, I would like to enquire about ${topic}. Please share product details, availability and next steps.`
    : `مرحباً، أود الاستفسار عن ${topic} من شركة أوتو سيرفس اب للتجارة العامة ذ.م.م. يرجى تزويدي بالتفاصيل والتوافر والخطوات التالية.`;
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
    <details
      className={`inquiry-menu ${className}`}
      onMouseEnter={(event) => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) event.currentTarget.open = true;
      }}
      onMouseLeave={(event) => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) event.currentTarget.open = false;
      }}
    >
      <summary
        className={summaryClassName}
        data-testid={`button-${testId}`}
        onClick={(event) => {
          const menu = event.currentTarget.closest('details') as HTMLDetailsElement | null;
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && menu?.open) event.preventDefault();
        }}
      >
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

// The official site renders its logo as inline SVG rather than a standalone image.
function OfficialLogoMark() {
  return (
    <svg className="official-brand-mark" viewBox="0 0 44 45" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.485.21C8.609 1.43 2.488 7.196.929 14.867l-.245 1.209v28.23l.224.212c.389.37.617.394 3.675.394 3.223 0 3.373-.022 3.709-.535.145-.221.164-1.466.194-12.94.033-12.692.033-12.695.254-13.641 1.04-4.467 3.682-7.527 7.7-8.92 1.59-.551 1.801-.562 11.11-.53l8.574.029.05 10.4.05 10.402.326.29c.485.435 1.115.416 1.578-.048l.339-.339v-11.12c0-11.831.016-11.46-.489-11.802-.303-.206-16.679-.323-19-.135-6.116.494-10.875 4.692-12.497 11.025l-.256.997-.032 12.237-.032 12.237H2.977V29.722c0-12.445.005-12.83.204-13.972C4.255 9.561 8.73 4.674 14.91 2.937c1.95-.548 1.506-.531 14.608-.566l12.136-.033.026 20.937.026 20.936.326.326c.472.472 1.169.472 1.641 0L44 44.21V.633l-.326-.29L43.35.05l-12.983.01c-10.568.008-13.15.035-13.881.148zm4.985 11.47c-5.04.441-9.023 4.109-9.674 8.908-.199 1.465-.207 8.036-.01 8.506.295.708-.353.662 9.704.69l9.052.025-.002 3.39c-.001 3.031-.02 3.453-.188 3.988-.68 2.179-1.99 3.707-3.975 4.635-1.409.659-1.828.698-7.41.698h-4.925v-2.779l4.561-.036c5.02-.04 4.98-.035 6.238-.701 2.507-1.328 3.56-5.456 1.39-5.456-.687 0-1.112.455-1.217 1.301-.101.817-.377 1.366-.92 1.83-.757.649-.837.657-6.44.657-6.644 0-6.004-.398-6.004 3.732 0 3.012.036 3.246.56 3.6.337.229 9.61.35 11.752.154 4.857-.445 8.45-3.88 8.924-8.533.207-2.036.092-7.951-.16-8.292-.41-.55-.007-.527-9.693-.529l-9.005-.002.038-3.414c.053-4.711.657-6.405 2.92-8.18 2.166-1.7 2.962-1.864 9.094-1.864h4.511v2.771l-3.215.049c-4.548.068-6.016.474-7.78 2.153-1.886 1.794-2.206 4.679-.524 4.727.777.022 1.18-.392 1.293-1.33.179-1.48 1.577-2.638 3.664-3.034.625-.118 1.597-.152 4.405-.153 4.9-.002 4.487.323 4.531-3.57.035-3.071-.005-3.368-.507-3.726l-.321-.23-5.135-.01c-2.823-.005-5.313.007-5.532.026z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.435.027c3.44.014 9.07.014 12.51 0C40.388.012 37.572 0 30.69 0c-6.88 0-9.696.012-6.255.027zm-6.231 2.388c.123.024.325.024.449 0 .123-.024.022-.044-.225-.044s-.348.02-.224.044zM5.814 5.559l-.495.524.523-.495c.288-.272.523-.508.523-.523 0-.075-.092.008-.552.494zm13.088.445c.123.023.325.023.448 0 .124-.024.023-.044-.224-.044s-.348.02-.224.044zM7.608 7.154l-.495.524.523-.495c.288-.272.524-.507.524-.523 0-.075-.093.008-.552.494zm30.906 10.742c0 6.059.012 8.538.027 5.508.015-3.03.015-7.986 0-11.016-.015-3.03-.027-.55-.027 5.508zm-2.392.798c0 5.675.012 7.996.026 5.159.015-2.838.015-7.48 0-10.318-.014-2.838-.026-.516-.026 5.159zm-5.592-3.29c0 .795.016 1.12.035.723.019-.398.019-1.048 0-1.446-.019-.397-.035-.072-.035.723zm-15.893-.623l-.546.573.574-.545c.532-.506.619-.601.545-.601-.016 0-.274.258-.573.573zm1.797 1.57c-.242.247-.418.449-.39.449.027 0 .248-.202.49-.449s.418-.448.39-.448c-.027 0-.247.201-.49.448zM.632 30.308c0 7.676.012 10.802.026 6.946.014-3.856.014-10.137 0-13.957-.014-3.82-.026-.665-.026 7.01zm18.837-11.29l-.293.324.324-.293c.302-.273.37-.355.293-.355-.017 0-.163.146-.324.324zM6.115 31.006c0 6.36.012 8.977.026 5.814.015-3.162.015-8.366 0-11.564-.014-3.198-.026-.61-.026 5.75zm2.392.797c0 6.744.012 9.518.027 6.164.014-3.354.014-8.872 0-12.262-.015-3.39-.027-.646-.027 6.098zm5.562-10.318c0 .247.02.348.043.225a1.425 1.425 0 000-.45c-.024-.123-.043-.022-.043.225zm7.423 8.35l8.996.025.029 3.14.028 3.14-.002-3.165-.002-3.166h-9.022l-9.023-.001 8.996.026 6.951 10.517-.494.523.523-.494c.486-.46.57-.552.495-.552-.016 0-.251.235-.523.523zm1.394 1.994l-.293.324.324-.293c.178-.161.324-.307.324-.324 0-.077-.082-.01-.355.293zm-6.2 2.536a.811.811 0 00.349 0c.096-.025.017-.046-.175-.046s-.27.02-.174.046zM41.606 23.23c0 11.46.012 16.162.026 10.45.014-5.71.014-15.087 0-20.835-.014-5.748-.026-1.075-.026 10.385zM23.879 5.908c2.477.015 6.56.015 9.072 0 2.513-.014.486-.026-4.503-.026-4.99 0-7.046.012-4.569.026zm-.241 2.493c2.289.015 6.035.015 8.324 0 2.29-.015.416-.027-4.162-.027-4.579 0-6.452.012-4.162 0zM10.25 9.996l-.544.573.573-.545c.533-.506.619-.601.545-.601-.016 0-.274.258-.573.573zm13.893 4.087c1.196.016 3.125.016 4.287 0 1.161-.016.182-.029-2.175-.029-2.358 0-3.308.013-2.112.03zM3.025 30.06c0 6.881.012 9.696.026 6.256.015-3.441.015-9.071 0-12.512-.014-3.44-.026-.625-.026 6.256zm5.557-10.667c0 .192.02.27.046.174a.82.82 0 000-.349c-.025-.096-.046-.017-.046.175zm18.296-.125c.945.017 2.493.017 3.439 0 .946-.016.172-.03-1.72-.03s-2.665.014-1.72.03zm-11.87 18.044a251.7 251.7 0 004.884 0c1.361-.015.276-.028-2.41-.028-2.687 0-3.8.013-2.475.028zm1.402 5.184c1.275.016 3.36.016 4.636 0 1.274-.015.232-.028-2.318-.028-2.55 0-3.593.013-2.318.029zM3.05 44.989c.836.016 2.205.016 3.04 0 .837-.017.153-.03-1.52-.03-1.672 0-2.356.013-1.52.03z"
      />
    </svg>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [slideshowPaused, setSlideshowPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const touchStartX = useRef<number | null>(null);
  const t = copy[language];
  const navIds = ['company', 'contact'];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      setSlideshowPaused(preference.matches);
    };
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useGSAP(() => {
    const slides = slideRefs.current.filter((slide): slide is HTMLDivElement => slide !== null);
    if (slides.length !== heroSlides.length) {
      timelineRef.current = null;
      return;
    }

    setActiveSlide(0);
    gsap.set(slides, { opacity: 0 });
    gsap.set(slides[0], { opacity: 1 });
    gsap.set(slides.map((slide) => slide.querySelector('img')), { scale: 1 });

    const timeline = gsap.timeline({ paused: true, repeat: -1 });
    const secondsPerSlide = HERO_SECONDS_PER_SLIDE;
    const fadeStart = (index: number) => (index + 1) * secondsPerSlide - HERO_FADE_SECONDS;

    slides.forEach((slide, index) => {
      const nextSlide = slides[(index + 1) % slides.length];
      const image = slide.querySelector('img');

      if (!reducedMotion && index === 0) {
        timeline.fromTo(
          image,
          { scale: 1 },
          { scale: 1.035, duration: secondsPerSlide, ease: 'none', immediateRender: false },
          0,
        );
      }
      timeline.fromTo(
        slide,
        { opacity: 1 },
        { opacity: 0, duration: HERO_FADE_SECONDS, ease: 'power1.inOut', immediateRender: false },
        fadeStart(index),
      );
      timeline.fromTo(
        nextSlide,
        { opacity: 0 },
        { opacity: 1, duration: HERO_FADE_SECONDS, ease: 'power1.inOut', immediateRender: false },
        fadeStart(index),
      );
      if (!reducedMotion && index > 0) {
        timeline.fromTo(
          image,
          { scale: 1.035 },
          { scale: 1, duration: secondsPerSlide, ease: 'none', immediateRender: false },
          index * secondsPerSlide - HERO_FADE_SECONDS,
        );
      }
    });

    timeline.eventCallback('onUpdate', () => {
      const current = Math.floor((timeline.time() + HERO_FADE_SECONDS) / secondsPerSlide) % slides.length;
      setActiveSlide((previous) => (previous === current ? previous : current));
    });
    timeline.eventCallback('onRepeat', () => setActiveSlide(0));
    timelineRef.current = timeline;
    if (!slideshowPaused && !reducedMotion) timeline.play();

    return () => {
      timelineRef.current = null;
    };
  }, { scope: heroRef, dependencies: [reducedMotion], revertOnUpdate: true });

  const whatsapp = (phone: string, topic = language === 'en' ? 'general business enquiry' : 'استفسار أعمال عام') => getWhatsAppUrl(phone, language, topic);

  const selectSlide = (index: number) => {
    setActiveSlide(index);
    const timeline = timelineRef.current;
    if (!timeline) return;
    timeline.pause();
    timeline.time(index * HERO_SECONDS_PER_SLIDE + 0.5, false);
    if (!slideshowPaused) timeline.play();
  };

  const moveSlide = (delta: number) => {
    selectSlide((activeSlide + delta + heroSlides.length) % heroSlides.length);
  };

  const toggleSlideshow = () => {
    const nextPaused = !slideshowPaused;
    setSlideshowPaused(nextPaused);
    if (nextPaused) timelineRef.current?.pause();
    else timelineRef.current?.play();
  };

  return (
    <main className={`site-shell${language === 'ar' ? ' rtl' : ''}`}>
      <header className="header">
        <div className="wrap header-inner">
          <a href="#top" className="brand" aria-label={t.footerNote} onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>
            <span className="brand-text">
              <strong>{language === 'en' ? 'Auto Service App for General Trading LLC' : 'شركة أوتو سيرفس اب للتجارة العامة ذ.م.م'}</strong>
            </span>
          </a>
          <nav className="main-nav" aria-label={language === 'en' ? 'Main navigation' : 'التنقل الرئيسي'}>
            {t.nav.map((label, index) => <a href={`#${navIds[index]}`} key={label} data-testid={`link-nav-${navIds[index]}`}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <button type="button" className="language-btn" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'} data-testid="button-language-toggle">{t.language}<ChevronDown size={13} /></button>
          </div>
        </div>
      </header>

      <section
        ref={heroRef}
        className="hero"
        id="top"
        aria-labelledby="home-showcase-title"
        aria-roledescription={t.slideDescription}
        onTouchStart={(event) => {
          if ((event.target as HTMLElement).closest('.hero-controls')) return;
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if ((event.target as HTMLElement).closest('.hero-controls')) {
            touchStartX.current = null;
            return;
          }
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (startX === null || endX === undefined || Math.abs(startX - endX) < 48) return;
          moveSlide(startX > endX ? 1 : -1);
        }}
        onTouchCancel={() => { touchStartX.current = null; }}
      >
        <h1 id="home-showcase-title" className="sr-only">{t.heroTitle}</h1>
        <div className="hero-slides" aria-hidden="false">
          {heroSlides.map((slide, index) => {
            const isActive = activeSlide === index;
            return (
              <div
                className={`hero-slide${isActive ? ' is-active' : ''}`}
                key={slide.src}
                ref={(node) => { slideRefs.current[index] = node; }}
                aria-hidden={!isActive}
                data-testid={`hero-slide-${index + 1}`}
              >
                <img
                  className="hero-slide-image"
                  src={slide.src}
                  alt={slide.alt[language]}
                  width={1024}
                  height={1024}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-controls">
          <div className="hero-pagination" role="group" aria-label={t.chooseSlide}>
            {heroSlides.map((slide, index) => (
              <button
                className={`hero-dot${activeSlide === index ? ' is-active' : ''}`}
                type="button"
                key={slide.src}
                aria-label={`${t.showSlide}: ${slide.alt[language]}`}
                aria-pressed={activeSlide === index}
                onClick={() => selectSlide(index)}
                data-testid={`button-hero-slide-${index + 1}`}
              >
                <span />
              </button>
            ))}
          </div>
          <span className="sr-only" aria-live="polite">{t.currentSlide(activeSlide + 1, heroSlides.length)}: {heroSlides[activeSlide].alt[language]}</span>
          <button
            type="button"
            className="hero-play-toggle"
            onClick={toggleSlideshow}
            aria-label={slideshowPaused ? t.resumeShowcase : t.pauseShowcase}
            aria-pressed={slideshowPaused}
            data-testid="button-hero-play-toggle"
          >
            {slideshowPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          </button>
        </div>
      </section>

      <section className="sector-directory" aria-labelledby="sector-directory-title">
        <div className="wrap">
          <div className="sector-directory-heading">
            <h2 id="sector-directory-title">{language === 'en' ? 'Our sectors' : 'قطاعاتنا'}</h2>
          </div>
          <div className="sector-directory-grid">
            {t.sectorCards.map((sector, index) => (
              <article className={`sector-detail sector-detail-${index + 1}`} id={sector.id} key={sector.id}>
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
            <img src={heroSlides[4].src} alt={language === 'en' ? 'Hydroponic greenhouse producing lettuce, tomatoes and cucumbers' : 'بيت محمي للزراعة المائية ينتج الخس والطماطم والخيار'} width={1024} height={576} loading="lazy" decoding="async" />
          </div>
          <div className="company-copy">
            <h2>{t.companyTitle}</h2>
            <p>{t.companyCopy}</p>
            <div className="company-note">{t.companyNote}</div>
            <div className="company-facts">
              <div><span>{t.establishedLabel}</span><strong>{t.years}</strong></div>
              <div><span>{t.registration}</span><strong>{t.registrationNumber}</strong></div>
              <div><span>{t.hubs}</span><strong>{t.hubNames}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="wrap">
          <div className="contact-intro">
            <div><h2>{t.contactTitle}</h2></div>
            <div className="contact-aside">
              <p>{t.contactCopy}</p>
              <a className="email-link" href={getEmailUrl(language, language === 'en' ? 'general business enquiry' : 'استفسار أعمال عام')} data-testid="link-contact-email">anas@appautoservice.com<ArrowUpRight size={15} /></a>
              <a className="profile-download" href={`${import.meta.env.BASE_URL}corporate-profile.pdf`} download data-testid="link-company-profile">
                <span>{t.downloadProfile}</span><ArrowDownToLine size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="offices">
            <article className="office">
              <h3>{t.kuwait}</h3>
              <span className="office-label">{t.address}</span><p className="office-address" dir={language === 'en' ? 'ltr' : 'rtl'}>{t.kuwaitAddress}</p>
              <a className="office-link" href={whatsapp('96555554199', t.kuwait)} target="_blank" rel="noopener noreferrer" data-testid="link-contact-kuwait-whatsapp"><span>{t.message}</span><span dir="ltr">+965 5555 4199</span><ArrowUpRight size={15} /></a>
            </article>
            <article className="office">
              <h3>{t.syria}</h3>
              <span className="office-label">{t.address}</span><p className="office-address" dir={language === 'en' ? 'ltr' : 'rtl'}>{t.syriaAddress}</p>
              <a className="office-link" href={whatsapp('963959811087', t.syria)} target="_blank" rel="noopener noreferrer" data-testid="link-contact-syria-whatsapp"><span>{t.message}</span><span dir="ltr">+963 959 811 087</span><ArrowUpRight size={15} /></a>
            </article>
          </div>
          <div className="footer-bottom">
            <a href="#top" className="footer-brand" data-testid="link-back-to-top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>{t.footerNote}</a>
            <span>KUWAIT · SYRIA</span><span>© 2019</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
