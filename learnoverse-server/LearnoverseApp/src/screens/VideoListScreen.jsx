import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchVideos } from '../services/api';

const VideoListScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos()
      .then(data => setVideos(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading videos...</Text>
      </View>
    );
  }

  if (videos.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No videos available</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('VideoPlayer', { video: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.channel}>{item.channelTitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.videoId}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 10 },
  item: { flexDirection: 'row', marginBottom: 15 },
  thumbnail: { width: 120, height: 90 },
  details: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 16 },
  channel: { color: 'gray' },
});

export default VideoListScreen;
