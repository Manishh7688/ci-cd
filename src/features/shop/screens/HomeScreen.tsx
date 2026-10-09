import React, { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Icon, Screen, SectionHeader } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { banners, categories, products } from '../../catalog/data';
import { ProductRail } from '../ProductRail';
import { TabNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function HomeScreen() {
  const navigation = useNavigation<TabNav>();
  const { state, t } = useShop();
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const related = products.filter(item => item.categoryId === categoryId);
  const featured = products.filter(item => item.featured);
  const trending = products.filter(item => item.trending);
  const hot = products.slice(0, 4);
  const place = state.location
    ? `${state.location.city}, ${state.location.state}`
    : t('select_a_location');
  const cartCount = state.cart.reduce((sum, line) => sum + line.quantity, 0);
  const wished = state.wishlistIds.length > 0;

  return (
    <Screen tabBar background="#FFFFFF" testID="home-screen">
      <View style={styles.header}>
        <Pressable style={styles.location} onPress={() => navigation.navigate('ChooseLocation')}>
          <Icon name="pin" color={colors.brown} size={26} />
          <View style={styles.locationText}>
            <AppText style={styles.homeLabel}>{t('Home')}</AppText>
            <AppText variant="caption" numberOfLines={1} style={styles.address}>
              {place}
            </AppText>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Wishlist')} style={styles.iconBtn}>
          <Icon name="heart" color={colors.brown} size={24} />
          {wished ? <View style={styles.dot} /> : null}
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Bag')} style={styles.iconBtn} testID="home-cart">
          <Icon name="cart" color={colors.brown} size={24} />
          {cartCount > 0 ? (
            <View style={styles.badge}>
              <AppText variant="caption" color={colors.white}>
                {cartCount}
              </AppText>
            </View>
          ) : null}
        </Pressable>
      </View>

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.slider}>
        {banners.map(item => (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate('BannerDetail', { bannerId: item.id })}>
            <Image source={item.image} style={styles.slide} resizeMode="cover" />
          </Pressable>
        ))}
      </ScrollView>

      <AppText style={styles.sectionLabel}>{t('shop_by_category')}</AppText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map(category => {
          const selected = category.id === categoryId;
          return (
            <Pressable
              key={category.id}
              style={[styles.category, selected && styles.categoryOn]}
              onPress={() => setCategoryId(category.id)}>
              <Image source={category.image} style={styles.categoryImage} resizeMode="contain" />
              <AppText variant="caption" align="center" numberOfLines={2} style={styles.categoryName}>
                {category.name}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.related}>
        <ProductRail items={related} />
      </View>

      <Pressable
        style={styles.video}
        onPress={() => navigation.navigate('BannerDetail', { bannerId: banners[0].id })}>
        <AppText color={colors.white} style={styles.videoTitle}>
          {t('watch_the_video')}
        </AppText>
        <View style={styles.play}>
          <AppText color={colors.white} style={styles.playMark}>
            ▶
          </AppText>
        </View>
      </Pressable>

      <View style={styles.hot}>
        <Image
          source={require('../../../assets/images/hotdeals.png')}
          style={styles.hotTitle}
          resizeMode="contain"
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hot.map(item => (
            <Pressable
              key={item.id}
              style={styles.hotCard}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
              <Image source={item.image} style={styles.hotImage} resizeMode="contain" />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <SectionHeader
        title={t('feature_products')}
        action={t('explore_more')}
        onAction={() => navigation.navigate('AllProducts')}
      />
      <ProductRail items={featured} />

      <Image
        source={require('../../../assets/images/MOBILE_INTRO_1.1.jpg')}
        style={styles.festival}
        resizeMode="cover"
      />

      <SectionHeader
        title={t('trending_products')}
        action={t('explore_more')}
        onAction={() => navigation.navigate('AllProducts', { categoryId: 'masala' })}
      />
      <ProductRail items={trending} />

      <Image
        source={require('../../../assets/images/MOBILE_INTRO_3.1.jpg')}
        style={styles.footerArt}
        resizeMode="cover"
      />
      <Pressable
        style={styles.video}
        onPress={() => navigation.navigate('BannerDetail', { bannerId: banners[2].id })}>
        <AppText color={colors.white} style={styles.videoTitle}>
          {banners[2].title}
        </AppText>
        <View style={styles.play}>
          <AppText color={colors.white} style={styles.playMark}>
            ▶
          </AppText>
        </View>
      </Pressable>
    </Screen>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -16,
    marginTop: -16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F6F8FA',
  },
  location: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  locationText: { flex: 1, marginLeft: 6 },
  homeLabel: { fontWeight: '700', fontSize: 16 },
  address: { color: '#333333', marginTop: 2 },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 8,
    minWidth: 16,
    minHeight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  slider: { marginHorizontal: -16, marginVertical: 10 },
  slide: { width: screenWidth, height: 200 },
  sectionLabel: { fontWeight: '700', fontSize: 16, marginLeft: -6, marginBottom: 8 },
  categories: {
    marginHorizontal: -16,
    backgroundColor: '#F6F8FA',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  category: {
    width: 110,
    alignItems: 'center',
    marginRight: 8,
    paddingTop: 8,
    borderTopWidth: 5,
    borderTopColor: 'transparent',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  categoryOn: {
    borderTopColor: '#5E493B',
    backgroundColor: 'rgba(232, 152, 21, 0.1)',
  },
  categoryImage: { width: 100, height: 100 },
  categoryName: { width: 80, marginTop: 4 },
  related: {
    marginHorizontal: -16,
    marginBottom: 10,
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor: 'rgba(232, 152, 21, 0.1)',
  },
  video: {
    height: 180,
    borderRadius: 10,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    gap: 10,
  },
  videoTitle: { fontWeight: '700', fontSize: 16 },
  play: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playMark: { fontSize: 18, marginLeft: 3 },
  hot: {
    marginHorizontal: -16,
    backgroundColor: '#FDF4E7',
    paddingVertical: 12,
    marginBottom: 8,
  },
  hotTitle: { width: '80%', height: 28, alignSelf: 'center', marginBottom: 10 },
  hotCard: {
    width: 160,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotImage: { width: 140, height: 170 },
  festival: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 12,
  },
  footerArt: {
    width: '106%',
    height: 220,
    marginLeft: -16,
    marginTop: 12,
  },
});
