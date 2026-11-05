export type HeroSlide = {
  src: string;
  width: number;
  height: number;
  fit?: 'contain' | 'cover';
  focus?: string;
  alt: {
    en: string;
    ar: string;
  };
};

// Keep the home-page photography in one place for future dashboard-managed updates.
const publicImage = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export const heroSlides: HeroSlide[] = [
  {
    src: publicImage('images/hero/petroleum-supply.webp'),
    width: 1024,
    height: 1024,
    alt: {
      en: 'Petroleum tankers and regional fuel-supply infrastructure',
      ar: 'ناقلات نفط وبنية إمداد الوقود الإقليمية',
    },
  },
  {
    src: publicImage('images/hero/auto-oil-lubricants.webp'),
    width: 1408,
    height: 768,
    alt: {
      en: 'Auto-Oil engine oils and lubricants for passenger vehicles',
      ar: 'زيوت محركات ومواد تشحيم أوتو أويل للسيارات',
    },
  },
  {
    src: publicImage('images/hero/wafrat-foods.webp'),
    width: 1246,
    height: 848,
    focus: '50% 35%',
    alt: {
      en: 'Olive oil, olives and Syrian artisanal cheese products',
      ar: 'زيت زيتون وزيتون وأجبان سورية حرفية',
    },
  },
  {
    src: publicImage('images/hero/spare-parts-app.webp'),
    width: 1024,
    height: 1024,
    alt: {
      en: 'Auto Service App connecting customers with spare-parts suppliers',
      ar: 'تطبيق أوتو سيرفس الذي يربط العملاء بموردي قطع الغيار',
    },
  },
  {
    src: publicImage('images/hero/hydroponic-greenhouse.webp'),
    width: 1408,
    height: 768,
    alt: {
      en: 'Hydroponic greenhouse growing fresh vegetables',
      ar: 'بيت محمي للزراعة المائية ينتج خضروات طازجة',
    },
  },
];
