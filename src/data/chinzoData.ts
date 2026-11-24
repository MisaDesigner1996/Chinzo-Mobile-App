export interface ChinzoCategory {
  id: string;
  name: string;
  group: 'Featured' | "Kids' Fashion" | 'Grocery' | 'Books & Media' | 'Wellness';
  image: string;
}

export interface ChinzoProduct {
  id: string;
  section: 'mega' | 'laptops' | 'brands';
  category: string;
  tag?: string;
  kicker?: string;
  title: string;
  priceBD: string;
  priceNum: number;
  originalPrice?: string;
  discountPercent?: number;
  rating: string;
  reviews: string;
  rankNote?: string;
  deliveryType: 'express' | 'instant' | 'free';
  deliveryLabel: string;
  image: string;
}

export interface ChinzoCoupon {
  id: string;
  code: string;
  headline: string;
  subline: string;
  image: string;
}

export interface ChinzoQuickTile {
  id: string;
  label: string;
  sublabel: string;
  image: string;
  targetSection: string;
}

export const CHINZO_LOCATIONS = [
  { id: 'manama', label: 'Other · Manama', detail: 'Manama Center, Bahrain', eta: 'Get in 1 hr 8 mins' },
  { id: 'seef', label: 'Seef District · Manama', detail: 'Seef Mall Area, Bahrain', eta: 'Get in 45 mins' },
  { id: 'juffair', label: 'Juffair · Manama', detail: 'Al Fateh Highway, Bahrain', eta: 'Get in 55 mins' },
  { id: 'riffa', label: 'West Riffa · Bahrain', detail: 'Bukowarah, Bahrain', eta: 'Express Tomorrow' },
  { id: 'muharraq', label: 'Amwaj · Muharraq', detail: 'Amwaj Islands, Bahrain', eta: 'Express Tomorrow' },
];

export const CHINZO_NAV_DEPARTMENTS = [
  'Electronics',
  'Beauty & Fragrance',
  'Home & Kitchen',
  'Grocery',
  "Men's Fashion",
  "Women's Fashion",
  'Mom & Baby',
  'Toys',
  "Kids' Fashion",
  'Sports & Outdoors',
  'Health & Nutrition',
  'Stationery',
  'Books',
  'Automotive',
];

export const QUICK_REASONS: ChinzoQuickTile[] = [
  {
    id: 'deals',
    label: 'Deals',
    sublabel: 'Daily drops',
    image: '/assets/chinzo/deal_bag.png',
    targetSection: 'mega-deals',
  },
  {
    id: 'market',
    label: 'CHINZO Market',
    sublabel: 'Authentic goods',
    image: '/assets/chinzo/reason_market.jpg',
    targetSection: 'categories-section',
  },
  {
    id: 'bestsellers',
    label: 'Bestsellers',
    sublabel: 'Top picks',
    image: '/assets/chinzo/reason_bestsellers.jpg',
    targetSection: 'laptop-deals',
  },
  {
    id: 'local',
    label: 'Local Picks',
    sublabel: 'Bahrain shops',
    image: '/assets/chinzo/reason_local.jpg',
    targetSection: 'top-brands',
  },
];

