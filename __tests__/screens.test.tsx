import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerTabs } from '../src/navigation/CustomerTabs';
import { LanguageScreen } from '../src/features/onboarding/screens/LanguageScreen';
import { ChooseLocationScreen } from '../src/features/onboarding/screens/ChooseLocationScreen';
import { IntroScreen } from '../src/features/onboarding/screens/IntroScreen';
import { SplashScreen } from '../src/features/onboarding/screens/SplashScreen';
import { LoginScreen } from '../src/features/auth/screens/LoginScreen';
import { RegisterScreen } from '../src/features/auth/screens/RegisterScreen';
import { WalletScreen } from '../src/features/account/screens/WalletScreen';
import { BagScreen } from '../src/features/cart/screens/BagScreen';
import { GiftsScreen } from '../src/features/cart/screens/GiftsScreen';
import { MapScreen } from '../src/features/cart/screens/MapScreen';
import { PaymentScreen } from '../src/features/cart/screens/PaymentScreen';
import { PromoScreen } from '../src/features/cart/screens/PromoScreen';
import { DispatchOrdersScreen } from '../src/features/orders/screens/DispatchOrdersScreen';
import { OrderDetailScreen } from '../src/features/orders/screens/OrderDetailScreen';
import { OrdersScreen } from '../src/features/orders/screens/OrdersScreen';
import { TrackOrderScreen } from '../src/features/orders/screens/TrackOrderScreen';
import { AllProductsScreen } from '../src/features/shop/screens/AllProductsScreen';
import { BannerDetailScreen } from '../src/features/shop/screens/BannerDetailScreen';
import { HomeScreen } from '../src/features/shop/screens/HomeScreen';
import { ProductDetailScreen } from '../src/features/shop/screens/ProductDetailScreen';
import { SearchScreen } from '../src/features/shop/screens/SearchScreen';
import { ShopsScreen } from '../src/features/shop/screens/ShopsScreen';
import { ProfileScreen } from '../src/features/account/screens/ProfileScreen';
import { WishlistScreen } from '../src/features/account/screens/WishlistScreen';
import {
  RewardScreen,
  VendorLoginScreen,
  VendorRegisterScreen,
  VendorWelcomeScreen,
} from '../src/features/vendor/screens/VendorScreens';
import { ShopProvider } from '../src/state/ShopContext';

type ScreenCase = {
  name: string;
  Screen: React.ComponentType<object>;
  params?: object;
};

const screens: ScreenCase[] = [
  { name: 'Splash', Screen: SplashScreen },
  { name: 'Intro', Screen: IntroScreen },
  { name: 'ChooseLocation', Screen: ChooseLocationScreen },
  { name: 'Language', Screen: LanguageScreen },
  { name: 'Login', Screen: LoginScreen },
  { name: 'Register', Screen: RegisterScreen },
  { name: 'Home', Screen: HomeScreen },
  { name: 'Wishlist', Screen: WishlistScreen },
  { name: 'Search', Screen: SearchScreen },
  { name: 'Orders', Screen: OrdersScreen },
  { name: 'Profile', Screen: ProfileScreen },
  { name: 'Tabs', Screen: CustomerTabs },
  { name: 'Bag', Screen: BagScreen },
  { name: 'Payment', Screen: PaymentScreen },
  { name: 'Promo', Screen: PromoScreen },
  { name: 'Gifts', Screen: GiftsScreen },
  { name: 'Shops', Screen: ShopsScreen },
  { name: 'Wallet', Screen: WalletScreen },
  { name: 'OrderDetail', Screen: OrderDetailScreen, params: { orderId: 'SG10421' } },
  { name: 'AllProducts', Screen: AllProductsScreen },
  { name: 'Map', Screen: MapScreen },
  { name: 'ProductDetail', Screen: ProductDetailScreen, params: { productId: 'soap-neem' } },
  { name: 'BannerDetail', Screen: BannerDetailScreen, params: { bannerId: 'soap' } },
  { name: 'TrackOrder', Screen: TrackOrderScreen, params: { orderId: 'SG10421' } },
  { name: 'DispatchOrders', Screen: DispatchOrdersScreen },
  { name: 'VendorWelcome', Screen: VendorWelcomeScreen },
  { name: 'VendorLogin', Screen: VendorLoginScreen },
  { name: 'VendorRegister', Screen: VendorRegisterScreen },
  { name: 'Reward', Screen: RewardScreen },
];

function mount(screen: ScreenCase) {
  const Stack = createNativeStackNavigator();
  return ReactTestRenderer.create(
    <ShopProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={screen.name}
            component={screen.Screen}
            initialParams={screen.params}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ShopProvider>,
  );
}

test('every screen renders without crashing', async () => {
  jest.useFakeTimers();
  const failures: string[] = [];

  for (const screen of screens) {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    try {
      await ReactTestRenderer.act(() => {
        renderer = mount(screen);
      });
    } catch (error) {
      failures.push(`${screen.name}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      if (renderer) {
        await ReactTestRenderer.act(() => {
          renderer?.unmount();
        });
      }
    }
  }

  jest.useRealTimers();
  expect(failures).toEqual([]);
});
