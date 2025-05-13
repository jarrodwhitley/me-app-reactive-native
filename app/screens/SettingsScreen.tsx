import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Content */}
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThemedText>Settings</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#312251',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 16,
    padding: 10,
    zIndex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 60,
  },
});