export const CHINZO_CATEGORIES: ChinzoCategory[] = [
  // Featured cross-website highlights
  { id: 'cat-deals', name: 'Daily Deals', group: 'Featured', image: '/assets/chinzo/deal_cream.png' },
  { id: 'cat-laptops', name: 'Laptops & Tech', group: 'Featured', image: '/assets/chinzo/laptop_mac_m5.jpg' },
  { id: 'cat-beverages', name: 'Beverages', group: 'Featured', image: '/assets/chinzo/cat_groc_beverages.jpg' },
  { id: 'cat-snacks', name: 'Snacks & Sweets', group: 'Featured', image: '/assets/chinzo/cat_groc_snacks.jpg' },
  { id: 'cat-kids-tees', name: "Kids' T-Shirts", group: 'Featured', image: '/assets/chinzo/cat_kids_tshirts.jpg' },
  { id: 'cat-backpacks', name: 'Backpacks', group: 'Featured', image: '/assets/chinzo/cat_kids_backpacks.jpg' },
  { id: 'cat-books', name: 'Self-help Books', group: 'Featured', image: '/assets/chinzo/cat_book_selfhelp.jpg' },
  { id: 'cat-wellness', name: 'Vitamins', group: 'Featured', image: '/assets/chinzo/wellness_centrum.jpg' },

  // Kids' Fashion (exact from website)
  { id: 'kids-tshirts', name: 'T-Shirts & Polos', group: "Kids' Fashion", image: '/assets/chinzo/cat_kids_tshirts.jpg' },
  { id: 'kids-pants', name: 'Pants', group: "Kids' Fashion", image: '/assets/chinzo/cat_kids_pants.jpg' },
  { id: 'kids-sets', name: 'Clothing Sets', group: "Kids' Fashion", image: '/assets/chinzo/cat_kids_sets.jpg' },
  { id: 'kids-dresses', name: 'Dresses', group: "Kids' Fashion", image: '/assets/chinzo/cat_kids_dresses.jpg' },
  { id: 'kids-sportswear', name: 'Sportswear', group: "Kids' Fashion", image: '/assets/chinzo/cat_kids_sportswear.jpg' },
  { id: 'kids-footwear', name: 'Footwear', group: "Kids' Fashion", image: '/assets/chinzo/cat_kids_footwear.jpg' },
  { id: 'kids-backpacks', name: 'Backpacks', group: "Kids' Fashion", image: '/assets/chinzo/cat_kids_backpacks.jpg' },

  // Grocery (exact from website)
  { id: 'groc-beverages', name: 'Beverages', group: 'Grocery', image: '/assets/chinzo/cat_groc_beverages.jpg' },
  { id: 'groc-laundry', name: 'Laundry & Dish', group: 'Grocery', image: '/assets/chinzo/cat_groc_laundry.jpg' },
  { id: 'groc-pets', name: 'Pet Supplies', group: 'Grocery', image: '/assets/chinzo/cat_groc_pets.jpg' },
  { id: 'groc-oils', name: 'Cooking Oils', group: 'Grocery', image: '/assets/chinzo/cat_groc_oils.jpg' },
  { id: 'groc-rice', name: 'Rice & Pasta', group: 'Grocery', image: '/assets/chinzo/cat_groc_rice.jpg' },
  { id: 'groc-cleaning', name: 'Cleaning', group: 'Grocery', image: '/assets/chinzo/cat_groc_cleaning.jpg' },
  { id: 'groc-snacks', name: 'Snacks & Sweets', group: 'Grocery', image: '/assets/chinzo/cat_groc_snacks.jpg' },

  // Books & Media (exact from website)
  { id: 'book-selfhelp', name: 'Self-help books', group: 'Books & Media', image: '/assets/chinzo/cat_book_selfhelp.jpg' },
  { id: 'book-children', name: "Children's books", group: 'Books & Media', image: '/assets/chinzo/cat_book_children.jpg' },
  { id: 'book-fiction', name: 'Fiction', group: 'Books & Media', image: '/assets/chinzo/cat_book_fiction.jpg' },
  { id: 'book-ereaders', name: 'E-readers', group: 'Books & Media', image: '/assets/chinzo/cat_book_ereaders.jpg' },
  { id: 'book-guitars', name: 'Guitars', group: 'Books & Media', image: '/assets/chinzo/cat_book_guitars.jpg' },

  // Big Wellness Savings (exact from website)
  { id: 'well-protein', name: 'Sports Nutrition', group: 'Wellness', image: '/assets/chinzo/wellness_protein.jpg' },
  { id: 'well-vitamins', name: 'Vitamins', group: 'Wellness', image: '/assets/chinzo/wellness_centrum.jpg' },
  { id: 'well-monitors', name: 'Health Monitors', group: 'Wellness', image: '/assets/chinzo/wellness_braun.jpg' },
  { id: 'well-massage', name: 'Recovery Tools', group: 'Wellness', image: '/assets/chinzo/wellness_renpho.jpg' },
];

