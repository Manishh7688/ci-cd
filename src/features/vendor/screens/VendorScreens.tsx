import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  Button,
  LegalNote,
  OtpModal,
  Screen,
  TextField,
} from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import {
  digitsOnly,
  plainText,
  validateEmail,
  validateGst,
  validateName,
  validateOtp,
  validatePhone,
  validatePincode,
} from '../../../security/validation';
import { locations } from '../../catalog/data';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function VendorWelcomeScreen() {
  const navigation = useNavigation<RootNav>();
  const { t } = useShop();
  return (
    <Screen background="#F2F2F2">
      <View style={styles.welcome}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <AppText variant="title" align="center">
          {t('welcome_to_oswal_multivendor')}
        </AppText>
        <AppText variant="subtitle" align="center">
          {t('the_ecommerce_app_for_vendors')}
        </AppText>
        <Button label={t('register')} onPress={() => navigation.navigate('VendorRegister')} />
        <Button label={t('login')} variant="outline" onPress={() => navigation.navigate('VendorLogin')} />
        <Pressable onPress={() => navigation.goBack()}>
          <AppText align="center" color={colors.primary}>
            {t('skip')}
          </AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

export function VendorLoginScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setError(shop.t(phoneError));
      return;
    }
    shop.beginLogin(digitsOnly(phone, 10), 'vendor');
    setError(null);
    setOpen(true);
  };

  return (
    <Screen title={shop.t('vendor_login')} onBack={() => navigation.goBack()}>
      <TextField
        label={shop.t('mobile_number')}
        value={phone}
        onChangeText={value => setPhone(digitsOnly(value, 10))}
        keyboardType="number-pad"
        maxLength={10}
      />
      {error ? <AppText color={colors.primary}>{error}</AppText> : null}
      <Button label={shop.t('continue')} onPress={submit} />
      <LegalNote t={shop.t} />
      <OtpModal
        visible={open}
        phone={phone}
        title={shop.t('sent_otp_msg')}
        resendLabel={shop.t('resend_otp')}
        verifyLabel={shop.t('verify_otp')}
        error={error}
        onClose={() => setOpen(false)}
        onVerify={code => {
          const otpError = validateOtp(code);
          if (otpError || !shop.verifyOtp(code)) {
            setError(shop.t(otpError ?? 'invalid_otp'));
            return;
          }
          setOpen(false);
          navigation.navigate('Reward');
        }}
      />
    </Screen>
  );
}

