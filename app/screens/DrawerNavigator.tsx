import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Share,
  Platform,
  TouchableOpacity,
} from 'react-native';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';

const isBeforeNoon = new Date().getHours() < 12;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home and Settings
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isBeforeNoon
              ? Colors.morning.headerBackground
              : Colors.evening.headerBackground,
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerBackTitleStyle: {
            fontSize: 16,
          },
          headerTitleStyle: {
            fontWeight: '500',
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isBeforeNoon
              ? Colors.morning.headerBackground
              : Colors.evening.headerBackground,
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerBackTitleStyle: {
            fontSize: 16,
          },
          headerTitleStyle: {
            fontWeight: '500',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  const iconColor = isBeforeNoon
    ? Colors.morning.drawerIcon
    : Colors.evening.drawerIcon;

  const handleReportBug = async () => {
    const deviceInfo = `
          Device Model: ${Device.modelName || 'Unknown'}
          OS: ${Device.osName || 'Unknown'} ${Device.osVersion || 'Unknown'}
          App Version: 1.0.0
        `;

    const subject = encodeURIComponent('M&E App Bug Report');
    const body = encodeURIComponent(
      `Please describe the issue you encountered and feel free to include screenshots:\n\n\n---\nDevice Info:\n${deviceInfo}`,
    );

    const email = `mailto:bugs@jarrodwhitley.com?subject=${subject}&body=${body}`;

    try {
      await Linking.openURL(email);
    } catch (error) {
      console.error('Failed to open email app:', error);
    }
  };
  const handleShareApp = async () => {
    const appStoreLink = 'https://apps.apple.com/app/idYOUR_APP_ID'; // Replace with your App Store link
    const playStoreLink =
      'https://play.google.com/store/apps/details?id=com.yourcompany.yourapp'; // Replace with your Play Store link

    const appLink = Platform.OS === 'ios' ? appStoreLink : playStoreLink;

    try {
      const result = await Share.share({
        message: `Check out this amazing app: ${appLink}`,
        title: 'Share M&E App',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>M&E</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItem
        label="About"
        icon={({ color, size }) => (
          <IconSymbol name="info.circle" size={size} color={iconColor} />
        )}
        onPress={() =>
          props.navigation.navigate('HomeStack', { screen: 'About' })
        }
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Settings"
        icon={({ color, size }) => (
          <IconSymbol name="gearshape" size={size} color={iconColor} />
        )}
        onPress={() =>
          props.navigation.navigate('HomeStack', { screen: 'Settings' })
        }
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Notifications"
        icon={({ color, size }) => (
          <IconSymbol name="bell" size={size} color={iconColor} />
        )}
        onPress={() => console.log('Navigate to Notifications')}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Share App"
        icon={({ color, size }) => (
          <IconSymbol
            name="square.and.arrow.up"
            size={size}
            color={iconColor}
          />
        )}
        onPress={handleShareApp}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Found a bug?"
        icon={({ color, size }) => (
          <IconSymbol name="ant" size={size} color={iconColor} />
        )}
        onPress={handleReportBug}
        labelStyle={styles.drawerItemLabel}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: isBeforeNoon
            ? Colors.morning.drawerBackground
            : Colors.evening.drawerBackground,
          width: 240,
        },
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  drawerHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    marginTop: 40,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});
