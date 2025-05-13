/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    // Dark mode in future update
    // text: '#ECEDEE',
    // background: '#151718',
    // tint: tintColorDark,
    // icon: '#9BA1A6',
    // tabIconDefault: '#9BA1A6',
    // tabIconSelected: tintColorDark,
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  morning: {
    primary: '#A1CEDC',
    drawerButton: '#68C6CB',
    drawerIcon: '#68C6CB',
    drawerButtonSelected: '#DCF8FA',
    drawerBackground: '#296C70',
    headerBackground: '#296C70',
    bodyBackground: '#1D3D47',
    bodyText: '#E4D7E5',
  },
  evening: {
    primary: '#1D3D47',
    drawerBackground: '#312252',
    drawerIcon: '#6C568E',
    drawerButton: '#423160',
    drawerButtonSelected: '#6C568E',
    headerBackground: '#312252',
    bodyBackground: '#231932',
    bodyText: '#D9D9D9',
  },
};
