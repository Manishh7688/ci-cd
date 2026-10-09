import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Screen, TextField } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { plainText } from '../../../security/validation';
import { shops } from '../../catalog/data';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function ShopsScreen() {
  const navigation = useNavigation<RootNav>();
  const { t } = useShop();
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return shops;
    }
    return shops.filter(shop =>
      [shop.name, shop.city, shop.pincode, shop.address]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  return (
    <Screen title={t('oswal_retail_shops')} onBack={() => navigation.goBack()}>
      <TextField
        value={query}
        onChangeText={value => setQuery(plainText(value, 40))}
        placeholder={t('enter_area_pincode')}
      />
      {list.map(shop => (
        <View key={shop.id} style={styles.card}>
          <AppText variant="section">{shop.name}</AppText>
          <AppText variant="caption">
            {t('shop_id')}: {shop.id}
          </AppText>
          <AppText>
            {t('person_name')}: {shop.person}
          </AppText>
          <AppText>
            {t('shop_address')}: {shop.address}
          </AppText>
          <AppText>
            {t('shop_city')}: {shop.city}, {t('shop_state')}: {shop.state}
          </AppText>
          <AppText>
            {t('shop_pincode')}: {shop.pincode}
          </AppText>
          <AppText>
            {t('landline')}: {shop.landline}
          </AppText>
          <AppText>
            {t('mobile')}: {shop.mobile}
          </AppText>
        </View>
      ))}
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
