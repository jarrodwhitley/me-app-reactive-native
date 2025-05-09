import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs } from 'expo-router';
import { Share } from 'react-native';

export default function ShareScreen() {
  return (
    <Tabs.Screen
      name="share"
      options={{
        title: 'Share',
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="square.and.arrow.up.fill" color={color} />
        ),
        tabBarButton: (props) => (
          <HapticTab
            {...props}
            onPress={async () => {
              try {
                const result = await Share.share({
                  message: 'Check out this amazing app!',
                  url: 'https://example.com', // Optional: Add a URL to share
                  title: 'Amazing App',
                });

                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    console.log(
                      'Shared with activity type:',
                      result.activityType,
                    );
                  } else {
                    console.log('Shared successfully');
                  }
                } else if (result.action === Share.dismissedAction) {
                  console.log('Share dismissed');
                }
              } catch (error) {
                console.error('Error sharing:', error);
              }
            }}
          />
        ),
      }}
    />
  );
}
