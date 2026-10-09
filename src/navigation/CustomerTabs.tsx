import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Icon, IconName } from '../components/ui';
import { colors } from '../design/colors';
import { WishlistScreen } from '../features/account/screens/WishlistScreen';
import { OrdersScreen } from '../features/orders/screens/OrdersScreen';
import { ProfileScreen } from '../features/account/screens/ProfileScreen';
import { HomeScreen } from '../features/shop/screens/HomeScreen';
import { SearchScreen } from '../features/shop/screens/SearchScreen';
import { CustomerTabParamList } from './types';

const Tab = createBottomTabNavigator<CustomerTabParamList>();

const tabs: { name: keyof CustomerTabParamList; icon: IconName }[] = [
  { name: 'Home', icon: 'home' },
  { name: 'Wishlist', icon: 'heart' },
  { name: 'Search', icon: 'search' },
  { name: 'Orders', icon: 'orders' },
  { name: 'Profile', icon: 'user' },
];

function TabBar({ state, navigation, insets }: BottomTabBarProps) {
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const item = tabs[index];
        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            onPress={() => navigation.navigate(route.name as keyof CustomerTabParamList)}
            style={styles.slot}
            testID={`tab-${route.name}`}>
            <View style={[styles.circle, focused && styles.circleOn]}>
              <Icon
                name={item?.icon ?? 'home'}
                color={focused ? colors.white : colors.primary}
                size={20}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export function CustomerTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={TabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 88,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  slot: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  circleOn: { backgroundColor: colors.primary },
});
