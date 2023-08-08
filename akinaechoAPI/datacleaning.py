import pandas as pd 

data = pd.read_csv("dataset.csv")

print(data.head())
print(data.columns)
print(data.size)

data = data[~data['Track URI'].duplicated()]
data = data[~data['Track Name'].duplicated()]
data.drop(columns=["Copyrights",'Label','Album Artist URI(s)','Album Name','Artist URI(s)','Album Artist Name(s)','Album Release Date', 'Album Image URL',
       'Disc Number', 'Track Number', 'Track Duration (ms)',
       "ISRC","Added By", "Added At","Artist Genres","Album Genres"], axis=1, inplace=True)
data = data.dropna()

print(data.columns)
print(data.size)
data.to_csv("dataset.csv", index=False)
