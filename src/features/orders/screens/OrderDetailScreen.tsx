import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppText, Button, PriceRow, Screen, TextField } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { plainText } from '../../../security/validation';
import { RootNav, RootStackParamList } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function OrderDetailScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'OrderDetail'>>();
  const shop = useShop();
  const order = shop.state.orders.find(item => item.id === route.params.orderId);
  const [review, setReview] = useState('');
  const [sent, setSent] = useState(false);

  if (!order) {
    return (
      <Screen title={shop.t('order_details')} onBack={() => navigation.goBack()}>
        <AppText>{shop.t('oops')}</AppText>
      </Screen>
    );
  }

  const cancel = () => {
    Alert.alert(shop.t('confirmation'), shop.t('cancel_order_confirm'), [
      { text: shop.t('no'), style: 'cancel' },
      {
        text: shop.t('yes'),
        onPress: () => shop.cancelOrder(order.id),
      },
    ]);
  };

  return (
    <Screen title={shop.t('order_details')} onBack={() => navigation.goBack()}>
      <View style={styles.card}>
        <AppText variant="section">
          {shop.t('order_id_label')}: {order.id}
        </AppText>
        <AppText>
          {shop.t('order_placed_label')}: {order.placedOn}
        </AppText>
        <AppText>
          {shop.t('payment_label')}: {order.payment}
        </AppText>
        <AppText>{order.status}</AppText>
      </View>
      <AppText variant="section" style={styles.gap}>
        {shop.t('order_summary_header')}
      </AppText>
      <AppText variant="caption">
        {order.items.length} {shop.t('items_in_order_suffix')}
      </AppText>
      {order.items.map(item => (
        <PriceRow
          key={item.name}
          label={`${item.name} × ${item.quantity}`}
          value={inr(item.price * item.quantity)}
        />
      ))}
      <PriceRow label={shop.t('bill_total')} value={inr(order.total)} />
      <View style={styles.card}>
        <AppText variant="section">{shop.t('delivery_to_label')}</AppText>
        <AppText>{order.address}</AppText>
      </View>
      {order.status === 'Dispatched' ? (
        <Button
          label={shop.t('track_order')}
          onPress={() => navigation.navigate('TrackOrder', { orderId: order.id })}
        />
      ) : null}
      {order.status !== 'Delivered' && order.status !== 'Cancelled' ? (
        <View style={styles.gapButton}>
          <Button label={shop.t('cancel_order')} variant="outline" onPress={cancel} />
        </View>
      ) : null}
      <AppText variant="section" style={styles.gap}>
        {shop.t('rate_your_order')}
      </AppText>
      <TextField
        value={review}
        onChangeText={value => setReview(plainText(value, 240))}
        placeholder={shop.t('write_your_review_here')}
      />
      <Button
        label={shop.t('submit_review')}
        onPress={() => setSent(true)}
        disabled={!review.trim()}
      />
      {sent ? <AppText color={colors.success}>{shop.t('submit')}</AppText> : null}
      <View style={styles.gapButton}>
        <Button label={shop.t('download_invoice')} variant="ghost" onPress={() => setSent(true)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 4,
    marginBottom: 12,
  },
  gap: { marginTop: 8, marginBottom: 6 },
  gapButton: { marginTop: 10 },
});
