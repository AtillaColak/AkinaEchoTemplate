import requests
import json
from base64 import b64encode

def getSongSnippets(songs):

    # Client ID and client secret from your Spotify app
    client_id = 'CLIENT'
    client_secret = 'CLIENTSECRET'

    # Prepare the credentials
    credentials = b64encode(f'{client_id}:{client_secret}'.encode('utf-8')).decode('utf-8')

    # Set headers and payload
    headers = {
        'Authorization': f'Basic {credentials}',
    }
    data = {
        'grant_type': 'client_credentials',
    }

    # Request token
    response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)
    access_token = response.json().get('access_token')

    # Set headers for Spotify Web API request
    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    songSnippets = []

    # Loop through each track_id in your input data
    for song in songs:
        track_id = song["Track URI"].split(":")[-1]
        track_name = f"{song['Track Name']} By {song['Artist Name(s)']}"
        popularity = song["Popularity"]
        danceability = song["Danceability"]
        energy = song["Energy"]
        loudness = song["Loudness"]
        speechiness = song["Speechiness"]
        acousticness = song["Acousticness"]
        instrumentalness = song["Instrumentalness"]
        liveness = song["Liveness"]
        valence = song["Valence"]
        tempo = song["Tempo"]

        # Get track details from Spotify Web API
        response = requests.get(f'https://api.spotify.com/v1/tracks/{track_id}', headers=headers)
        track = response.json()

        # Get preview_url and append it
        preview_url = track.get('preview_url')
        songSnippets.append({
            'name': track_name,
            'preview_url': preview_url,
            "popularity": popularity,
            "danceabiltiy": danceability,
            "energy": energy,
            "loudness": loudness,
            "speechiness": speechiness,
            "acousticness": acousticness,
            "instrumentalness": instrumentalness,
            "liveness": liveness,
            "valence": valence,
            "tempo": tempo
        })

    return songSnippets
