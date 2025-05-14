import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  StyleSheet,
  Switch,
  Platform,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DailyTriggerInput,
  SchedulableTriggerInputTypes,
} from 'expo-notifications/src/Notifications.types';

export default function RemindersScreen() {
  const [morningEnabled, setMorningEnabled] = useState(false);
  const [eveningEnabled, setEveningEnabled] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.PermissionStatus>();

  const [morningTime, setMorningTime] = useState(
    new Date(new Date().setHours(7, 0, 0, 0)),
  );
  const [eveningTime, setEveningTime] = useState(
    new Date(new Date().setHours(19, 0, 0, 0)),
  );

  // Android
  const [showMorningPicker, setShowMorningPicker] = useState(false);
  const [showEveningPicker, setShowEveningPicker] = useState(false);

  // Configure notifications
  useEffect(() => {
    // Set up notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    // Load saved notification settings
    loadNotificationSettings();
  }, []);

  // Check notification permissions when the screen mounts
  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);

    // If notifications aren't enabled, show an alert
    if (status !== 'granted') {
      showNotificationAlert();
    }
  };

  const showNotificationAlert = () => {
    Alert.alert(
      'Notifications Disabled',
      'To receive devotional reminders, please enable notifications in Settings > Notifications > M&E',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: openSettings },
      ],
    );
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  // Load saved settings
  const loadNotificationSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('notificationSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setMorningEnabled(settings.morningEnabled || false);
        setEveningEnabled(settings.eveningEnabled || false);
        if (settings.morningTime)
          setMorningTime(new Date(settings.morningTime));
        if (settings.eveningTime)
          setEveningTime(new Date(settings.eveningTime));
      }
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  };

  // Save settings
  const saveNotificationSettings = async () => {
    try {
      await AsyncStorage.setItem(
        'notificationSettings',
        JSON.stringify({
          morningEnabled,
          eveningEnabled,
          morningTime: morningTime.toISOString(),
          eveningTime: eveningTime.toISOString(),
        }),
      );
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  };

  // Schedule the notification
  const scheduleNotification = async (
    type: 'morning' | 'evening',
    time: Date,
  ) => {
    // Cancel any existing notification of this type
    await cancelNotification(type);

    // Get the notification hour and minute
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // Create a trigger for daily notification at specific time
    const trigger: DailyTriggerInput = {
      type: SchedulableTriggerInputTypes.DAILY,
      hour: hours,
      minute: minutes,
    };

    // Schedule the notification
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: type === 'morning' ? 'Morning Devotional' : 'Evening Devotional',
        body: `It's time for your ${type} reading with Charles Spurgeon.`,
        sound: true,
      },
      trigger,
    });

    // Save the notification ID for later cancelation
    await AsyncStorage.setItem(`${type}NotificationId`, id);
    console.log(`${type} notification scheduled with ID:`, id);
  };

  // Cancel notification by type
  const cancelNotification = async (type: 'morning' | 'evening') => {
    try {
      const notificationId = await AsyncStorage.getItem(
        `${type}NotificationId`,
      );
      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        console.log(`${type} notification canceled`);
      }
    } catch (error) {
      console.error(`Failed to cancel ${type} notification:`, error);
    }
  };

  // Toggle notification state with permission check
  const toggleMorningEnabled = async (value: boolean) => {
    if (value && permissionStatus !== 'granted') {
      // Request permission if trying to enable
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissionStatus(status);

      if (status !== 'granted') {
        showNotificationAlert();
        return; // Don't enable if permission not granted
      }
    }
    setMorningEnabled(value);

    // Here you would schedule or cancel the morning notification
    if (value) {
      scheduleNotification('morning', morningTime);
    } else {
      cancelNotification('morning');
    }

    // Save settings
    saveNotificationSettings();
  };

  const toggleEveningEnabled = async (value: boolean) => {
    if (value && permissionStatus !== 'granted') {
      // Request permission if trying to enable
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissionStatus(status);

      if (status !== 'granted') {
        showNotificationAlert();
        return; // Don't enable if permission not granted
      }
    }
    setEveningEnabled(value);

    // Here you would schedule or cancel the evening notification
    if (value) {
      scheduleNotification('evening', eveningTime);
    } else {
      cancelNotification('evening');
    }

    // Save settings
    saveNotificationSettings();
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  // Handle time change
  const onMorningTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || morningTime;
    setShowMorningPicker(Platform.OS === 'ios');
    setMorningTime(currentTime);

    // Update the scheduled notification if enabled
    if (morningEnabled) {
      scheduleNotification('morning', currentTime);
    }

    // Save settings
    saveNotificationSettings();
  };

  const onEveningTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || eveningTime;
    setShowEveningPicker(Platform.OS === 'ios');
    setEveningTime(currentTime);

    // Update the scheduled notification if enabled
    if (eveningEnabled) {
      scheduleNotification('evening', currentTime);
    }

    // Save settings
    saveNotificationSettings();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.subtitle}>
        Set devotion notifications
      </ThemedText>

      {/* Morning Reminder Section */}
      <ThemedView style={styles.reminderSection}>
        <View style={styles.sectionHeader}>
          <IconSymbol
            name="sunrise"
            size={24}
            color={Colors.morning.primaryMedium}
            style={styles.icon}
          />
          <ThemedText style={styles.sectionTitle}>Morning Reading</ThemedText>
          <Switch
            value={morningEnabled}
            onValueChange={toggleMorningEnabled}
            trackColor={{ false: '#767577', true: Colors.morning.primaryDark }}
            thumbColor={
              morningEnabled ? Colors.morning.primaryLight : '#f4f3f4'
            }
          />
        </View>

        {morningEnabled && (
          <View style={styles.timePickerContainer}>
            <ThemedText>Remind me at:</ThemedText>
            {Platform.OS === 'android' ? (
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowMorningPicker(true)}
              >
                <ThemedText style={styles.timeText}>
                  {formatTime(morningTime)}
                </ThemedText>
              </TouchableOpacity>
            ) : (
              <DateTimePicker
                value={morningTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onMorningTimeChange}
                style={styles.iOSPicker}
              />
            )}
          </View>
        )}

        {showMorningPicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={morningTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onMorningTimeChange}
          />
        )}
      </ThemedView>

      {/* Evening reminder Section */}
      <ThemedView style={styles.reminderSection}>
        <View style={styles.sectionHeader}>
          <IconSymbol
            name="sunset"
            size={24}
            color="#312251"
            style={styles.icon}
          />
          <ThemedText style={styles.sectionTitle}>Evening Reading</ThemedText>
          <Switch
            value={eveningEnabled}
            onValueChange={toggleEveningEnabled}
            trackColor={{ false: '#767577', true: Colors.evening.primaryDark }}
            thumbColor={
              eveningEnabled ? Colors.evening.primaryLight : '#f4f3f4'
            }
          />
        </View>

        {eveningEnabled && (
          <View style={styles.timePickerContainer}>
            <ThemedText>Remind me at:</ThemedText>
            {Platform.OS === 'android' ? (
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowEveningPicker(true)}
              >
                <ThemedText style={styles.timeText}>
                  {formatTime(eveningTime)}
                </ThemedText>
              </TouchableOpacity>
            ) : (
              <DateTimePicker
                value={eveningTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onEveningTimeChange}
                style={styles.iOSPicker}
              />
            )}
          </View>
        )}

        {showEveningPicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={eveningTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onEveningTimeChange}
          />
        )}
      </ThemedView>

      {/* Permission Note */}

      {permissionStatus !== 'granted' && (
        <>
          <ThemedText style={styles.permissionNote}>
            You must enable notifications to receive reminders.
          </ThemedText>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={openSettings}
          >
            <ThemedText style={styles.settingsButtonText}>
              Open Settings
            </ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.8,
  },
  reminderSection: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  icon: {
    marginRight: 8,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  timeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iOSPicker: {
    width: 120,
  },
  helpText: {
    marginTop: 32,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  permissionNote: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.6,
    marginBottom: 16,
  },
  settingsButton: {
    backgroundColor: '#312251',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  settingsButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
