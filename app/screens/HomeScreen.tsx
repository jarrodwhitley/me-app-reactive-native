import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import contentData from '@/assets/data/content.json';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { SelectedContent } from '@/types/index';
import { RootDrawerParamList } from '@/types/navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
const MorningImage = require('@/assets/images/morning_bg.png');
const EveningImage = require('@/assets/images/evening_bg.png');

export default function HomeScreen() {
  const [selectedDevotional, setSelectedDevotional] =
    useState<SelectedContent | null>(null);
  const [isBeforeNoon, setIsBeforeNoon] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  function selectDevotional() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    setIsBeforeNoon(
      currentHour < 12 || (currentHour === 12 && currentMinute === 0),
    );

    const todaysDevo = contentData.find(
      (devotional) => devotional.month == month && devotional.day == day,
    );

    if (!todaysDevo) {
      return;
    }
    if (isBeforeNoon) {
      setSelectedDevotional({
        keyverse: todaysDevo['keyverse_morning'],
        body: todaysDevo['body_morning'],
        title: todaysDevo.title,
      });
    } else {
      setSelectedDevotional({
        keyverse: todaysDevo['keyverse_evening'],
        body: todaysDevo['body_evening'],
        title: todaysDevo.title,
      });
    }
  }

  useEffect(() => {
    selectDevotional();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Fixed Menu Button */}
      <TouchableOpacity
        style={styles.fixedMenuButton}
        onPress={() => navigation.openDrawer()}
      >
        <IconSymbol size={28} name="line.horizontal.3" color={'#ffffff'} />
      </TouchableOpacity>

      {/* Scrollable Content */}
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            opacity: headerOpacity,
            backgroundColor: isBeforeNoon
              ? Colors.morning.primaryMedium
              : Colors.evening.primaryDark,
          },
        ]}
      >
        {/* Header Text */}
        {selectedDevotional && (
          <ThemedText type="title" style={styles.stickyHeaderText}>
            {selectedDevotional.title}
          </ThemedText>
        )}
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {selectedDevotional && (
          <ParallaxScrollView
            headerBackgroundColor={{
              light: Colors.morning.primaryMedium,
              dark: Colors.evening.primaryDark,
            }}
            headerImage={
              <ThemedView style={styles.headerContainer}>
                <Image
                  source={isBeforeNoon ? MorningImage : EveningImage}
                  style={styles.headerImage}
                />
                <ThemedText
                  type="title"
                  style={[
                    styles.keyverseText,
                    {
                      fontSize:
                        selectedDevotional?.keyverse.length > 300 ? 16 : 18,
                    },
                  ]}
                >
                  {selectedDevotional ? selectedDevotional.keyverse : ''}
                </ThemedText>
              </ThemedView>
            }
          >
            <ThemedView style={styles.contentContainer}>
              <ThemedText type="title" style={styles.devotionalTitle}>
                {selectedDevotional.title}
              </ThemedText>
              <ThemedText style={[styles.devoBody]}>
                {selectedDevotional
                  ? selectedDevotional.body
                  : 'Loading devotional content...'}
              </ThemedText>
            </ThemedView>
          </ParallaxScrollView>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingTop: 20,
  },
  menuButton: {
    position: 'absolute',
    bottom: 515,
    left: 16,
  },
  fixedMenuButton: {
    position: 'absolute',
    top: 57,
    left: 16,
    zIndex: 20,
  },
  stickyHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1CEDC',
    height: 200,
    position: 'relative',
  },
  headerImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  keyverseText: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    lineHeight: 18,
  },
  contentContainer: {
    paddingTop: 10,
    paddingHorizontal: 32,
  },
  devotionalTitle: {
    fontSize: 24,
    fontWeight: 500,
    textAlign: 'center',
  },
  devoBody: {
    fontSize: 16,
    padding: 0,
    marginTop: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#000',
  },
});
