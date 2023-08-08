import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json
import os
import time
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Authentication - without user
client_credentials_manager = SpotifyClientCredentials(
    client_id=os.getenv("client_key"), client_secret=os.getenv("secret_client_key")
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

playlist_link = "https://open.spotify.com/playlist/1KQuMpTcs2EcDkSZA4vJ63?si=0737e7b1b78444a0"
playlist_URI = playlist_link.split("/")[-1].split("?")[0]

def fetch_all_tracks(playlist_uri):
    offset = 0
    limit = 100  # Number of tracks to retrieve per request
    all_tracks = []
    total_tracks = None

    while total_tracks is None or offset < total_tracks:
        try:
            response = sp.playlist_tracks(playlist_uri, offset=offset, limit=limit)
            all_tracks.extend(response["items"])
            offset += limit
            if total_tracks is None:
                total_tracks = response["total"]
            time.sleep(0.1)  # Add a small delay to avoid rate-limiting issues (10 requests per second)

        except spotipy.exceptions.SpotifyException as e:
            if e.http_status == 429:
                # Rate limit exceeded, wait for a few seconds before retrying
                wait_time = int(e.headers["Retry-After"]) + 1
                print(f"Rate limit exceeded. Waiting for {wait_time} seconds...")
                time.sleep(wait_time)
                continue
            else:
                print(f"Error fetching data: {e}")
                break

    return all_tracks

all_tracks_data = fetch_all_tracks(playlist_URI)

sample_song_data = []
playlist_data_dict = {"Song and Artist Names": sample_song_data}

for track in all_tracks_data:
    try:
        # URI
        track_uri = track["track"]["uri"]

        # Track name
        track_name = track["track"]["name"]

        # Main Artist
        artist_name = track["track"]["artists"][0]["name"]

        # Track metadata
        track_data = sp.audio_features(track_uri)[0]

        playlist_data_dict[f"Song: {track_name} - By: {artist_name}"] = track_data
    except Exception as e:
        # If the track URI is invalid or audio features are not available, skip the track
        print(f"Error fetching data for track: {track_name}. Skipping...")

data_string = json.dumps(playlist_data_dict)
with open('songsData.json', 'w') as file:
    json.dump(data_string, file)

# I initially used this to get the code and later cleaned and formatted the data in other .py files but I was hitting max api calls limit.
# So because I was struggling to get more than 2000 songs data, I just downloaded a about 10,000 songs of data from Kaggle. 
# I did not delete this as a reference for ones who want to fetch spotify api data. 

############
# Below is the code I used to clean the data. 

# with open('./songsData.json', 'r') as json_file:
#    songData = json.loads(json.load(json_file))

# songs = pd.DataFrame() 
# songData.pop("Song and Artist Names") 
# # Delete descriptive "Song and Artist Names" value 
# for key,values in songData.items():
#     song_info = values 
#     song_info["Name"] = key 
#     songs = songs.append(song_info, ignore_index=True)


# songs.reset_index(inplace=True)
