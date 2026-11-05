import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownToLine, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import oliveOilAndCheeseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(2)_1793863143115.jpg';
import autoOilImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(1)_1793863143115.jpg';
import hydroponicGreenhouseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_1793863143117.jpg';

type Language = 'en' | 'ar';
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const BRAND_ASSETS = {
  logo: `${import.meta.env.BASE_URL}images/Gemini_Generated_Image_jfi82pjfi82pjfi8_1793866780300.jpg`,
  appInterface: 'https://www.appautoservice.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-image-en.a85f4334.png&w=640&q=75',
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
    heroEyebrow: 'AUTO SERVICE APP FOR GENERAL TRADING LLC',
    heroTitle: <>Essential sectors.<br /><em>Trusted supply.</em></>,
    heroText: 'From petroleum derivatives for the Syrian Ministry of Petroleum to automotive spare parts, our own lubricants, food imports for Kuwait’s cooperative societies and hydroponics in Syria.',
    explore: 'Explore our sectors',
    downloadProfile: 'Download corporate profile (PDF)',
    contactWhatsApp: 'Contact us via WhatsApp',
    inquire: 'Choose a contact option',
    inquiryKuwait: 'Kuwait WhatsApp · +965 55554199',
    inquirySyria: 'Syria WhatsApp · +963 959811087',
    inquiryEmail: 'Email · anas@appautoservice.com',
    established: 'ESTABLISHED',
    sectorsEyebrow: 'A connected portfolio',
    sectorsTitle: 'Five sectors. One regional perspective.',
    sectorsText: 'A Kuwait-established company connecting mobility, food, agriculture and essential energy supply.',
    categories: [
      { title: 'Engine oils & lubricants', sub: 'Automotive products', image: 'auto-service-lubricants.jpg', alt: 'Auto-Oil 5000, 10000 and 15000 engine oil bottles' },
      { title: 'Olive oil & artisanal cheese', sub: 'Syrian food products', image: 'auto-service-food.jpg', alt: 'Shamco Wafrat El-Sham olive oil, olives and cheeses' },
      { title: 'Auto spare parts', sub: 'Through the Auto Service App', image: 'auto-service-parts.jpg', alt: 'Auto Service App interface connecting drivers to spare-parts dealers' },
      { title: 'Hydroponic agriculture', sub: 'Controlled growing', image: 'auto-service-greenhouse.jpg', alt: 'Hydroponic greenhouse growing lettuce, tomatoes and cucumbers' },
      { title: 'Petroleum tankers', sub: 'Petroleum supply', image: 'auto-service-petroleum.jpg', alt: 'Petroleum tanker and storage infrastructure at dusk' },
    ],
    sectorCards: [
      { id: 'energy', name: 'Petroleum & energy', description: 'Petroleum supply and logistics for the Syrian Ministry of Petroleum.' },
      { id: 'automotive', name: 'Auto service & lubricants', description: 'The Auto Service App, spare parts, and our own Auto-Oil 5000, 10000 and 15000 lubricants.' },
      { id: 'food', name: 'Fine food products', description: 'Fine-food imports for Kuwait’s cooperative societies, including Shamco Wafrat El-Sham olive oil, olives and Syrian cheeses.' },
      { id: 'hydroponics', name: 'Hydroponic agriculture', description: 'Modern greenhouse production for local lettuce, tomatoes and cucumbers in Syria.' },
    ],
    companyEyebrow: 'A Kuwait-established LLC',
    companyTitle: <>From an auto service app<br />to a regional supplier.</>,
    companyCopy: 'Auto Service App for General Trading LLC was established in Kuwait in 2019 (Commercial Registration No. 421940) as a limited liability company. It began with its automotive spare-parts app, then expanded into fine-food imports for Kuwait’s cooperative societies, developed its own automotive lubricants brand, and introduced hydroponic systems in Syria for lettuce, tomatoes and cucumbers. Today, it also supplies vital petroleum derivatives, including to the Syrian Ministry of Petroleum.',
    companyNote: 'A Kuwait-established limited liability company.',
    establishedLabel: 'Established in Kuwait',
    years: '2019',
    registration: 'Commercial Registration',
    registrationNumber: '421940',
    hubs: 'Regional hubs',
    hubNames: 'Kuwait · Syria',
    contactEyebrow: 'Business enquiries',
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
    logoAlt: 'Auto Service App for General Trading LLC 3D logo',
  },
  ar: {
    nav: ['من نحن', 'تواصل معنا'],
    language: 'EN',
    menu: 'فتح قائمة التنقل',
    brandCardLabel: 'العلامة الرسمية للشركة',
    heroEyebrow: 'شركة أوتو سيرفس اب للتجارة العامة ذ.م.م',
    heroTitle: <>قطاعات حيوية.<br /><em>توريد موثوق.</em></>,
    heroText: 'من المشتقات النفطية لوزارة النفط السورية إلى قطع الغيار وزيوت التشحيم بعلامتنا الخاصة وواردات الأغذية للجمعيات التعاونية في الكويت وأنظمة الزراعة المائية في سوريا.',
    explore: 'اكتشف قطاعاتنا',
    downloadProfile: 'تنزيل الملف التعريفي للشركة (PDF)',
    contactWhatsApp: 'تواصل معنا عبر واتساب',
    inquire: 'اختر وسيلة التواصل',
    inquiryKuwait: 'تواصل عبر واتساب الكويت (Kuwait WhatsApp)',
    inquirySyria: 'تواصل عبر واتساب سوريا (Syria WhatsApp)',
    inquiryEmail: 'إرسال بريد إلكتروني (Email)',
    established: 'تأسست عام',
    sectorsEyebrow: 'محفظة مترابطة',
    sectorsTitle: 'خمسة قطاعات. ورؤية إقليمية واحدة.',
    sectorsText: 'شركة تأسست في الكويت وتربط بين التنقل والغذاء والزراعة وإمدادات الطاقة الأساسية.',
    categories: [
      { title: 'زيوت المحركات ومواد التشحيم', sub: 'منتجات السيارات', image: 'auto-service-lubricants.jpg', alt: 'عبوات زيوت محركات أوتو أويل 5000 و10000 و15000' },
      { title: 'زيت الزيتون والأجبان الحرفية', sub: 'منتجات غذائية سورية', image: 'auto-service-food.jpg', alt: 'منتجات شامكو وفرات الشام من زيت الزيتون والزيتون والأجبان' },
      { title: 'قطع غيار السيارات', sub: 'من خلال تطبيق Auto Service', image: 'auto-service-parts.jpg', alt: 'واجهة تطبيق أوتو سيرفس التي تربط العملاء بتجار قطع الغيار' },
      { title: 'الزراعة المائية', sub: 'زراعة محكومة', image: 'auto-service-greenhouse.jpg', alt: 'بيت محمي للزراعة المائية للخس والطماطم والخيار' },
      { title: 'ناقلات النفط', sub: 'إمدادات نفطية', image: 'auto-service-petroleum.jpg', alt: 'ناقلة نفط وبنية تخزين عند الغروب' },
    ],
    sectorCards: [
      { id: 'energy', name: 'النفط والطاقة', description: 'إمدادات نفطية وخدمات لوجستية لوزارة النفط السورية.' },
      { id: 'automotive', name: 'خدمات السيارات والزيوت', description: 'تطبيق أوتو سيرفس وقطع الغيار وعلامتنا الخاصة من زيوت Auto-Oil 5000 و10000 و15000.' },
      { id: 'food', name: 'المنتجات الغذائية الفاخرة', description: 'استيراد منتجات غذائية للجمعيات التعاونية في الكويت، تشمل زيت زيتون وزيتون وأجباناً سورية من شامكو وفرات الشام.' },
      { id: 'hydroponics', name: 'الزراعة المائية', description: 'إنتاج حديث داخل البيوت المحمية للخس والطماطم والخيار في سوريا.' },
    ],
    companyEyebrow: 'شركة تأسست في الكويت',
    companyTitle: <>من تطبيق لخدمة السيارات<br />إلى مورّد إقليمي.</>,
    companyCopy: 'تأسست شركة أوتو سيرفس اب للتجارة العامة ذ.م.م في الكويت عام ٢٠١٩ (رقم السجل التجاري ٤٢١٩٤٠) كشركة ذات مسؤولية محدودة. بدأت بتطبيقها لقطع غيار السيارات، ثم توسعت إلى استيراد المنتجات الغذائية للجمعيات التعاونية في الكويت، وطورت علامتها الخاصة لزيوت التشحيم، وأدخلت أنظمة الزراعة المائية في سوريا لإنتاج الخس والطماطم والخيار. وتورد اليوم مشتقات نفطية حيوية، منها الإمداد لوزارة النفط السورية.',
    companyNote: 'شركة ذات مسؤولية محدودة تأسست في الكويت.',
    establishedLabel: 'تأسست في الكويت',
    years: '٢٠١٩',
    registration: 'رقم السجل التجاري',
    registrationNumber: '٤٢١٩٤٠',
    hubs: 'مراكز إقليمية',
    hubNames: 'الكويت · سوريا',
    contactEyebrow: 'استفسارات الأعمال',
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
    logoAlt: 'الشعار ثلاثي الأبعاد لشركة أوتو سيرفس اب للتجارة العامة',
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trackPaused, setTrackPaused] = useState(false);
  const t = copy[language];
  const navIds = ['company', 'contact'];
  const categoryImage = (index: number, image: string) => {
    if (index === 0) return BRAND_ASSETS.lubricants;
    if (index === 1) return BRAND_ASSETS.food;
    if (index === 2) return BRAND_ASSETS.appInterface;
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
        <img src={BRAND_ASSETS.logo} alt={duplicate ? '' : t.logoAlt} width={1099} height={976} />
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
              <img className="showcase-brand-stamp" src={BRAND_ASSETS.logo} alt="" aria-hidden="true" width={1099} height={976} />
              <span className="card-index">0{index + 1} / 05</span>
            </div>
            <div className="showcase-card-copy"><span>{item.sub}</span><h3>{item.title}</h3></div>
          </article>
        ))}
        {brandCard(true)}
        {t.categories.map((item, index) => (
          <article className={`showcase-card card-${index + 1} showcase-duplicate`} key={`duplicate-${item.title}`} aria-hidden="true">
            <div className="showcase-image">
              <img src={categoryImage(index, item.image)} alt="" />
              <img className="showcase-brand-stamp" src={BRAND_ASSETS.logo} alt="" aria-hidden="true" width={1099} height={976} />
              <span className="card-index">0{index + 1} / 05</span>
            </div>
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
          <a href="#top" className="brand" aria-label={t.footerNote} onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img className="brand-logo" src={BRAND_ASSETS.logo} alt="" width={1099} height={976} />
            <span className="brand-text">
              <strong>{language === 'en' ? 'Auto Service App' : 'شركة أوتو سيرفس اب'}</strong>
              <small>{language === 'en' ? 'for General Trading LLC' : 'للتجارة العامة ذ.م.م'}</small>
            </span>
          </a>
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
              <div><span>{t.registration}</span><strong>{t.registrationNumber}</strong></div>
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
              <span className="office-label">{t.address}</span><p className="office-address" dir={language === 'en' ? 'ltr' : 'rtl'}>{t.kuwaitAddress}</p>
              <a className="office-link" href={whatsapp('96555554199', t.kuwait)} target="_blank" rel="noreferrer"><span>{t.message}</span><span dir="ltr">+965 5555 4199</span><ArrowUpRight size={15} /></a>
            </article>
            <article className="office">
              <span className="office-code">{language === 'en' ? '02 — SYRIA' : '٠٢ — سوريا'}</span><h3>{t.syria}</h3>
              <span className="office-label">{t.address}</span><p className="office-address" dir={language === 'en' ? 'ltr' : 'rtl'}>{t.syriaAddress}</p>
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
