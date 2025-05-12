import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const iconColor = isBeforeNoon
    ? Colors.morning.drawerIcon
    : Colors.evening.drawerIcon;
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
        onPress={() => console.log('Navigate to About')}
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
        onPress={() => console.log('Navigate to Share App')}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Buy me a coffee"
        icon={({ color, size }) => (
          <IconSymbol name="cup.and.saucer" size={size} color={iconColor} />
        )}
        onPress={() => console.log('Navigate to Buy me a coffee')}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Found a bug?"
        icon={({ color, size }) => (
          <IconSymbol name="ant" size={size} color={iconColor} />
        )}
        onPress={() => console.log('Navigate to Found a bug')}
        labelStyle={styles.drawerItemLabel}
      />
    </DrawerContentScrollView>
  );
}

// Utility function to check if the current time is before noon
const isBeforeNoon = new Date().getHours() < 12;

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
      <Drawer.Screen name="Home" component={HomeScreen} />
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
