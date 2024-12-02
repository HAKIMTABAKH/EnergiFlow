import pymongo
import pandas as pd
import requests
import datetime
import sys

# Step 1: Extract Sensor Data from MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["energyDB"]  # Replace with your database name
collection = db["sensordatas"]  # Replace with your collection name

sensor_data = list(collection.find({}, {"_id": 0}))  # Exclude '_id' field
if not sensor_data:
    raise ValueError("No sensor data found in the MongoDB collection.")

sensor_df = pd.DataFrame(sensor_data)

# Preprocess Sensor Data
sensor_df['timestamp'] = pd.to_datetime(sensor_df['timestamp'])  # Convert to datetime
sensor_df.sort_values(by="timestamp", inplace=True)  # Sort by timestamp
sensor_df.ffill(inplace=True)  # Handle missing values

# Step 2: Fetch Current Weather Data
def fetch_current_weather(lat, lon, api_key):
    url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": api_key,
        "units": "metric"
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        return {
            "timestamp": pd.to_datetime(datetime.datetime.now()),
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "solar_irradiance": data.get("uvi", 0)  # UV index as solar irradiance
        }
    else:
        raise ValueError(f"Error fetching weather data: {response.status_code}, {response.text}")

# API Key and Parameters
api_key = "5532800e700d31dd3ac7677ff99cb3ed"  # Ensure this is a valid key
lat, lon = 33.88819437497484, 10.09073492232687  # Example location

# Fetch current weather data
try:
    weather_data = fetch_current_weather(lat, lon, api_key)
    weather_df = pd.DataFrame([weather_data])
    print("Weather data fetched successfully:", weather_data)
except ValueError as e:
    print(f"Error: {e}")
    sys.exit()

# Step 3: Merge Sensor and Weather Data
if not weather_df.empty and not sensor_df.empty:
    # Use the latest available weather data for each sensor reading
    # Fill missing weather data for all sensor timestamps
    weather_df.set_index('timestamp', inplace=True)
    weather_df = weather_df.reindex(sensor_df['timestamp'], method='ffill')  # Forward-fill the weather data

    # Merge the sensor data and weather data
    merged_df = pd.concat([sensor_df, weather_df], axis=1)
    merged_df.ffill(inplace=True)  # Fill missing values in the merged DataFrame

    # Save to CSV (optional)
    merged_df.to_csv("merged_data.csv", index=False)

    # Display Merged Data
    print(merged_df.head())
else:
    print("Sensor or weather data is empty. Cannot merge.")
