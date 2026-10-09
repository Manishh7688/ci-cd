import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../design/colors';
import { digitsOnly } from '../../security/validation';
import { AppText } from './AppText';
import { Button } from './Button';
import { Icon } from './Icon';

export function OtpModal({
  visible,
  phone,
  title,
  resendLabel,
  verifyLabel,
  error,
  onClose,
  onVerify,
}: {
  visible: boolean;
  phone: string;
  title: string;
  resendLabel: string;
  verifyLabel: string;
  error?: string | null;
  onClose: () => void;
  onVerify: (code: string) => void;
}) {
  const [code, setCode] = useState('');
  const cells = Array.from({ length: 6 }, (_, index) => code[index] ?? '');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.close} testID="otp-close">
            <Icon name="close" size={22} />
          </Pressable>
          <AppText align="center">{title}</AppText>
          <AppText variant="section" align="center">
            +91 {phone}
          </AppText>
          <View style={styles.cells}>
            {cells.map((cell, index) => (
              <View key={index} style={styles.cell}>
                <AppText variant="section">{cell}</AppText>
              </View>
            ))}
          </View>
          <TextInput
            value={code}
            onChangeText={value => setCode(digitsOnly(value, 6))}
            keyboardType="number-pad"
            maxLength={6}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            style={styles.hidden}
            testID="otp-input"
          />
          {error ? (
            <AppText variant="caption" color={colors.primary} align="center">
              {error}
            </AppText>
          ) : null}
          <Button label={verifyLabel} onPress={() => onVerify(code)} testID="otp-verify" />
          <Pressable onPress={() => setCode('')} accessibilityRole="button">
            <AppText variant="caption" color={colors.primary} align="center">
              {resendLabel}
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    gap: 12,
  },
  close: { alignSelf: 'flex-end' },
  cells: { flexDirection: 'row', justifyContent: 'space-between' },
  cell: {
    width: 40,
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    position: 'absolute',
    opacity: 0.02,
    height: 48,
    left: 18,
    right: 18,
    top: 110,
  },
});
