import React from 'react';
import { Alert, Image, Linking, Pressable, Share, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, MenuRow, Screen } from '../../../components/ui';
import { colors } from '../../../design/colors';
import { inr } from '../../../domain/money';
import { appConfig } from '../../../security/config';
import { isAllowedExternalUrl } from '../../../security/links';
import { TabNav } from '../../../navigation/types';
import { useShop } from '../../../state/ShopContext';

export function ProfileScreen() {
  const navigation = useNavigation<TabNav>();
  const shop = useShop();
  const session = shop.state.session;
  const account = session.status === 'guest' ? null : session;
  const vendor = account?.status === 'vendor';

  const openAllowed = async (url: string) => {
    if (!isAllowedExternalUrl(url)) {
      return;
    }
    await Linking.openURL(url);
  };

  const logout = () => {
    Alert.alert(shop.t('logout'), shop.t('logout_confirm_msg'), [
      { text: shop.t('cancel'), style: 'cancel' },
      { text: shop.t('ok'), onPress: () => shop.logout() },
    ]);
  };

  return (
    <Screen title={shop.t('profile')} tabBar background="#FFFFFF" testID="profile-screen">
      {account ? (
        <View>
          <AppText style={styles.name}>{account.name}</AppText>
          <AppText style={styles.phone}>{account.phone}</AppText>
          {!vendor ? (
            <Pressable style={styles.wallet} onPress={() => navigation.navigate('Wallet')}>
              <View style={styles.walletCopy}>
                <AppText style={styles.walletTitle}>{shop.t('oswal_wallet')}</AppText>
                <AppText style={styles.walletAmount}>{inr(shop.state.walletBalance)}/-</AppText>
                <AppText style={styles.walletDesc}>{shop.t('oswal_wallet_desc')}</AppText>
              </View>
              <Image
                source={require('../../../assets/images/wallet1.png')}
                style={styles.walletArt}
                resizeMode="contain"
              />
            </Pressable>
          ) : null}
        </View>
      ) : (
        <View>
          <AppText style={styles.guestTitle}>{shop.t('my_account')}</AppText>
          <AppText style={styles.guestBody}>{shop.t('guest_account_desc')}</AppText>
          <Pressable
            style={styles.continue}
            onPress={() => navigation.navigate('Login')}
            testID="profile-login">
            <AppText style={styles.continueText}>{shop.t('continue')}</AppText>
          </Pressable>
        </View>
      )}

      <AppText style={styles.kicker}>{shop.t('your_information')}</AppText>
      {!vendor ? (
        <MenuRow
          label={shop.t('wallet_history')}
          image={require('../../../assets/images/wallet.png')}
          onPress={() => (account ? navigation.navigate('Wallet') : navigation.navigate('Login'))}
        />
      ) : (
        <MenuRow
          label={shop.t('reward')}
          image={require('../../../assets/images/vendor_reward.png')}
          onPress={() => (account ? navigation.navigate('Reward') : navigation.navigate('Login'))}
        />
      )}

      <AppText style={styles.kicker}>{shop.t('other_information')}</AppText>
      <MenuRow
        label={shop.t('change_location')}
        image={require('../../../assets/images/flat.png')}
        onPress={() => navigation.navigate('ChooseLocation')}
      />
      <MenuRow
        label={shop.t('find_shops')}
        image={require('../../../assets/images/shops.png')}
        onPress={() => navigation.navigate('Shops')}
      />
      <MenuRow
        label={shop.t('proceed_vendor')}
        image={require('../../../assets/images/shopkeeper.png')}
        onPress={() => navigation.navigate('VendorWelcome')}
      />
      <MenuRow
        label={shop.t('refer_earn')}
        image={require('../../../assets/images/share.png')}
        onPress={() =>
          account
            ? Share.share({
                message: shop.t('check_out_this_awesome_app_use_my_referral_code_to_sign_up'),
              })
            : navigation.navigate('Login')
        }
      />
      <MenuRow
        label={shop.t('whatsapp_us')}
        image={require('../../../assets/images/whatsapp.png')}
        onPress={() => openAllowed(appConfig.whatsAppUrl)}
      />
      <MenuRow
        label={shop.t('change_language')}
        icon="language"
        onPress={() => navigation.navigate('Language')}
      />
      {account ? (
        <MenuRow
          label={shop.t('logout')}
          image={require('../../../assets/images/power.png')}
          onPress={logout}
        />
      ) : null}

      <AppText style={styles.footer}>{shop.t('delete_account_msg')}</AppText>
      <AppText
        color={colors.primary}
        style={styles.call}
        onPress={() => openAllowed(`tel:${appConfig.supportPhone}`)}>
        call : 91-6375581602
      </AppText>
      <AppText align="center" style={styles.brand}>
        {shop.t('oswal_mart')}
      </AppText>
      <AppText align="center" variant="caption" color={colors.gray}>
        {shop.t('version')} {appConfig.version}
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  phone: { fontSize: 16, color: colors.gray, marginBottom: 12 },
  wallet: {
    flexDirection: 'row',
    height: 150,
    backgroundColor: 'rgb(245,241,238)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  walletCopy: { flex: 1, paddingRight: 8 },
  walletTitle: { fontSize: 22, fontWeight: '700' },
  walletAmount: { fontSize: 20, fontWeight: '700', color: colors.success, marginTop: 4 },
  walletDesc: { fontSize: 12, color: colors.gray, marginTop: 12, width: '90%' },
  walletArt: { width: '22%', height: 100 },
  guestTitle: { fontSize: 23, fontWeight: '700', marginVertical: 10 },
  guestBody: { fontSize: 16, marginBottom: 10 },
  continue: {
    borderWidth: 1,
    borderColor: '#FFA900',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  continueText: {
    color: '#FFA900',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 8,
  },
  kicker: { marginTop: 18, marginBottom: 8, color: colors.gray, fontSize: 14 },
  footer: { marginTop: 18, width: '90%', alignSelf: 'center' },
  call: { textDecorationLine: 'underline', marginBottom: 12, fontSize: 16 },
  brand: { fontWeight: '700', color: colors.gray, fontSize: 18 },
});
