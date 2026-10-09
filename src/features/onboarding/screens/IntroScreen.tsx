import React, { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../design/colors';
import { AppText, Icon } from '../../../components/ui';
import { CopyKey } from '../../../i18n/translate';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

const slides: { id: string; title: CopyKey; image: ImageSourcePropType }[] = [
  {
    id: 'soap',
    title: 'soap_cleaner',
    image: require('../../../assets/images/MOBILE_INTRO_2.jpg'),
  },
  {
    id: 'masala',
    title: 'masale',
    image: require('../../../assets/images/MOBILE_INTRO_1.1.jpg'),
  },
  {
    id: 'tea',
    title: 'oswaltea',
    image: require('../../../assets/images/MOBILE_INTRO_3.1.jpg'),
  },
];

export function IntroScreen() {
  const navigation = useNavigation<RootNav>();
  const { t } = useShop();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const last = index === slides.length - 1;

  const next = () => {
    if (last) {
      navigation.navigate('ChooseLocation');
      return;
    }
    setIndex(value => value + 1);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={['top']} style={styles.top}>
        <AppText style={styles.title}>{t(slide.title)}</AppText>
      </SafeAreaView>
      <Image source={slide.image} style={styles.image} resizeMode="cover" />
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((item, dot) => (
            <View key={item.id} style={[styles.dot, dot === index && styles.dotOn]} />
          ))}
        </View>
        <Pressable accessibilityRole="button" onPress={next} style={styles.next} testID="intro-next">
          <Icon name={last ? 'check' : 'chevron'} color={colors.intro} size={26} />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.intro },
  top: { backgroundColor: colors.intro },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  image: { flex: 1, width: '100%' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.55)' },
  dotOn: { backgroundColor: colors.black, width: 18 },
  next: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
