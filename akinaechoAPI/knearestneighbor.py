import json
import joblib

import pandas as pd
import os
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

# Load your dataset
songs = pd.read_csv(os.path.join(os.path.dirname(__file__), 'dataset.csv'))

# Define numerical columns
numerical_columns = ['Danceability', 'Acousticness', "Energy", "Instrumentalness", "Liveness", "Loudness", "Tempo", "Valence"]

# Select those columns from your dataset
numerical_df = songs[numerical_columns]

# Feature scaling
scaler = StandardScaler()
scaled_df = scaler.fit_transform(numerical_df)

# Initialize the model
# The number of neighbors is 5 because we want to find the most similar 4 songs and the song itself is also considered a neighbor.
knn = NearestNeighbors(n_neighbors=5, algorithm='ball_tree')

# Train the model
knn.fit(scaled_df)

#distances, indices = knn.kneighbors(scaled_df[0].reshape(1, -1))

joblib.dump(knn, os.path.join(os.path.dirname(__file__), 'knn_model.pkl'))
