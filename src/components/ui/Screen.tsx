import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../design/colors';
import { Header } from './Header';

export function Screen({
  children,
  title,
  onBack,
  onCart,
  cartCount,
  scroll = true,
  tabBar = false,
  footer,
  testID,
  background,
}: {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  onCart?: () => void;
  cartCount?: number;
  scroll?: boolean;
  tabBar?: boolean;
  footer?: React.ReactNode;
  testID?: string;
  background?: string;
}) {
  const page = { backgroundColor: background ?? colors.background };
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, tabBar && styles.tabSpace]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.fill, page, tabBar && styles.tabSpace]}>{children}</View>
  );

  return (
    <View style={[styles.fill, page]} testID={testID}>
      <StatusBar barStyle={title ? 'light-content' : 'dark-content'} />
      {title ? (
        <SafeAreaView edges={['top']} style={styles.headerSafe}>
          <Header
            title={title}
            onBack={onBack}
            onCart={onCart}
            cartCount={cartCount}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView edges={['top']} style={[styles.fill, page]}>
          {body}
          {footer}
        </SafeAreaView>
      )}
      {title ? (
        <>
          {body}
          {footer}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.background },
  headerSafe: { backgroundColor: colors.primary },
  content: { padding: 16, paddingBottom: 28 },
  tabSpace: { paddingBottom: 120 },
});
