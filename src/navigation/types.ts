import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  ChooseLocation: undefined;
  Language: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Bag: undefined;
  Payment: undefined;
  Promo: undefined;
  Gifts: undefined;
  Shops: undefined;
  Wallet: undefined;
  OrderDetail: { orderId: string };
  AllProducts: { categoryId?: string } | undefined;
  Map: undefined;
  ProductDetail: { productId: string };
  BannerDetail: { bannerId: string };
  TrackOrder: { orderId: string };
  DispatchOrders: undefined;
  VendorWelcome: undefined;
  VendorLogin: undefined;
  VendorRegister: undefined;
  Reward: undefined;
};

export type CustomerTabParamList = {
  Home: undefined;
  Wishlist: undefined;
  Search: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type RootNav = NativeStackNavigationProp<RootStackParamList>;

export type TabNav = CompositeNavigationProp<
  BottomTabNavigationProp<CustomerTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;
