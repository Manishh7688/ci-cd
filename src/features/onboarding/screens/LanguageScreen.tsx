import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { Language } from '../../../i18n/translate';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

const options: { id: Language; label: 'english' | 'hindi' }[] = [
  { id: 'en', label: 'english' },
  { id: 'hi', label: 'hindi' },
];

export function LanguageScreen() {
  const navigation = useNavigation<RootNav>();
  const { state, setLanguage, t } = useShop();

  return (
    <Screen title={t('change_language')} onBack={() => navigation.goBack()}>
      <AppText variant="section">{t('select_language')}</AppText>
      <View style={styles.list}>
        {options.map(option => {
          const selected = state.language === option.id;
          return (
            <Pressable
              key={option.id}
              style={[styles.row, selected && styles.selected]}
              onPress={() => setLanguage(option.id)}
              testID={`language-${option.id}`}>
              <AppText>{t(option.label)}</AppText>
              <View style={[styles.radio, selected && styles.radioOn]} />
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { marginTop: 16, gap: 10 },
  row: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.line,
  },
  selected: { borderColor: colors.primary },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  radioOn: { borderColor: colors.primary, backgroundColor: colors.primary },
});
