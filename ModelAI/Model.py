import requests
import pandas as pd
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask, request, jsonify


# --- Fetch Current Weather Data ---
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
            "timestamp": pd.to_datetime(datetime.now()),  # Current timestamp
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "solar_irradiance": data.get("uvi", 0)  # UV index as solar irradiance
        }
    else:
        raise ValueError(f"Error fetching weather data: {response.status_code}, {response.text}")


# --- Merge Sensor and Weather Data ---
def merge_data(sensor_df, weather_df):
    merged_df = pd.merge(sensor_df, weather_df, on="timestamp", how="left")
    return merged_df


# --- Train Model ---
def train_model(merged_df):
    X = merged_df.drop(['timestamp', 'voltage'], axis=1)  # Assuming 'voltage' is the target
    y = merged_df['voltage']
    
    # Split data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Normalize the data
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    # Train the model
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    
    # Calculate MSE
    from sklearn.metrics import mean_squared_error
    mse = mean_squared_error(y_test, y_pred)
    print(f'Mean Squared Error: {mse}')
    
    # Plot the predicted vs actual values
    plt.scatter(y_test, y_pred)
    plt.xlabel('Actual Voltage')
    plt.ylabel('Predicted Voltage')
    plt.title('Actual vs Predicted Voltage')
    plt.show()

    return model, scaler


# --- Main Execution ---
def main():
    # Example sensor data (replace with actual sensor data)
    sensor_data = [
        {'timestamp': '2024-12-01 13:00:00', 'voltage': 2.00, 'current': 0, 'temperature': 22.2, 'humidity': 55.4},
        {'timestamp': '2024-12-01 13:05:00', 'voltage': 1.98, 'current': 0, 'temperature': 21.9, 'humidity': 55.0},
        {'timestamp': '2024-12-01 13:10:00', 'voltage': 1.97, 'current': 0, 'temperature': 21.7, 'humidity': 54.8},
        # Add more data here
    ]
    
    sensor_df = pd.DataFrame(sensor_data)
    sensor_df['timestamp'] = pd.to_datetime(sensor_df['timestamp'])
    
    # Fetch current weather data
    api_key = 'your_openweathermap_api_key'  # Replace with your API key
    lat, lon = 33.88819437497484, 10.09073492232687  # Example location (Tunisia)
    
    try:
        weather_data = fetch_current_weather(lat, lon, api_key)
        weather_df = pd.DataFrame([weather_data])
        print("Weather data fetched successfully:", weather_data)
    except ValueError as e:
        print(f"Error: {e}")
        return  # Exit if weather data cannot be fetched
    
    # Merge sensor data with weather data
    merged_df = merge_data(sensor_df, weather_df)
    print(merged_df.head())
    
    # Train the model
    model, scaler = train_model(merged_df)
    
    # Now you can use the model for predictions with new data (in real time or batch)
    # For example, predicting the voltage for new data
    new_data = {'temperature': [22.5], 'humidity': [55.3], 'wind_speed': [1.2], 'solar_irradiance': [0]}
    new_df = pd.DataFrame(new_data)
    new_df_scaled = scaler.transform(new_df)
    
    prediction = model.predict(new_df_scaled)
    print(f"Predicted Voltage: {prediction[0]}")

if __name__ == "__main__":
    main()

# --- Flask API to Serve Predictions ---
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get the data from the request
    df = pd.DataFrame(data)    # Convert to DataFrame
    df_scaled = scaler.transform(df)  # Apply the same scaler used during training
    prediction = model.predict(df_scaled)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
