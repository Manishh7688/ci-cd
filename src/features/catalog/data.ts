import { ImageSourcePropType } from 'react-native';

export type Variant = {
  id: string;
  name: string;
  mrp: number;
  price: number;
  minQty: number;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  image: ImageSourcePropType;
  description: string;
  variants: Variant[];
  featured?: boolean;
  trending?: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

export type Banner = {
  id: string;
  title: string;
  image: ImageSourcePropType;
};

export type Coupon = {
  code: string;
  percent: number;
  minCart: number;
  saveUpto: number;
};

export type Gift = {
  id: string;
  name: string;
  price: number;
};

export type Shop = {
  id: string;
  name: string;
  person: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landline: string;
  mobile: string;
};

export type Address = {
  id: string;
  label: string;
  name: string;
  line: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
};

export type OrderStatus = 'Placed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  placedOn: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  payment: 'Online' | 'COD';
  address: string;
  deliveryBoy?: string;
  deliveryPhone?: string;
};

export type WalletTxn = {
  id: string;
  title: 'purchase' | 'cashback';
  amount: number;
  date: string;
};

const soap = require('../../assets/images/product-1.png');
const powder = require('../../assets/images/product-2.png');
const pack = require('../../assets/images/product-3.jpg');

export const categories: Category[] = [
  {
    id: 'soap',
    name: 'Soap & Cleaner',
    image: require('../../assets/images/fresh.png'),
  },
  {
    id: 'masala',
    name: 'Masale',
    image: require('../../assets/images/hotdeals.png'),
  },
  {
    id: 'tea',
    name: 'Oswal Tea',
    image: require('../../assets/images/freegift.png'),
  },
  {
    id: 'oil',
    name: 'Cooking Oil',
    image: require('../../assets/images/product-3.jpg'),
  },
  {
    id: 'home',
    name: 'Home Care',
    image: require('../../assets/images/shops.png'),
  },
];

function product(
  id: string,
  name: string,
  categoryId: string,
  image: ImageSourcePropType,
  description: string,
  variants: Variant[],
  flags: { featured?: boolean; trending?: boolean } = {},
): Product {
  return { id, name, categoryId, image, description, variants, ...flags };
}

export const products: Product[] = [
  product(
    'soap-neem',
    'Neem Herbal Soap',
    'soap',
    soap,
    'A daily bath soap made with neem. The bar is shaped for a firm grip and a clean rinse.',
    [
      { id: '75g', name: '75 g', mrp: 40, price: 32, minQty: 1 },
      { id: '3x75', name: '3 x 75 g', mrp: 120, price: 90, minQty: 1 },
    ],
    { featured: true },
  ),
  product(
    'soap-rose',
    'Rose Bath Soap',
    'soap',
    soap,
    'A rose-scented bath soap for everyday use.',
    [
      { id: '100g', name: '100 g', mrp: 55, price: 45, minQty: 1 },
      { id: '4x100', name: '4 x 100 g', mrp: 220, price: 168, minQty: 1 },
    ],
    { trending: true },
  ),
  product(
    'detergent-lime',
    'Lime Detergent Powder',
    'soap',
    powder,
    'Detergent powder for clothes, with a lime wash.',
    [
      { id: '500g', name: '500 g', mrp: 90, price: 72, minQty: 1 },
      { id: '1kg', name: '1 kg', mrp: 170, price: 139, minQty: 1 },
    ],
    { featured: true },
  ),
  product(
    'clean-floor',
    'Floor Cleaner',
    'home',
    powder,
    'Liquid floor cleaner for tile and stone floors.',
    [
      { id: '500ml', name: '500 ml', mrp: 110, price: 89, minQty: 1 },
      { id: '1l', name: '1 L', mrp: 199, price: 159, minQty: 1 },
    ],
    { trending: true },
  ),
  product(
    'broom-soft',
    'Soft Broom',
    'home',
    pack,
    'A lightweight broom for daily sweeping.',
    [{ id: '1pc', name: '1 pc', mrp: 149, price: 119, minQty: 1 }],
  ),
  product(
    'masala-garam',
    'Garam Masala',
    'masala',
    pack,
    'A blended garam masala for everyday cooking.',
    [
      { id: '100g', name: '100 g', mrp: 80, price: 64, minQty: 1 },
      { id: '200g', name: '200 g', mrp: 150, price: 120, minQty: 1 },
    ],
    { trending: true },
  ),
  product(
    'masala-turmeric',
    'Turmeric Powder',
    'masala',
    pack,
    'Fine turmeric powder packed for the kitchen.',
    [
      { id: '200g', name: '200 g', mrp: 70, price: 58, minQty: 1 },
      { id: '500g', name: '500 g', mrp: 160, price: 132, minQty: 1 },
    ],
  ),
  product(
    'tea-masala',
    'Masala Tea',
    'tea',
    soap,
    'Leaf tea blended with masala for a strong cup.',
    [
      { id: '250g', name: '250 g', mrp: 145, price: 119, minQty: 1 },
      { id: '500g', name: '500 g', mrp: 280, price: 229, minQty: 1 },
    ],
    { featured: true },
  ),
  product(
    'tea-leaf',
    'Leaf Tea',
    'tea',
    soap,
    'Long-leaf tea for a plain brew.',
    [{ id: '250g', name: '250 g', mrp: 130, price: 109, minQty: 1 }],
    { trending: true },
  ),
  product(
    'oil-mustard',
    'Mustard Oil',
    'oil',
    pack,
    'Filtered mustard oil for cooking.',
    [
      { id: '1l', name: '1 L', mrp: 210, price: 189, minQty: 1 },
      { id: '5l', name: '5 L', mrp: 980, price: 899, minQty: 1 },
    ],
    { featured: true },
  ),
];

