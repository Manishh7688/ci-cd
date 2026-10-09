import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppText, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { banners } from '../../catalog/data';
import { RootNav, RootStackParamList } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function BannerDetailScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'BannerDetail'>>();
  const { t } = useShop();
  const banner = banners.find(item => item.id === route.params.bannerId) ?? banners[0];

  return (
    <Screen title={t('about_us')} onBack={() => navigation.goBack()}>
      <Image source={banner.image} style={styles.image} resizeMode="cover" />
      <AppText variant="section" style={styles.gap}>
        {banner.title}
      </AppText>
      <View style={styles.card}>
        <AppText variant="section">{t('watch_the_video')}</AppText>
        <View style={styles.play}>
          <AppText color={colors.white}>▶</AppText>
        </View>
      </View>
      <View style={styles.card}>
        <AppText variant="section">{t('why_oswal')}</AppText>
        <AppText>{t('oswal_products_desc')}</AppText>
      </View>
      <View style={styles.card}>
        <AppText variant="section">{t('oswal_production')}</AppText>
        <AppText>{t('oswal_products_desc')}</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 220, borderRadius: 10 },
  gap: { marginVertical: 12 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 8,
  },
  play: {
    height: 160,
    borderRadius: 10,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