export const MEGA_DEALS: ChinzoProduct[] = [
  {
    id: 'mega-xiaomi-17',
    section: 'mega',
    category: 'Mobile deals',
    kicker: 'Mobile deals',
    title: 'Xiaomi REDMI Note 17 Pro Max Dual SIM 5G Black 8GB RAM 256GB',
    priceBD: '10.200 BD',
    priceNum: 10.2,
    originalPrice: '17.990 BD',
    discountPercent: 43,
    rating: '4.8',
    reviews: '412',
    deliveryType: 'instant',
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: '/assets/chinzo/mega_xiaomi.jpg',
  },
  {
    id: 'mega-ratsaw-knee',
    section: 'mega',
    category: 'Massage & Relaxation',
    kicker: 'Massage deals',
    title: 'RATSAW Heated Knee Massager Cordless Knee Massage Machine',
    priceBD: '8.100 BD',
    priceNum: 8.1,
    originalPrice: '15.900 BD',
    discountPercent: 49,
    rating: '4.6',
    reviews: '188',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/mega_ratsaw.jpg',
  },
  {
    id: 'mega-acer-al15',
    section: 'mega',
    category: 'Laptops deals',
    kicker: 'Laptops deals',
    title: 'Acer Aspire Lite AL15 Laptop with 13th Gen Intel Core i7-1355U',
    priceBD: '3.500 BD',
    priceNum: 3.5,
    originalPrice: '34.990 BD',
    discountPercent: 90,
    rating: '4.7',
    reviews: '305',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/mega_acer.jpg',
  },
  {
    id: 'mega-nestle-water',
    section: 'mega',
    category: 'Home Care & Cleaning',
    kicker: 'Home Care deals',
    title: 'Nestle Pure Life, Low Sodium, Bottled Drinking Water 1.5L Pack of 6',
    priceBD: '5.100 BD',
    priceNum: 5.1,
    originalPrice: '16.000 BD',
    discountPercent: 68,
    rating: '4.9',
    reviews: '1.2K',
    deliveryType: 'instant',
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: '/assets/chinzo/mega_nestle.jpg',
  },
];

export const LAPTOP_DEALS: ChinzoProduct[] = [
  {
    id: 'lap-mac-neo-pink',
    section: 'laptops',
    category: 'Electronics',
    tag: 'Best Seller',
    title: 'Apple MacBook Neo | 13-Inch Display | A18 Pro, 6-core CPU, 256GB',
    priceBD: '2.820 BD',
    priceNum: 2.82,
    originalPrice: '3.499 BD',
    discountPercent: 19,
    rating: '4.7',
    reviews: '1.1K',
    rankNote: '#9 in Macbooks',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/laptop_mac_pink.jpg',
  },
  {
    id: 'lap-mac-air-m5',
    section: 'laptops',
    category: 'Electronics',
    tag: 'Best Seller',
    title: 'Apple New 2026 MacBook Air MDHA4 13 Inch | M5 Air 16GB RAM',
    priceBD: '4.899 BD',
    priceNum: 4.899,
    originalPrice: '6.199 BD',
    discountPercent: 20,
    rating: '4.6',
    reviews: '627',
    rankNote: '#5 in Macbooks',
    deliveryType: 'instant',
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: '/assets/chinzo/laptop_mac_m5.jpg',
  },
  {
    id: 'lap-mac-neo-blue',
    section: 'laptops',
    category: 'Electronics',
    tag: 'Best Seller',
    title: 'Apple MacBook Neo | 13-Inch Display | A18 Pro Midnight 256GB',
    priceBD: '2.694 BD',
    priceNum: 2.694,
    originalPrice: '3.499 BD',
    discountPercent: 23,
    rating: '4.7',
    reviews: '1.1K',
    rankNote: '#2 in Macbooks',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/laptop_mac_blue.jpg',
  },
  {
    id: 'lap-hp-g6',
    section: 'laptops',
    category: 'Electronics',
    tag: 'Refurbished',
    title: 'HP Refurbished Elitebook 840 G6 14-Inch Full HD, Core i5-8265U',
    priceBD: '8.200 BD',
    priceNum: 8.2,
    rating: '3.9',
    reviews: '16',
    rankNote: '#12 in Laptops',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/laptop_hp_g6.jpg',
  },
  {
    id: 'lap-lenovo-t490',
    section: 'laptops',
    category: 'Electronics',
    tag: 'Refurbished',
    title: 'Lenovo Refurbished Thinkpad T490 14-Inch Full HD, Intel Core i5',
    priceBD: '6.990 BD',
    priceNum: 6.99,
    originalPrice: '8.000 BD',
    discountPercent: 12,
    rating: '3.4',
    reviews: '8',
    rankNote: 'Free Delivery',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/laptop_lenovo_t490.jpg',
  },
  {
    id: 'lap-hp-g8',
    section: 'laptops',
    category: 'Electronics',
    tag: 'Refurbished',
    title: 'HP Refurbished EliteBook 840 G8 14-Inch Full HD, Core i5-1145G7',
    priceBD: '52.290 BD',
    priceNum: 52.29,
    rating: '3.5',
    reviews: '4',
    rankNote: '#2 in Netbooks',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/laptop_hp_g8.jpg',
  },
];

