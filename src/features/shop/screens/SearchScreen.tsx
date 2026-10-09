import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Screen, TextField } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { plainText } from '../../../security/validation';
import { products } from '../../catalog/data';
import { ProductRail } from '../ProductRail';
import { TabNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

const hints = ['soap', 'poha', 'broom', 'cooking_oil'] as const;

export function SearchScreen() {
  const navigation = useNavigation<TabNav>();
  const { state, t } = useShop();
  const [query, setQuery] = useState('');
  const trimmed = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      trimmed
        ? products.filter(item => item.name.toLowerCase().includes(trimmed))
        : [],
    [trimmed],
  );

  return (
    <Screen
      title={t('search_product')}
      cartCount={state.cart.length}
      onCart={() => navigation.navigate('Bag')}
      tabBar>
      <TextField
        value={query}
        onChangeText={value => setQuery(plainText(value, 40))}
        placeholder={t('search_here')}
        testID="search-input"
      />
      {!trimmed ? (
        <View style={styles.hints}>
          <AppText variant="caption">{t('search_for')}</AppText>
          <View style={styles.chips}>
            {hints.map(hint => (
              <Pressable key={hint} style={styles.chip} onPress={() => setQuery(t(hint))}>
                <AppText>{t(hint)}</AppText>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <>
          <AppText variant="caption" style={styles.meta}>
            {`${t('search_results_prefix')} ${results.length} ${t('search_results_suffix')} "${query}"`}
          </AppText>
          <ProductRail items={results} layout="grid" />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hints: { gap: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  meta: { marginBottom: 12 },
});
