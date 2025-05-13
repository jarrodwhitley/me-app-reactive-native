import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AboutScreen() {
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
        <ThemedText>
          Charles Haddon Spurgeon (1834-1892) was a British Baptist minister and
          renowned author who is considered one of the most influential figures
          in Christian history. Known as the &quot;Prince of Preachers,&quot;
          Spurgeon delivered powerful sermons that attracted thousands of people
          every week, filling London&apos;s Metropolitan Tabernacle to capacity.
          He was also a prolific writer, penning countless devotionals,
          commentaries, and sermons that continue to inspire and encourage
          readers today.
        </ThemedText>
        <ThemedText>
          &quot;Morning and Evening&quot; is a collection of daily devotionals
          that Spurgeon wrote to provide readers with a daily reminder of
          God&apos;s presence and grace. The devotionals are organized into
          morning and evening entries for each day of the year, offering
          timeless insights and encouragement that are still relevant to readers
          today.
        </ThemedText>
        <ThemedText>
          With its eloquent language and profound spiritual truths,
          &quot;Morning and Evening&quot; is a beloved classic in Christian
          literature that continues to inspire and uplift readers around the
          world.
        </ThemedText>
        <ThemedText>
          This work is in the public domain in the United States because it was
          published before January 1, 1923.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
