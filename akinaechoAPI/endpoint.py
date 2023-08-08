import json
import os
import random
from datetime import datetime
import pytz
import pandas as pd
from handlerequest import get_closest_songs

selected_song = None
last_update_date = None

def select_random_song():
    global selected_song
    global last_update_date
    songs_dynamic = pd.read_csv(os.path.join(os.path.dirname(__file__), 'datasetUpdated.csv'))
    selected_song_index = random.randint(0, len(songs_dynamic) - 1)
    selected_song = songs_dynamic.iloc[selected_song_index]
    last_update_date = datetime.now(tz=pytz.timezone('US/Eastern')).date()


def fetch_data(fetchAgain):
    global selected_song
    global last_update_date
    today_date = datetime.now(tz=pytz.timezone('US/Eastern')).date()
    if today_date != last_update_date:
        select_random_song()
    if fetchAgain == True:
        select_random_song()

    songs_dynamic = pd.read_csv(os.path.join(os.path.dirname(__file__), 'datasetUpdated.csv'))
    songs_standard = pd.read_csv(os.path.join(os.path.dirname(__file__), 'dataset.csv'))

    result = get_closest_songs(selected_song["Track URI"])
    to_delete = result.iloc[[0,1]]

    indices_to_delete = to_delete["Track URI"]

    # Drop these rows
    songs_dynamic = songs_dynamic[~songs_dynamic['Track URI'].isin(indices_to_delete)]

    # Write the modified DataFrame to a new CSV file
    songs_dynamic.to_csv(os.path.join(os.path.dirname(__file__), 'datasetUpdated.csv'), index=False)
    return result
