import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, Button, Screen, TextField } from '../../../components/ui';
import { colors } from '../../../design/colors';
import {
  digitsOnly,
  plainText,
  validateEmail,
  validateName,
  validatePincode,
  validatePhone,
} from '../../../security/validation';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function MapScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const [name, setName] = useState('');
  const [line, setLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const fieldError =
      validateName(name) ||
      (!line.trim() ? 'all_fields_are_required' : null) ||
      validatePincode(pincode) ||
      validatePhone(phone) ||
      validateEmail(email);
    if (fieldError) {
      setError(shop.t(fieldError));
      return;
    }
    shop.saveAddress({
      id: `addr-${pincode}-${phone.slice(-4)}`,
      label: 'Home',
      name: name.trim(),
      line: `${line.trim()}${landmark.trim() ? `, ${landmark.trim()}` : ''}`,
      city: shop.state.location?.city ?? shop.address.city,
      state: shop.state.location?.state ?? shop.address.state,
      pincode,
      phone: digitsOnly(phone, 10),
      email: email.trim(),
    });
    navigation.goBack();
  };

  return (
    <Screen title={shop.t('select_a_location')} onBack={() => navigation.goBack()}>
      <View style={styles.map}>
        <View style={styles.park} />
        <View style={styles.blockA} />
        <View style={styles.blockB} />
        <View style={styles.roadH} />
        <View style={styles.roadV} />
        <View style={styles.pin}>
          <View style={styles.pinHead} />
          <View style={styles.pinTail} />
        </View>
        <View style={styles.mapCard}>
          <AppText style={styles.mapCity}>{shop.address.city}</AppText>
          <AppText variant="caption">{shop.t('move_pin_to_your_exact_location')}</AppText>
        </View>
      </View>
      <AppText variant="section" style={styles.heading}>
        {shop.t('your_saved_address')}
      </AppText>
      {shop.state.addresses.map(address => {
        const selected = address.id === shop.state.addressId;
        return (
          <Pressable
            key={address.id}
            style={[styles.card, selected && styles.cardOn]}
            onPress={() => shop.selectAddress(address.id)}>
            <AppText variant="section">{address.label}</AppText>
            <AppText>
              {address.name}, {address.line}
            </AppText>
            <AppText variant="caption">
              {address.city}, {address.state} {address.pincode}
            </AppText>
          </Pressable>
        );
      })}
      <AppText variant="section" style={styles.heading}>
        {shop.t('add_new_address')}
      </AppText>
      <TextField label={shop.t('name_label')} value={name} onChangeText={value => setName(plainText(value, 40))} />
      <TextField
        label={shop.t('enter_full_address')}
        value={line}
        onChangeText={value => setLine(plainText(value, 120))}
      />
      <TextField label={shop.t('landmark')} value={landmark} onChangeText={value => setLandmark(plainText(value, 40))} />
      <TextField
        label={shop.t('pincode')}
        value={pincode}
        onChangeText={value => setPincode(digitsOnly(value, 6))}
        keyboardType="number-pad"
        maxLength={6}
      />
      <TextField
        label={shop.t('mobile_number')}
        value={phone}
        onChangeText={value => setPhone(digitsOnly(value, 10))}
        keyboardType="number-pad"
        maxLength={10}
      />
      <TextField
        label={shop.t('email')}
        value={email}
        onChangeText={value => setEmail(plainText(value, 120))}
        keyboardType="email-address"
      />
      {error ? <AppText color={colors.primary}>{error}</AppText> : null}
      <Button label={shop.t('save_address')} onPress={save} testID="save-address" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 210,
    borderRadius: 12,
    backgroundColor: '#E7F0E4',
    overflow: 'hidden',
  },
  park: {
    position: 'absolute',
    left: 16,
    top: 18,
    width: 84,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#C9E4B4',
  },
  blockA: {
    position: 'absolute',
    right: 22,
    top: 24,
    width: 92,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#F6E7D4',
  },
  blockB: {
    position: 'absolute',
    left: 28,
    bottom: 64,
    width: 70,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#F3D7C3',
  },
  roadH: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 96,
    height: 16,
    backgroundColor: colors.white,
  },
  roadV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 150,
    width: 14,
    backgroundColor: colors.white,
  },
  pin: { position: 'absolute', top: 58, left: 138, alignItems: 'center' },
  pinHead: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.white,
  },
  pinTail: {
    width: 0,
    height: 0,
    marginTop: -2,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
  },
  mapCard: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mapCity: { fontWeight: '700', color: colors.brown },
  heading: { marginVertical: 12 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardOn: { borderColor: colors.primary },
});
