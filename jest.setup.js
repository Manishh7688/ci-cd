/* eslint-env jest */
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
  };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  const SafeAreaInsetsContext = React.createContext(inset);
  const SafeAreaFrameContext = React.createContext(frame);
  return {
    SafeAreaProvider: ({ children }) =>
      React.createElement(
        SafeAreaInsetsContext.Provider,
        { value: inset },
        React.createElement(
          SafeAreaFrameContext.Provider,
          { value: frame },
          children,
        ),
      ),
    SafeAreaView: ({ children }) => React.createElement(View, null, children),
    useSafeAreaInsets: () => inset,
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    initialWindowMetrics: { insets: inset, frame },
  };
});

jest.mock('react-native-screens', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Screen = ({ children }) => React.createElement(View, null, children);
  return {
    enableScreens: jest.fn(),
    screensEnabled: () => true,
    Screen,
    ScreenContainer: Screen,
    ScreenStack: Screen,
    ScreenStackItem: Screen,
    ScreenFooter: Screen,
    ScreenStackHeaderConfig: Screen,
    ScreenStackHeaderBackButtonImage: Screen,
    ScreenStackHeaderCenterView: Screen,
    ScreenStackHeaderLeftView: Screen,
    ScreenStackHeaderRightView: Screen,
    ScreenStackHeaderSearchBarView: Screen,
    SearchBar: Screen,
    FullWindowOverlay: Screen,
    compatibilityFlags: {},
    isSearchBarAvailableForCurrentPlatform: false,
  };
});
