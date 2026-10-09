import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
import {
  digitsOnly,
  plainText,
  validateEmail,
  validateName,
  validateOtp,
  validatePhone,
} from '../../../security/validation';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function RegisterScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const nameError = validateName(firstName) || validateName(lastName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const fieldError = nameError || emailError || phoneError;
    if (fieldError) {
      setError(shop.t(fieldError));
      return;
    }
    shop.beginCustomerRegister({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: digitsOnly(phone, 10),
      referral: plainText(referral, 12),
    });
    setError(null);
    setOpen(true);
  };

  const verify = (code: string) => {
    const otpError = validateOtp(code);
    if (otpError) {
      setError(shop.t(otpError));
      return;
    }
    if (!shop.verifyOtp(code)) {
      setError(shop.t('invalid_otp'));
      return;
    }
    setOpen(false);
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <Screen title={shop.t('create_account')} onBack={() => navigation.goBack()}>
      <TextField label={shop.t('first_name')} value={firstName} onChangeText={value => setFirstName(plainText(value, 40))} />
      <TextField label={shop.t('last_name')} value={lastName} onChangeText={value => setLastName(plainText(value, 40))} />
      <TextField
        label={shop.t('email')}
        value={email}
        onChangeText={value => setEmail(plainText(value, 120))}
        keyboardType="email-address"
      />
      <TextField
        label={shop.t('mobile_number')}
        value={phone}
        onChangeText={value => setPhone(digitsOnly(value, 10))}
        keyboardType="number-pad"
        maxLength={10}
      />
      <TextField
        label={shop.t('referral_code_optional')}
        value={referral}
        onChangeText={value => setReferral(plainText(value, 12))}
      />
      {error ? <AppText color={colors.primary}>{error}</AppText> : null}
      <Button label={shop.t('register')} onPress={submit} testID="register-submit" />
      <Pressable onPress={() => navigation.navigate('Login')} style={styles.linkRow}>
        <AppText align="center">
          {shop.t('have_account')}{' '}
          <AppText color={colors.primary} style={styles.link}>
            {shop.t('login')}
          </AppText>
        </AppText>
      </Pressable>
      <LegalNote t={shop.t} />
      <OtpModal
        visible={open}
        phone={phone}
        title={shop.t('sent_otp_msg')}
        resendLabel={shop.t('resend_otp')}
        verifyLabel={shop.t('verify_otp')}
        error={error}
        onClose={() => setOpen(false)}
        onVerify={verify}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  linkRow: { marginTop: 14 },
  link: { textDecorationLine: 'underline', fontWeight: '700' },
});