export const TOP_BRAND_DEALS: ChinzoProduct[] = [
  {
    id: 'brand-anker-25k',
    section: 'brands',
    category: 'Electronics',
    tag: 'Best Seller',
    title: 'Anker 25,000 mAh 165W Ultra-Fast Portable Charger for Laptops',
    priceBD: '28.500 BD',
    priceNum: 28.5,
    originalPrice: '48.900 BD',
    discountPercent: 40,
    rating: '4.6',
    reviews: '2.7K',
    rankNote: '#1 in Power Banks',
    deliveryType: 'instant',
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: '/assets/chinzo/brand_anker_25k.jpg',
  },
  {
    id: 'brand-crony-22l',
    section: 'brands',
    category: 'Automotive',
    title: 'CRONY Car Refrigerator 22L/C22 Portable Car Freezer & Cooler',
    priceBD: '8.500 BD',
    priceNum: 8.5,
    originalPrice: '14.400 BD',
    discountPercent: 41,
    rating: '4.3',
    reviews: '21',
    rankNote: '#5 in Car Coolers',
    deliveryType: 'express',
    deliveryLabel: 'Express Tomorrow',
    image: '/assets/chinzo/brand_crony_fridge.jpg',
  },
  {
    id: 'brand-geepas-6pc',
    section: 'brands',
    category: 'Home & Kitchen',
    tag: 'Best Seller',
    title: 'GEEPAS Screwdriver Set - 6Pcs, General Purpose Rubber Insulated',
    priceBD: '28.500 BD',
    priceNum: 28.5,
    rating: '4.5',
    reviews: '21',
    rankNote: '#2 in Screwdrivers',
    deliveryType: 'instant',
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: '/assets/chinzo/brand_geepas_tools.jpg',
  },
  {
    id: 'brand-anker-zolo',
    section: 'brands',
    category: 'Electronics',
    title: 'Anker 20,000 mAh Zolo Power Bank 30W High-Speed Portable Charger',
    priceBD: '13.100 BD',
    priceNum: 13.1,
    originalPrice: '22.900 BD',
    discountPercent: 39,
    rating: '4.6',
    reviews: '1.8K',
    rankNote: 'Lowest price in 30d',
    deliveryType: 'instant',
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: '/assets/chinzo/brand_anker_zolo.jpg',
  },
];

export const CHINZO_COUPONS: ChinzoCoupon[] = [
  {
    id: 'coup-app',
    code: 'APPLIANCE10',
    headline: 'Extra 10% Off',
    subline: 'On selected large appliances',
    image: '/assets/chinzo/coupon_appliance.jpg',
  },
  {
    id: 'coup-cam',
    code: 'CAMERAS20',
    headline: 'Extra 20% Off',
    subline: 'On selected cameras & gear',
    image: '/assets/chinzo/coupon_cameras.jpg',
  },
  {
    id: 'coup-groc',
    code: 'SAVE10',
    headline: 'Extra 10% OFF',
    subline: 'On Grocery & CHINZO Market',
    image: '/assets/chinzo/coupon_grocery.jpg',
  },
];
