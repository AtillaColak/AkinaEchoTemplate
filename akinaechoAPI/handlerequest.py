import joblib
import os
import pandas as pd
from sklearn.preprocessing import StandardScaler

def fetch_model():
    try:
        knn_model = joblib.load(os.path.join(os.path.dirname(__file__), 'knn_model.pkl'))
        return knn_model
    except FileNotFoundError:
        # If the model file doesn't exist (e.g., during the first run), return None
        return None

def get_closest_songs(song_id):
    song = pd.read_csv(os.path.join(os.path.dirname(__file__), 'dataset.csv'))
    numerical_columns = ['Danceability', 'Acousticness', "Energy", "Instrumentalness", "Liveness", "Loudness", "Tempo", "Valence"]
    # load the model
    knn = fetch_model()

    # Fetch the details for the song with the provided ID
    input_song = song.loc[song['Track URI'] == song_id, numerical_columns]

    # Scale the input song using the same scaler used during training
    scaler = StandardScaler()
    scaled_df = scaler.fit_transform(song[numerical_columns])
    input_song_scaled = scaler.transform(input_song)

    # Find k nearest songs
    distances, indices = knn.kneighbors(input_song_scaled)

    # Create a DataFrame to store the closest songs
    closest_songs_sorted = pd.DataFrame()

    for i in range(0, len(indices[0])):
        # Get the details of the i-th closest song
        closest_song = song.iloc[indices[0][i]]

        # Append the details to the DataFrame
        closest_songs_sorted = closest_songs_sorted.append(closest_song)

    return closest_songs_sorted
