import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Button, Screen, TextField } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { locations } from '../../catalog/data';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function ChooseLocationScreen() {
  const navigation = useNavigation<RootNav>();
  const { setLocation, t } = useShop();
  const [stateQuery, setStateQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [stateName, setStateName] = useState<string | null>(null);

  const states = useMemo(
    () =>
      locations.filter(item =>
        item.state.toLowerCase().includes(stateQuery.trim().toLowerCase()),
      ),
    [stateQuery],
  );
  const cities = useMemo(() => {
    const match = locations.find(item => item.state === stateName);
    if (!match) {
      return [];
    }
    return match.cities.filter(city =>
      city.toLowerCase().includes(cityQuery.trim().toLowerCase()),
    );
  }, [cityQuery, stateName]);

  const chooseCity = (city: string) => {
    if (!stateName) {
      return;
    }
    setLocation({ state: stateName, city });
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <Screen title={t('choose_location_title')} onBack={() => navigation.goBack()} testID="choose-location">
      <AppText variant="subtitle">{t('location_desc')}</AppText>
      {!stateName ? (
        <>
          <View style={styles.gap} />
          <TextField
            label={t('select_state')}
            value={stateQuery}
            onChangeText={setStateQuery}
            placeholder={t('search_state')}
          />
          {states.map(item => (
            <Pressable key={item.state} style={styles.row} onPress={() => setStateName(item.state)}>
              <AppText>{item.state}</AppText>
            </Pressable>
          ))}
        </>
      ) : (
        <>
          <View style={styles.gap} />
          <AppText variant="caption">
            {t('state')}: {stateName}
          </AppText>
          <TextField
            label={t('select_city')}
            value={cityQuery}
            onChangeText={setCityQuery}
            placeholder={t('search_city')}
          />
          {cities.map(city => (
            <Pressable key={city} style={styles.row} onPress={() => chooseCity(city)}>
              <AppText>{city}</AppText>
            </Pressable>
          ))}
          <Button label={t('select_state')} variant="outline" onPress={() => setStateName(null)} />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  gap: { height: 16 },
  row: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
});
