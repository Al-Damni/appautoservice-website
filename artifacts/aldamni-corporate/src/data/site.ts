export type Locale = 'ar' | 'en';
export type Direction = 'a' | 'b' | 'c';

export const site = {
  company: {
    en: 'Auto Service App for general trading',
    ar: 'شركة اوتو سيرفس اب للتجارة العامة',
  },
  founded: '2019',
  overview: {
    en: 'A Kuwait-based general trading company operating in Kuwait and Syria across petroleum supply, auto spare parts, own-brand lubricants, fine food imports and hydroponic agriculture.',
    ar: 'شركة تجارة عامة مقرها الكويت، تعمل في الكويت وسوريا في توريد المنتجات النفطية وقطع غيار السيارات والزيوت ذات العلامة الخاصة واستيراد الأغذية والزراعة المائية.',
  },
  activities: [
    {
      id: 'petroleum',
      image: '/images/petroleum-supply.webp',
      title: { en: 'Petroleum supply', ar: 'توريد المشتقات النفطية' },
      description: { en: 'Petroleum products supply and logistics.', ar: 'توريد المشتقات النفطية والخدمات اللوجستية.' },
      products: { en: 'Diesel · Gasoline · Fuel oil · LPG · [TO CONFIRM] catalog completeness', ar: 'الديزل · البنزين · زيت الوقود · الغاز البترولي المسال · [TO CONFIRM] اكتمال القائمة' },
      sector: { en: 'Petroleum supply', ar: 'توريد المشتقات النفطية' },
    },
    {
      id: 'spares',
      image: '/images/spare-parts-app.webp',
      title: { en: 'Auto spare parts', ar: 'قطع غيار السيارات' },
      description: { en: 'A sourcing platform for automotive spare parts in Kuwait.', ar: 'منصة لتوريد قطع غيار السيارات في الكويت.' },
      products: { en: 'Engine parts · Filters · Brakes · Batteries · [TO CONFIRM] category list and platform wording', ar: 'قطع المحرك · الفلاتر · المكابح · البطاريات · [TO CONFIRM] قائمة الفئات ووصف المنصة' },
      sector: { en: 'Auto spare parts', ar: 'قطع غيار السيارات' },
    },
    {
      id: 'oil',
      image: '/images/auto-oil-lubricants.webp',
      title: { en: 'Auto-Oil lubricants', ar: 'زيوت Auto-Oil' },
      description: { en: 'Engine oils and lubricants under the company’s Auto-Oil brand.', ar: 'زيوت المحركات ومواد التشحيم بعلامة الشركة Auto-Oil.' },
      products: { en: 'Auto-Oil 5000 · Auto-Oil 10000 · Auto-Oil 15000. Example: 5W-30, 1L / 4L. [TO CONFIRM] full grades and sizes.', ar: 'Auto-Oil 5000 · Auto-Oil 10000 · Auto-Oil 15000. مثال: 5W-30، 1 لتر / 4 لتر. [TO CONFIRM] الدرجات والأحجام الكاملة.' },
      sector: { en: 'Auto-Oil lubricants', ar: 'زيوت Auto-Oil' },
    },
    {
      id: 'foods',
      image: '/images/wafrat-foods.webp',
      title: { en: 'Fine food imports', ar: 'استيراد الأغذية الفاخرة' },
      description: { en: 'Syrian products imported to Kuwait’s cooperative societies under Shamco / Wafrat El-Sham.', ar: 'منتجات سورية مستوردة إلى الجمعيات التعاونية في الكويت تحت Shamco / Wafrat El-Sham.' },
      products: { en: 'Extra virgin olive oil (0.5L, 1L) · Spanish-style green olives · Black olives · Akkawi · Feta. [TO CONFIRM] brand relationship and list completeness.', ar: 'زيت زيتون بكر ممتاز (0.5 لتر، 1 لتر) · زيتون أخضر على الطريقة الإسبانية · زيتون أسود · عكاوي · فيتا. [TO CONFIRM] علاقة العلامتين واكتمال القائمة.' },
      sector: { en: 'Fine food imports', ar: 'استيراد الأغذية الفاخرة' },
    },
    {
      id: 'hydroponics',
      image: '/images/hydroponic-greenhouse.webp',
      title: { en: 'Hydroponic agriculture', ar: 'الزراعة المائية' },
      description: { en: 'Modern greenhouse farming in Syria.', ar: 'زراعة حديثة في البيوت المحمية في سوريا.' },
      products: { en: 'Lettuce · Tomatoes · Cucumbers · [TO CONFIRM] full crop list', ar: 'خس · طماطم · خيار · [TO CONFIRM] قائمة المحاصيل الكاملة' },
      sector: { en: 'Hydroponic agriculture', ar: 'الزراعة المائية' },
    },
  ],
  offices: [
    { key: 'kuwait', name: { en: 'Kuwait', ar: 'الكويت' }, address: { en: 'Al-Ahmadi – Al-Aqaila – Taiba Mall Building, 7th Floor [TO CONFIRM]', ar: 'الأحمدي - العقيلة - مبنى طيبة مول الدور السابع' }, phone: '+96555554199', href: 'https://wa.me/96555554199' },
    { key: 'syria', name: { en: 'Syria', ar: 'سوريا' }, address: { en: 'Rif Dimashq – Qura Al-Sham – Building 43', ar: 'ريف دمشق - قرى الشام - بناء 43' }, phone: '+963959811087', href: 'https://wa.me/963959811087' },
  ],
  email: 'anas@appautoservice.com',
};

export const directionCopy = {
  a: { en: 'Trade, clearly accounted for.', ar: 'تجارة واضحة التفاصيل.' },
  b: { en: 'Find your supply area.', ar: 'اعثر على مجال التوريد.' },
  c: { en: 'A closer look at the portfolio.', ar: 'نظرة أقرب إلى المنتجات.' },
};
