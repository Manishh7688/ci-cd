import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export type IconName =
  | 'home'
  | 'heart'
  | 'heart-fill'
  | 'search'
  | 'orders'
  | 'user'
  | 'cart'
  | 'back'
  | 'pin'
  | 'phone'
  | 'chevron'
  | 'star'
  | 'gift'
  | 'wallet'
  | 'shop'
  | 'language'
  | 'logout'
  | 'share'
  | 'whatsapp'
  | 'close'
  | 'check'
  | 'plus'
  | 'minus';

type GlyphProps = {
  color: string;
  size: number;
};

function strokeOf(size: number) {
  return Math.max(1.75, size * 0.09);
}

function Frame({
  size,
  children,
  align = 'center',
  justify = 'center',
}: {
  size: number;
  children?: React.ReactNode;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
}) {
  const frame: ViewStyle = {
    width: size,
    height: size,
    alignItems: align,
    justifyContent: justify,
  };
  return (
    <View style={frame} accessibilityElementsHidden>
      {children}
    </View>
  );
}

function HomeGlyph({ color, size }: GlyphProps) {
  const roof: ViewStyle = {
    width: 0,
    height: 0,
    borderLeftWidth: size * 0.42,
    borderRightWidth: size * 0.42,
    borderBottomWidth: size * 0.32,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: color,
  };
  const body: ViewStyle = {
    width: size * 0.56,
    height: size * 0.36,
    backgroundColor: color,
    marginTop: -1,
  };
  return (
    <Frame size={size} justify="flex-end">
      <View style={roof} />
      <View style={body} />
    </Frame>
  );
}

function HeartGlyph({ color, size, filled }: GlyphProps & { filled: boolean }) {
  const thickness = strokeOf(size);
  const lobe: ViewStyle = {
    position: 'absolute',
    width: size * 0.4,
    height: size * 0.4,
    borderRadius: size * 0.2,
    backgroundColor: filled ? color : 'transparent',
    borderWidth: filled ? 0 : thickness,
    borderColor: color,
    top: size * 0.12,
  };
  const left: ViewStyle = { ...lobe, left: size * 0.1 };
  const right: ViewStyle = { ...lobe, right: size * 0.1 };
  const diamond: ViewStyle = {
    position: 'absolute',
    width: size * 0.46,
    height: size * 0.46,
    backgroundColor: filled ? color : 'transparent',
    borderWidth: filled ? 0 : thickness,
    borderColor: color,
    transform: [{ rotate: '45deg' }],
    top: size * 0.24,
    borderRadius: size * 0.04,
  };
  return (
    <Frame size={size}>
      <View style={left} />
      <View style={right} />
      <View style={diamond} />
    </Frame>
  );
}

function SearchGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const ring: ViewStyle = {
    width: size * 0.58,
    height: size * 0.58,
    borderRadius: size,
    borderWidth: thickness,
    borderColor: color,
    position: 'absolute',
    top: size * 0.06,
    left: size * 0.06,
  };
  const handle: ViewStyle = {
    position: 'absolute',
    width: thickness,
    height: size * 0.28,
    backgroundColor: color,
    borderRadius: thickness,
    right: size * 0.14,
    bottom: size * 0.08,
    transform: [{ rotate: '-42deg' }],
  };
  return (
    <Frame size={size}>
      <View style={ring} />
      <View style={handle} />
    </Frame>
  );
}

function OrdersGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  return (
    <Frame size={size} align="flex-start">
      {[0, 1, 2].map(row => {
        const line: ViewStyle = {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: size * 0.08,
          marginBottom: row === 2 ? 0 : size * 0.1,
        };
        const mark: ViewStyle = {
          width: size * 0.16,
          height: size * 0.16,
          borderRadius: 2,
          borderWidth: thickness,
          borderColor: color,
          marginRight: size * 0.1,
        };
        const bar: ViewStyle = {
          width: size * 0.46,
          height: thickness,
          borderRadius: thickness,
          backgroundColor: color,
        };
        return (
          <View key={row} style={line}>
            <View style={mark} />
            <View style={bar} />
          </View>
        );
      })}
    </Frame>
  );
}

function UserGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const head: ViewStyle = {
    width: size * 0.34,
    height: size * 0.34,
    borderRadius: size,
    borderWidth: thickness,
    borderColor: color,
    marginTop: size * 0.08,
  };
  const shoulders: ViewStyle = {
    width: size * 0.68,
    height: size * 0.32,
    borderTopLeftRadius: size,
    borderTopRightRadius: size,
    borderWidth: thickness,
    borderBottomWidth: 0,
    borderColor: color,
    marginTop: size * 0.06,
  };
  return (
    <Frame size={size} justify="flex-start">
      <View style={head} />
      <View style={shoulders} />
    </Frame>
  );
}

function CartGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const handle: ViewStyle = {
    width: size * 0.36,
    height: size * 0.2,
    borderTopWidth: thickness,
    borderLeftWidth: thickness,
    borderRightWidth: thickness,
    borderColor: color,
    borderTopLeftRadius: size * 0.12,
    borderTopRightRadius: size * 0.12,
  };
  const bag: ViewStyle = {
    width: size * 0.72,
    height: size * 0.42,
    borderWidth: thickness,
    borderColor: color,
    borderRadius: 3,
    marginTop: -1,
  };
  return (
    <Frame size={size} justify="flex-end">
      <View style={handle} />
      <View style={bag} />
    </Frame>
  );
}

function ChevronGlyph({ color, size, left }: GlyphProps & { left?: boolean }) {
  const thickness = strokeOf(size);
  const arm: ViewStyle = {
    width: size * 0.38,
    height: size * 0.38,
    borderTopWidth: thickness,
    borderRightWidth: thickness,
    borderColor: color,
    transform: [{ rotate: left ? '-135deg' : '45deg' }],
  };
  return (
    <Frame size={size}>
      <View style={arm} />
    </Frame>
  );
}

function PinGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const head: ViewStyle = {
    width: size * 0.5,
    height: size * 0.5,
    borderRadius: size,
    borderWidth: thickness,
    borderColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const dot: ViewStyle = {
    width: size * 0.14,
    height: size * 0.14,
    borderRadius: size,
    backgroundColor: color,
  };
  const tail: ViewStyle = {
    width: 0,
    height: 0,
    marginTop: -2,
    borderLeftWidth: size * 0.14,
    borderRightWidth: size * 0.14,
    borderTopWidth: size * 0.2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: color,
  };
  return (
    <Frame size={size} justify="flex-start">
      <View style={head}>
        <View style={dot} />
      </View>
      <View style={tail} />
    </Frame>
  );
}

function PhoneGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const body: ViewStyle = {
    width: size * 0.48,
    height: size * 0.76,
    borderRadius: size * 0.1,
    borderWidth: thickness,
    borderColor: color,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: size * 0.08,
  };
  const speaker: ViewStyle = {
    position: 'absolute',
    top: size * 0.1,
    width: size * 0.16,
    height: thickness,
    borderRadius: thickness,
    backgroundColor: color,
  };
  const button: ViewStyle = {
    width: size * 0.1,
    height: size * 0.1,
    borderRadius: size,
    borderWidth: thickness,
    borderColor: color,
  };
  return (
    <Frame size={size}>
      <View style={body}>
        <View style={speaker} />
        <View style={button} />
      </View>
    </Frame>
  );
}

function StarGlyph({ color, size }: GlyphProps) {
  const arm = Math.max(2, size * 0.16);
  const vertical: ViewStyle = {
    position: 'absolute',
    width: arm,
    height: size * 0.84,
    backgroundColor: color,
    borderRadius: arm,
  };
  const horizontal: ViewStyle = {
    position: 'absolute',
    width: size * 0.84,
    height: arm,
    backgroundColor: color,
    borderRadius: arm,
  };
  const slash: ViewStyle = { ...vertical, transform: [{ rotate: '45deg' }] };
  return (
    <Frame size={size}>
      <View style={vertical} />
      <View style={horizontal} />
      <View style={slash} />
    </Frame>
  );
}

function GiftGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const box: ViewStyle = {
    width: size * 0.7,
    height: size * 0.48,
    borderWidth: thickness,
    borderColor: color,
    marginTop: size * 0.16,
  };
  const ribbonV: ViewStyle = {
    position: 'absolute',
    width: thickness,
    height: size * 0.62,
    backgroundColor: color,
    top: size * 0.16,
  };
  const ribbonH: ViewStyle = {
    position: 'absolute',
    width: size * 0.7,
    height: thickness,
    backgroundColor: color,
    top: size * 0.28,
  };
  const bow: ViewStyle = {
    position: 'absolute',
    top: size * 0.06,
    width: size * 0.22,
    height: size * 0.14,
    borderTopWidth: thickness,
    borderLeftWidth: thickness,
    borderRightWidth: thickness,
    borderColor: color,
    borderTopLeftRadius: size,
    borderTopRightRadius: size,
  };
  return (
    <Frame size={size}>
      <View style={box} />
      <View style={ribbonV} />
      <View style={ribbonH} />
      <View style={bow} />
    </Frame>
  );
}

function WalletGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const body: ViewStyle = {
    width: size * 0.78,
    height: size * 0.54,
    borderWidth: thickness,
    borderColor: color,
    borderRadius: size * 0.08,
  };
  const flap: ViewStyle = {
    position: 'absolute',
    right: size * 0.16,
    width: size * 0.18,
    height: size * 0.14,
    borderWidth: thickness,
    borderColor: color,
    borderRadius: 2,
  };
  return (
    <Frame size={size}>
      <View style={body} />
      <View style={flap} />
    </Frame>
  );
}

function ShopGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const roof: ViewStyle = {
    width: 0,
    height: 0,
    borderLeftWidth: size * 0.4,
    borderRightWidth: size * 0.4,
    borderBottomWidth: size * 0.2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: color,
  };
  const body: ViewStyle = {
    width: size * 0.66,
    height: size * 0.38,
    borderWidth: thickness,
    borderTopWidth: 0,
    borderColor: color,
    alignItems: 'center',
    justifyContent: 'flex-end',
  };
  const door: ViewStyle = {
    width: size * 0.2,
    height: size * 0.22,
    borderWidth: thickness,
    borderBottomWidth: 0,
    borderColor: color,
  };
  return (
    <Frame size={size} justify="flex-end">
      <View style={roof} />
      <View style={body}>
        <View style={door} />
      </View>
    </Frame>
  );
}

function LanguageGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const globe: ViewStyle = {
    width: size * 0.76,
    height: size * 0.76,
    borderRadius: size,
    borderWidth: thickness,
    borderColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const meridian: ViewStyle = {
    position: 'absolute',
    width: size * 0.32,
    height: size * 0.68,
    borderRadius: size,
    borderWidth: thickness,
    borderColor: color,
  };
  const equator: ViewStyle = {
    width: size * 0.68,
    height: thickness,
    backgroundColor: color,
    borderRadius: thickness,
  };
  return (
    <Frame size={size}>
      <View style={globe}>
        <View style={meridian} />
        <View style={equator} />
      </View>
    </Frame>
  );
}

function LogoutGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const door: ViewStyle = {
    width: size * 0.4,
    height: size * 0.66,
    borderWidth: thickness,
    borderRightWidth: 0,
    borderColor: color,
    marginRight: size * 0.08,
  };
  const shaft: ViewStyle = {
    width: size * 0.28,
    height: thickness,
    backgroundColor: color,
    borderRadius: thickness,
  };
  const head: ViewStyle = {
    width: size * 0.16,
    height: size * 0.16,
    borderTopWidth: thickness,
    borderRightWidth: thickness,
    borderColor: color,
    transform: [{ rotate: '45deg' }],
    marginLeft: -size * 0.08,
  };
  const row: ViewStyle = { flexDirection: 'row', alignItems: 'center' };
  return (
    <Frame size={size}>
      <View style={row}>
        <View style={door} />
        <View style={shaft} />
        <View style={head} />
      </View>
    </Frame>
  );
}

function ShareGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const tray: ViewStyle = {
    width: size * 0.58,
    height: size * 0.4,
    borderWidth: thickness,
    borderTopWidth: 0,
    borderColor: color,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginTop: size * 0.16,
  };
  const shaft: ViewStyle = {
    position: 'absolute',
    top: size * 0.1,
    width: thickness,
    height: size * 0.36,
    backgroundColor: color,
    borderRadius: thickness,
  };
  const head: ViewStyle = {
    position: 'absolute',
    top: size * 0.08,
    width: 0,
    height: 0,
    borderLeftWidth: size * 0.12,
    borderRightWidth: size * 0.12,
    borderBottomWidth: size * 0.14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: color,
  };
  return (
    <Frame size={size}>
      <View style={tray} />
      <View style={shaft} />
      <View style={head} />
    </Frame>
  );
}

function BubbleGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const bubble: ViewStyle = {
    width: size * 0.7,
    height: size * 0.56,
    borderRadius: size * 0.16,
    borderWidth: thickness,
    borderColor: color,
  };
  const tail: ViewStyle = {
    position: 'absolute',
    left: size * 0.16,
    bottom: size * 0.1,
    width: size * 0.16,
    height: size * 0.16,
    backgroundColor: color,
    transform: [{ rotate: '45deg' }],
  };
  return (
    <Frame size={size}>
      <View style={bubble} />
      <View style={tail} />
    </Frame>
  );
}

function CloseGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const bar = (angle: string): ViewStyle => ({
    position: 'absolute',
    width: size * 0.68,
    height: thickness,
    backgroundColor: color,
    borderRadius: thickness,
    transform: [{ rotate: angle }],
  });
  return (
    <Frame size={size}>
      <View style={bar('45deg')} />
      <View style={bar('-45deg')} />
    </Frame>
  );
}

function CheckGlyph({ color, size }: GlyphProps) {
  const thickness = strokeOf(size);
  const short: ViewStyle = {
    position: 'absolute',
    width: size * 0.28,
    height: thickness,
    backgroundColor: color,
    borderRadius: thickness,
    left: size * 0.14,
    top: size * 0.5,
    transform: [{ rotate: '42deg' }],
  };
  const long: ViewStyle = {
    position: 'absolute',
    width: size * 0.48,
    height: thickness,
    backgroundColor: color,
    borderRadius: thickness,
    left: size * 0.3,
    top: size * 0.44,
    transform: [{ rotate: '-48deg' }],
  };
  return (
    <Frame size={size}>
      <View style={short} />
      <View style={long} />
    </Frame>
  );
}

function PlusGlyph({ color, size, vertical }: GlyphProps & { vertical: boolean }) {
  const thickness = strokeOf(size);
  const bar: ViewStyle = {
    position: 'absolute',
    width: size * 0.62,
    height: thickness,
    backgroundColor: color,
    borderRadius: thickness,
  };
  const upright: ViewStyle = {
    position: 'absolute',
    width: thickness,
    height: size * 0.62,
    backgroundColor: color,
    borderRadius: thickness,
  };
  return (
    <Frame size={size}>
      <View style={bar} />
      {vertical ? <View style={upright} /> : null}
    </Frame>
  );
}

const glyphs: Record<IconName, (props: GlyphProps) => React.ReactElement> = {
  home: HomeGlyph,
  heart: props => <HeartGlyph {...props} filled={false} />,
  'heart-fill': props => <HeartGlyph {...props} filled />,
  search: SearchGlyph,
  orders: OrdersGlyph,
  user: UserGlyph,
  cart: CartGlyph,
  back: props => <ChevronGlyph {...props} left />,
  pin: PinGlyph,
  phone: PhoneGlyph,
  chevron: ChevronGlyph,
  star: StarGlyph,
  gift: GiftGlyph,
  wallet: WalletGlyph,
  shop: ShopGlyph,
  language: LanguageGlyph,
  logout: LogoutGlyph,
  share: ShareGlyph,
  whatsapp: BubbleGlyph,
  close: CloseGlyph,
  check: CheckGlyph,
  plus: props => <PlusGlyph {...props} vertical />,
  minus: props => <PlusGlyph {...props} vertical={false} />,
};

export function Icon({
  name,
  color = '#1C1C1C',
  size = 18,
  style,
}: {
  name: IconName;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const Glyph = glyphs[name];
  return (
    <View style={style}>
      <Glyph color={color} size={size} />
    </View>
  );
}
