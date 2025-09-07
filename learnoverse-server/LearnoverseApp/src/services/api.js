export const fetchVideos = async () => {
  try {
    const response = await fetch('http://192.168.29.25:8050/api/videos'); // Updated port to 8050
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error('API returned an error: ' + JSON.stringify(data.error || 'Unknown error'));
    }
    return data.videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};
