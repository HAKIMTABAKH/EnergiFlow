const API_BASE_URL = 'http://192.168.35.222:5000';

export async function fetchSensorData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sensor-data`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch sensor data:', error);
    throw error;
  }
}