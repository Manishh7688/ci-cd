import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function WalletScreen() {
  const navigation = useNavigation<RootNav>();
  const { state, t } = useShop();

  return (
    <Screen title={t('wallet_details')} onBack={() => navigation.goBack()}>
      <View style={styles.balance}>
        <AppText variant="caption" color={colors.white}>
          {t('available_balance')}
        </AppText>
        <AppText variant="title" color={colors.white}>
          {inr(state.walletBalance)}
        </AppText>
      </View>
      <AppText variant="section" style={styles.heading}>
        {t('transaction_history')}
      </AppText>
      {state.transactions.map(item => (
        <View key={item.id} style={styles.row}>
          <View>
            <AppText>{t(item.title)}</AppText>
            <AppText variant="caption">{item.date}</AppText>
          </View>
          <AppText color={item.title === 'cashback' ? colors.success : colors.primary}>
            {item.title === 'cashback' ? '+' : '-'}
            {inr(item.amount)}
          </AppText>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  balance: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 4,
  },
  heading: { marginVertical: 14 },
  row: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