export function VendorRegisterScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [storeCode, setStoreCode] = useState('');
  const [address, setAddress] = useState('');
  const [stateName, setStateName] = useState(locations[0].state);
  const [city, setCity] = useState(locations[0].cities[0]);
  const [pincode, setPincode] = useState('');
  const [gst, setGst] = useState('');
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!validateGst(gst)) {
      setError(shop.t('something_went_wrong'));
      return;
    }
    const fieldError =
      validateName(firstName) ||
      validateName(lastName) ||
      validateEmail(email) ||
      validatePhone(phone) ||
      (!shopName.trim() ? 'shop_name_is_required' : null) ||
      (!/^\d{6}$/.test(storeCode) ? 'store_code_must_be_6_digits' : null) ||
      (!address.trim() ? 'address_is_required' : null) ||
      validatePincode(pincode) ||
      (!front || !back ? 'all_fields_are_required' : null);
    if (fieldError) {
      setError(shop.t(fieldError));
      return;
    }
    shop.beginVendorRegister({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: digitsOnly(phone, 10),
      shopName: shopName.trim(),
      storeCode,
      address: address.trim(),
      state: stateName,
      city,
      pincode,
      gst: gst.trim().toUpperCase(),
    });
    setError(null);
    setOpen(true);
  };

  return (
    <Screen title={shop.t('vendor_register')} onBack={() => navigation.goBack()}>
      <TextField label={shop.t('first_name')} value={firstName} onChangeText={value => setFirstName(plainText(value, 40))} />
      <TextField label={shop.t('last_name')} value={lastName} onChangeText={value => setLastName(plainText(value, 40))} />
      <TextField label={shop.t('email')} value={email} onChangeText={value => setEmail(plainText(value, 120))} keyboardType="email-address" />
      <TextField label={shop.t('mobile_number')} value={phone} onChangeText={value => setPhone(digitsOnly(value, 10))} keyboardType="number-pad" maxLength={10} />
      <TextField label={shop.t('shop_name')} value={shopName} onChangeText={value => setShopName(plainText(value, 60))} />
      <TextField label={shop.t('store_code')} value={storeCode} onChangeText={value => setStoreCode(digitsOnly(value, 6))} keyboardType="number-pad" maxLength={6} />
      <TextField label={shop.t('address')} value={address} onChangeText={value => setAddress(plainText(value, 120))} />
      <AppText variant="caption">{shop.t('state')}</AppText>
      <View style={styles.chips}>
        {locations.map(item => (
          <Pressable key={item.state} style={[styles.chip, stateName === item.state && styles.chipOn]} onPress={() => {
            setStateName(item.state);
            setCity(item.cities[0]);
          }}>
            <AppText color={stateName === item.state ? colors.white : colors.text}>{item.state}</AppText>
          </Pressable>
        ))}
      </View>
      <AppText variant="caption">{shop.t('city')}</AppText>
      <View style={styles.chips}>
        {(locations.find(item => item.state === stateName)?.cities ?? []).map(item => (
          <Pressable key={item} style={[styles.chip, city === item && styles.chipOn]} onPress={() => setCity(item)}>
            <AppText color={city === item ? colors.white : colors.text}>{item}</AppText>
          </Pressable>
        ))}
      </View>
      <TextField label={shop.t('pin_code')} value={pincode} onChangeText={value => setPincode(digitsOnly(value, 6))} keyboardType="number-pad" maxLength={6} />
      <View style={styles.docs}>
        <Button label={front ? shop.t('received') : shop.t('aadhar_front')} variant="outline" onPress={() => setFront(true)} />
        <Button label={back ? shop.t('received') : shop.t('aadhar_back')} variant="outline" onPress={() => setBack(true)} />
      </View>
      <TextField label={shop.t('gst_number_optional')} value={gst} onChangeText={value => setGst(plainText(value, 15).toUpperCase())} />
      {error ? <AppText color={colors.primary}>{error}</AppText> : null}
      <Button label={shop.t('register')} onPress={submit} />
      <LegalNote t={shop.t} />
      <OtpModal
        visible={open}
        phone={phone}
        title={shop.t('verification_code_sent')}
        resendLabel={shop.t('resend_otp')}
        verifyLabel={shop.t('verify_otp')}
        error={error}
        onClose={() => setOpen(false)}
        onVerify={code => {
          if (validateOtp(code) || !shop.verifyOtp(code)) {
            setError(shop.t('invalid_otp'));
            return;
          }
          setOpen(false);
          navigation.navigate('Reward');
        }}
      />
    </Screen>
  );
}

const rewards = [
  { name: 'Welcome hamper', need: 500, status: 'available' as const },
  { name: 'Festival pack', need: 2000, status: 'pending' as const },
  { name: 'Shop starter kit', need: 5000, status: 'received' as const },
];

export function RewardScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const weight = shop.state.orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <Screen title={shop.t('reward')} onBack={() => navigation.goBack()}>
      <AppText>
        {shop.t('overall_order_weight')}
        {inr(weight)}
      </AppText>
      {rewards.map(reward => (
        <View key={reward.name} style={styles.reward}>
          <AppText variant="section">{reward.name}</AppText>
          <AppText variant="caption">
            {shop.t('you_will_get_this_award_on_order_above')} {inr(reward.need)}
          </AppText>
          <AppText color={colors.primary}>{shop.t(reward.status)}</AppText>
          <AppText>
            {shop.t('price')}: {inr(reward.need)}
          </AppText>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  welcome: { gap: 14, paddingTop: 24 },
  logo: { width: '100%', height: 96, alignSelf: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  docs: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  reward: {
    marginTop: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
});
