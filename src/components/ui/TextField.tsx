import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../design/colors';
import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  secureTextEntry = false,
  icon,
  testID,
}: {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad';
  maxLength?: number;
  secureTextEntry?: boolean;
  icon?: IconName;
  testID?: string;
}) {
  return (
    <View style={styles.wrap}>
      {label ? (
        <AppText variant="caption" color={colors.brown}>
          {label}
        </AppText>
      ) : null}
      <View style={styles.field}>
        {icon ? <Icon name={icon} color={colors.primary} size={18} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
          autoCorrect={false}
          testID={testID}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6, marginBottom: 12 },
  field: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 12,
  },
});
