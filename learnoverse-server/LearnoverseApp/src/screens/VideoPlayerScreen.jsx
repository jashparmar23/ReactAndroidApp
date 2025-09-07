import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Linking } from 'react-native';

const VideoPlayerScreen = ({ route }) => {
  const { video } = route.params || {};
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`;

  const openYouTube = async () => {
    try {
      await Linking.openURL(youtubeUrl);
    } catch (e) {
      Alert.alert("Alert", "Could not open the YouTube URL.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Now Playing: {video?.title || 'No video selected'}
      </Text>
      <Button title="Open in YouTube App" onPress={openYouTube} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center', paddingHorizontal: 15 },
});

export default VideoPlayerScreen;
