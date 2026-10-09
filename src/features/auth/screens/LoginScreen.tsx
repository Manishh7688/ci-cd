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
import { digitsOnly, validateOtp, validatePhone } from '../../../security/validation';
import { RootNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function LoginScreen() {
  const navigation = useNavigation<RootNav>();
  const shop = useShop();
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const continueLogin = () => {
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setError(shop.t(phoneError));
      return;
    }
    shop.beginLogin(digitsOnly(phone, 10), 'customer');
    setError(null);
    setOpen(true);
  };

  const verify = (code: string) => {
    const otpError = validateOtp(code);
    if (otpError) {
      setError(shop.t(otpError));
      return;
    }
    const ok = shop.verifyOtp(code);
    if (!ok) {
      setError(shop.t('invalid_otp'));
      return;
    }
    setOpen(false);
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <Screen scroll background="#F2F2F2">
      <Pressable onPress={() => navigation.goBack()} testID="login-back" style={styles.cancel}>
        <AppText color={colors.brown}>{shop.t('cancel')}</AppText>
      </Pressable>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      <AppText variant="title" align="center">
        {shop.t('oswal_mart')}
      </AppText>
      <AppText align="center" style={styles.subtitle}>
        {shop.t('login_to_app')}
      </AppText>
      <View style={styles.form}>
        <TextField
          value={phone}
          onChangeText={value => setPhone(digitsOnly(value, 10))}
          placeholder={shop.t('enter_mobile')}
          keyboardType="number-pad"
          maxLength={10}
          icon="phone"
          testID="login-phone"
        />
        {error ? (
          <AppText variant="caption" color={colors.primary}>
            {error}
          </AppText>
        ) : null}
        <Button label={shop.t('continue')} onPress={continueLogin} testID="login-continue" />
        <Pressable onPress={() => navigation.navigate('Register')}>
          <AppText align="center">
            {shop.t('no_account')}{' '}
            <AppText color={colors.primary} style={styles.link}>
              {shop.t('signup')}
            </AppText>
          </AppText>
        </Pressable>
      </View>
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
  cancel: { alignSelf: 'flex-start', marginBottom: 4 },
  logo: { width: '100%', height: 80, marginTop: 12 },
  subtitle: { fontSize: 18, fontWeight: '500', color: colors.brown, marginTop: 4 },
  form: { marginTop: 20, marginHorizontal: 4, gap: 8 },
  link: { textDecorationLine: 'underline', fontWeight: '700' },
});
