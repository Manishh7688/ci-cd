import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { colors } from '../design/colors';
import { LanguageScreen } from '../features/onboarding/screens/LanguageScreen';
import { ChooseLocationScreen } from '../features/onboarding/screens/ChooseLocationScreen';
import { IntroScreen } from '../features/onboarding/screens/IntroScreen';
import { SplashScreen } from '../features/onboarding/screens/SplashScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import { WalletScreen } from '../features/account/screens/WalletScreen';
import { BagScreen } from '../features/cart/screens/BagScreen';
import { GiftsScreen } from '../features/cart/screens/GiftsScreen';
import { MapScreen } from '../features/cart/screens/MapScreen';
import { PaymentScreen } from '../features/cart/screens/PaymentScreen';
import { PromoScreen } from '../features/cart/screens/PromoScreen';
import { DispatchOrdersScreen } from '../features/orders/screens/DispatchOrdersScreen';
import { OrderDetailScreen } from '../features/orders/screens/OrderDetailScreen';
import { TrackOrderScreen } from '../features/orders/screens/TrackOrderScreen';
import { AllProductsScreen } from '../features/shop/screens/AllProductsScreen';
import { BannerDetailScreen } from '../features/shop/screens/BannerDetailScreen';
import { ProductDetailScreen } from '../features/shop/screens/ProductDetailScreen';
import { ShopsScreen } from '../features/shop/screens/ShopsScreen';
import {
  RewardScreen,
  VendorLoginScreen,
  VendorRegisterScreen,
  VendorWelcomeScreen,
} from '../features/vendor/screens/VendorScreens';
import { CustomerTabs } from './CustomerTabs';
import { RootStackParamList } from './types';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
    card: colors.white,
    text: colors.text,
    border: colors.line,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={CustomerTabs} />
        <Stack.Screen name="Bag" component={BagScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Promo" component={PromoScreen} />
        <Stack.Screen name="Gifts" component={GiftsScreen} />
        <Stack.Screen name="Shops" component={ShopsScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="AllProducts" component={AllProductsScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="BannerDetail" component={BannerDetailScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="DispatchOrders" component={DispatchOrdersScreen} />
        <Stack.Screen name="VendorWelcome" component={VendorWelcomeScreen} />
        <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
        <Stack.Screen name="VendorRegister" component={VendorRegisterScreen} />
        <Stack.Screen name="Reward" component={RewardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
