import React from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { colors } from '../../design/colors';
import { appConfig } from '../../security/config';
import { isAllowedExternalUrl } from '../../security/links';
import { CopyKey } from '../../i18n/translate';
import { AppText } from './AppText';

async function openAllowed(url: string) {
  if (!isAllowedExternalUrl(url)) {
    return;
  }
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    Alert.alert('Unable to open link');
    return;
  }
  await Linking.openURL(url);
}

export function LegalNote({ t }: { t: (key: CopyKey) => string }) {
  return (
    <View style={styles.wrap}>
      <AppText variant="caption" align="center" color={colors.gray}>
        {t('agree_msg')}{' '}
        <AppText
          variant="caption"
          color={colors.black}
          style={styles.link}
          onPress={() => openAllowed(appConfig.termsUrl)}>
          {t('terms_service')}
        </AppText>
        {'  '}
        <AppText
          variant="caption"
          color={colors.black}
          style={styles.link}
          onPress={() => openAllowed(appConfig.privacyUrl)}>
          {t('privacy_policy')}
        </AppText>
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 16, paddingHorizontal: 12 },
  link: { textDecorationLine: 'underline' },
});
