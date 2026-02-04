import { Product, Category } from './types';

export const CURRENCY = "ر.س";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'ALL', label: 'الكل' },
  { id: 'WATCHES', label: 'ساعات' },
  { id: 'GLASSES', label: 'نظارات' },
  { id: 'CAR_ACCESSORIES', label: 'إكسسوارات سيارات' },
  { id: 'MISC', label: 'متنوعة' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'ساعة رجالية كلاسيكية',
    price: 150,
    category: 'WATCHES',
    description: 'ساعة يد فاخرة بحزام جلدي ومقاومة للماء.',
    image: 'https://picsum.photos/id/175/400/400', 
  },
  {
    id: '2',
    title: 'نظارة شمسية عصرية',
    price: 85,
    category: 'GLASSES',
    description: 'نظارة شمسية بحماية UV400 وتصميم أنيق.',
    image: 'https://picsum.photos/id/64/400/400',
  },
  {
    id: '3',
    title: 'حامل هاتف للسيارة',
    price: 45,
    category: 'CAR_ACCESSORIES',
    description: 'حامل مغناطيسي قوي مناسب لجميع الهواتف.',
    image: 'https://picsum.photos/id/111/400/400',
  },
  {
    id: '4',
    title: 'حقيبة ظهر عملية',
    price: 120,
    category: 'MISC',
    description: 'حقيبة ظهر متعددة الجيوب ومناسبة للسفر.',
    image: 'https://picsum.photos/id/103/400/400',
  },
  {
    id: '5',
    title: 'ساعة ذكية رياضية',
    price: 299,
    category: 'WATCHES',
    description: 'تتبع النشاط الرياضي، نبضات القلب، وإشعارات الهاتف.',
    image: 'https://picsum.photos/id/119/400/400', 
  },
  {
    id: '6',
    title: 'منظم مقاعد السيارة',
    price: 60,
    category: 'CAR_ACCESSORIES',
    description: 'يحافظ على ترتيب سيارتك، يحتوي على جيوب متعددة.',
    image: 'https://picsum.photos/id/201/400/400', 
  },
  {
    id: '7',
    title: 'نظارة قراءة بإطار خفيف',
    price: 50,
    category: 'GLASSES',
    description: 'مريحة للعين ومناسبة للقراءة لفترات طويلة.',
    image: 'https://picsum.photos/id/338/400/400',
  },
  {
    id: '8',
    title: 'سماعات بلوتوث',
    price: 90,
    category: 'MISC',
    description: 'صوت نقي وبطارية تدوم طويلاً.',
    image: 'https://picsum.photos/id/445/400/400',
  }
];