import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, EmptyState, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function DispatchOrdersScreen() {
  const navigation = useNavigation<RootNav>();
  const { state, t } = useShop();
  const orders = state.orders.filter(order => order.status === 'Dispatched');

  return (
    <Screen title={t('dispatched_orders')} onBack={() => navigation.goBack()}>
      {orders.length === 0 ? (
        <EmptyState title={t('dispatched_orders')} />
      ) : (
        orders.map(order => (
          <Pressable
            key={order.id}
            style={styles.card}
            onPress={() => navigation.navigate('TrackOrder', { orderId: order.id })}>
            <AppText variant="section">{order.id}</AppText>
            <AppText>{order.address}</AppText>
            <AppText variant="price">{inr(order.total)}</AppText>
            <AppText color={colors.primary}>{t('track_order')}</AppText>
          </Pressable>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 4,
  },
});
