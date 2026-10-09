import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function SplashScreen() {
  const navigation = useNavigation<RootNav>();
  const { state } = useShop();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: state.location ? 'Main' : 'Intro' }],
      });
    }, 1400);
    return () => clearTimeout(timer);
  }, [navigation, state.location]);

  return (
    <View style={styles.screen} testID="splash-screen">
      <StatusBar barStyle="dark-content" />
      <Image
        source={require('../../../assets/images/front.gif')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  image: { width: '100%', height: '100%' },
});
