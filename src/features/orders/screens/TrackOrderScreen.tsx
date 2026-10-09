import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppText, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { RootNav, RootStackParamList } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

const steps = ['Placed', 'Dispatched', 'Delivered'] as const;

export function TrackOrderScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'TrackOrder'>>();
  const shop = useShop();
  const order = shop.state.orders.find(item => item.id === route.params.orderId);
  const active = order?.status === 'Delivered' ? 2 : order?.status === 'Dispatched' ? 1 : 0;

  return (
    <Screen title={shop.t('track_order')} onBack={() => navigation.goBack()}>
      <View style={styles.track}>
        <View style={styles.line} />
        {steps.map((step, index) => (
          <View key={step} style={styles.step}>
            <View style={[styles.dot, index <= active && styles.dotOn]} />
            <View style={styles.copy}>
              <AppText variant="section">{step}</AppText>
              <AppText variant="caption">{order?.placedOn}</AppText>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.card}>
        <AppText variant="section">{shop.t('delivery_boy_details')}</AppText>
        <AppText>
          {shop.t('name_label')}: {order?.deliveryBoy ?? shop.t('delivery_boy')}
        </AppText>
        <AppText>
          {shop.t('contact_label')}: {order?.deliveryPhone ?? '—'}
        </AppText>
      </View>
      <View style={styles.card}>
        <AppText variant="section">{shop.t('delivery_address')}</AppText>
        <AppText>{order?.address}</AppText>
        <AppText variant="caption">{shop.t('delivery_place')}</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  track: { marginBottom: 8 },
  line: {
    position: 'absolute',
    left: 7,
    top: 10,
    bottom: 22,
    width: 2,
    backgroundColor: colors.line,
  },
  step: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.line,
    marginTop: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
  dotOn: { backgroundColor: colors.primary },
  copy: { flex: 1 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 4,
    marginBottom: 12,
  },
});
