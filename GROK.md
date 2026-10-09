# Soap Group

Soap Group is a React Native rewrite of the Oswal Mart screens from `OswalSoapTest`. The pages, labels, and red storefront are carried over. The code is not a copy of the old folders.

Use Yarn for every install and script. The app name registered with iOS and Android stays `soapgroup`.

## How the code is arranged

```text
src/
  app/                 App root
  navigation/          typed stack and the customer tabs
  design/              colors, spacing, theme
  components/ui/       buttons, fields, cards, headers, rows
  features/
    onboarding/        splash, intro, location, language
    auth/              customer login and register
    shop/              home, search, catalogue, product, shops, banners
    cart/              bag, payment, coupons, gifts, address
    orders/            orders, detail, tracking, dispatched
    account/           profile, wishlist, wallet
    vendor/            welcome, login, register, rewards
    catalog/           sample products, shops, and copy data
  domain/              cart math and price quotes
  security/            input checks, link allowlist, public config
  state/               in-memory shop session
  i18n/                English and Hindi strings
```

Add a screen by putting it in the feature it belongs to, registering it on `RootStackParamList`, and rendering it from `RootNavigator`. Share layout through `components/ui` instead of copying styles into the screen.

## Run

```bash
yarn install
yarn start
yarn ios
yarn android
yarn test
yarn typecheck
```

Navigation uses React Navigation. After the first install, rebuild the native app so `react-native-screens` and `react-native-gesture-handler` link. iOS also needs `bundle exec pod install` inside `ios/` when those native modules change.

## Security rules

- Do not commit API keys, Razorpay keys, tokens, or map keys. `src/security/config.ts` holds only public values.
- `authMode` is `design`. A 6-digit OTP signs the reviewer in so the pages can be walked without a backend. Switch this to a real verify call before release. Do not ship the design check.
- Keep session tokens in the platform keychain or keystore. Do not put them in AsyncStorage.
- Phone, email, name, OTP, pincode, coupon, and GST inputs go through `src/security/validation.ts`.
- External links must pass `isAllowedExternalUrl`. The allowlist is the terms page, the privacy page, the support `tel:` link, and the support WhatsApp link.
- New network calls must use HTTPS. Do not enable cleartext traffic for production.

## Testing

`yarn test` covers validation, the price quote, cart changes, coupon rejection, order placement, the product card, and the splash screen. Add a test when you change pricing, validation, or a shared component.

## What is still sample data

Products, shops, orders, wallet rows, and addresses are local sample data in `src/features/catalog/data.ts`. The map page is a location sheet, not a native map. The banner page shows a play plate instead of an embedded video. Payments do not call Razorpay. Wire those to the real services behind the same screen components when the API is ready.
