import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, EmptyState, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { Order } from '../../catalog/data';
import { TabNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

const statusColor: Record<Order['status'], string> = {
  Placed: colors.brown,
  Dispatched: colors.primary,
  Delivered: colors.success,
  Cancelled: colors.gray,
};

export function OrdersScreen() {
  const navigation = useNavigation<TabNav>();
  const { state, t } = useShop();

  return (
    <Screen title={t('your_orders')} tabBar>
      <Pressable onPress={() => navigation.navigate('DispatchOrders')} style={styles.link}>
        <AppText color={colors.primary}>{t('dispatched_orders')}</AppText>
      </Pressable>
      {state.orders.length === 0 ? (
        <EmptyState title={t('your_orders')} />
      ) : (
        state.orders.map(order => (
          <Pressable
            key={order.id}
            style={styles.card}
            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}>
            <View style={styles.row}>
              <AppText variant="section">{order.id}</AppText>
              <View style={[styles.pill, { backgroundColor: statusColor[order.status] }]}>
                <AppText variant="caption" color={colors.white}>
                  {order.status}
                </AppText>
              </View>
            </View>
            <AppText variant="caption">{order.placedOn}</AppText>
            <AppText numberOfLines={2}>
              {order.items.map(item => item.name).join(', ')}
            </AppText>
            <View style={styles.row}>
              <AppText variant="price">{inr(order.total)}</AppText>
              <AppText variant="caption">{order.payment}</AppText>
            </View>
          </Pressable>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  link: { alignSelf: 'flex-end', marginBottom: 8 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    gap: 6,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pill: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
});
