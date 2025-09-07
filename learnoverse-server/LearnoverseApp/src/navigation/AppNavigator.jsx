import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VideoListScreen from '../screens/VideoListScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="VideoList"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FF0000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="VideoList"
      component={VideoListScreen}
      options={{ title: 'Learnoverse Videos' }}
    />
    <Stack.Screen
      name="VideoPlayer"
      component={VideoPlayerScreen}
      options={({ route }) => ({
        title: route.params?.video?.title?.substring(0, 30) + '...' || 'Video Player',
      })}
    />
  </Stack.Navigator>
);

export default AppNavigator;
