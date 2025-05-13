import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
const SpurgeonIcon = require('@/assets/images/spurgeon_icon.png');

export default function AboutScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedView style={{ flex: 1, padding: 32 }}>
        {/* Heading with Spurgeon image */}
        <View style={styles.headerContainer}>
          <Image source={SpurgeonIcon} style={styles.icon} />
        </View>

        <ThemedText style={styles.title}>Morning & Evening</ThemedText>
        <ThemedText style={styles.subtitle}>
          By Charles Haddon Spurgeon
        </ThemedText>

        {/* Content paragraphs */}
        <ThemedText style={styles.paragraph}>
          {'    '}Charles Haddon Spurgeon (1834-1892) was a British Baptist
          minister and renowned author who is considered one of the most
          influential figures in Christian history. Known as the &quot;Prince of
          Preachers,&quot; Spurgeon delivered powerful sermons that attracted
          thousands of people every week, filling London&apos;s Metropolitan
          Tabernacle to capacity. He was also a prolific writer, penning
          countless devotionals, commentaries, and sermons that continue to
          inspire and encourage readers today.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          {'    '}&quot;Morning and Evening&quot; is a collection of daily
          devotionals that Spurgeon wrote to provide readers with a daily
          reminder of God&apos;s presence and grace. The devotionals are
          organized into morning and evening entries for each day of the year,
          offering timeless insights and encouragement that are still relevant
          to readers today.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          {'    '}With its eloquent language and profound spiritual truths,
          &quot;Morning and Evening&quot; is a beloved classic in Christian
          literature that continues to inspire and uplift readers around the
          world.
        </ThemedText>
        <ThemedText style={[styles.paragraph, { fontStyle: 'italic' }]}>
          This work is in the public domain in the United States because it was
          published before January 1, 1923.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 8,
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  paragraph: {
    marginTop: 16,
    lineHeight: 22,
  },
});