export const banners: Banner[] = [
  {
    id: 'soap',
    title: 'SOAP & CLEANER',
    image: require('../../assets/images/intro-soap.jpg'),
  },
  {
    id: 'masala',
    title: 'MASALE',
    image: require('../../assets/images/intro-masale.jpg'),
  },
  {
    id: 'tea',
    title: 'OSWAL TEA',
    image: require('../../assets/images/intro-tea.jpg'),
  },
];

export const coupons: Coupon[] = [
  { code: 'WELCOME10', percent: 10, minCart: 199, saveUpto: 80 },
  { code: 'SOAP20', percent: 20, minCart: 499, saveUpto: 150 },
];

export const gifts: Gift[] = [
  { id: 'gift-soap', name: 'Surprise soap bar', price: 49 },
  { id: 'gift-tea', name: 'Tea sample pack', price: 79 },
];

export const shops: Shop[] = [
  {
    id: 'OS-101',
    name: 'Oswal Mart Jaipur',
    person: 'Rakesh Sharma',
    address: '12 MI Road',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    landline: '0141-4001101',
    mobile: '9876500101',
  },
  {
    id: 'OS-214',
    name: 'Oswal Mart Ahmedabad',
    person: 'Meera Patel',
    address: '44 CG Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380006',
    landline: '079-4002214',
    mobile: '9876500214',
  },
  {
    id: 'OS-330',
    name: 'Oswal Mart Pune',
    person: 'Amit Kulkarni',
    address: '8 FC Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411004',
    landline: '020-4003330',
    mobile: '9876500330',
  },
];

export const locations: { state: string; cities: string[] }[] = [
  { state: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'] },
  { state: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
  { state: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
  { state: 'Delhi', cities: ['New Delhi'] },
  { state: 'Madhya Pradesh', cities: ['Indore', 'Bhopal', 'Ujjain'] },
];

export const seedAddresses: Address[] = [
  {
    id: 'home',
    label: 'Home',
    name: 'Asha Jain',
    line: '14 Shastri Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302016',
    phone: '9876543210',
    email: 'asha@example.com',
  },
];

export const seedOrders: Order[] = [
  {
    id: 'SG10421',
    placedOn: '02 Oct 2026',
    status: 'Dispatched',
    items: [
      { name: 'Neem Herbal Soap', quantity: 2, price: 32 },
      { name: 'Masala Tea', quantity: 1, price: 119 },
    ],
    total: 183,
    payment: 'COD',
    address: '14 Shastri Nagar, Jaipur, Rajasthan 302016',
    deliveryBoy: 'Imran Khan',
    deliveryPhone: '9876500441',
  },
  {
    id: 'SG10302',
    placedOn: '18 Sep 2026',
    status: 'Delivered',
    items: [{ name: 'Mustard Oil', quantity: 1, price: 189 }],
    total: 189,
    payment: 'Online',
    address: '14 Shastri Nagar, Jaipur, Rajasthan 302016',
  },
];

export const seedTransactions: WalletTxn[] = [
  { id: 'w1', title: 'cashback', amount: 20, date: '18 Sep 2026' },
  { id: 'w2', title: 'purchase', amount: 49, date: '02 Aug 2026' },
];

export function findProduct(productId: string): Product | undefined {
  return products.find(item => item.id === productId);
}

export function findVariant(item: Product, variantId: string): Variant {
  return item.variants.find(variant => variant.id === variantId) ?? item.variants[0];
}
