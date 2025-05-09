import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

function MenuScreen() {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuText}>Menu Item 1</Text>
      <Text style={styles.menuText}>Menu Item 2</Text>
      <Text style={styles.menuText}>Menu Item 3</Text>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#312251',
          width: 240,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Menu" component={MenuScreen} /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312251',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
});
