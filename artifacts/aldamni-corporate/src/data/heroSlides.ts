import autoOilImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(1)_1793863143115.jpg';
import oliveOilAndCheeseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_(2)_1793863143115.jpg';
import hydroponicGreenhouseImage from '@assets/Gemini_Generated_Image_oylb7ioylb7ioylb_1793863143117.jpg';

export type HeroSlide = {
  src: string;
  alt: {
    en: string;
    ar: string;
  };
};

// Keep the home-page photography in one place for future dashboard-managed updates.
const publicImage = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export const heroSlides: HeroSlide[] = [
  {
    src: publicImage('auto-service-petroleum.jpg'),
    alt: {
      en: 'Petroleum tankers and regional fuel-supply infrastructure',
      ar: 'ناقلات نفط وبنية إمداد الوقود الإقليمية',
    },
  },
  {
    src: autoOilImage,
    alt: {
      en: 'Auto-Oil engine oils and lubricants for passenger vehicles',
      ar: 'زيوت محركات ومواد تشحيم أوتو أويل للسيارات',
    },
  },
  {
    src: oliveOilAndCheeseImage,
    alt: {
      en: 'Olive oil, olives and Syrian artisanal cheese products',
      ar: 'زيت زيتون وزيتون وأجبان سورية حرفية',
    },
  },
  {
    src: publicImage('auto-service-parts.jpg'),
    alt: {
      en: 'Auto Service App connecting customers with spare-parts suppliers',
      ar: 'تطبيق أوتو سيرفس الذي يربط العملاء بموردي قطع الغيار',
    },
  },
  {
    src: hydroponicGreenhouseImage,
    alt: {
      en: 'Hydroponic greenhouse growing fresh vegetables',
      ar: 'بيت محمي للزراعة المائية ينتج خضروات طازجة',
    },
  },
];
