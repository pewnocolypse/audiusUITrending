from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Audius API Trending Endpoint
audiusTrendingURL = "https://discoveryprovider.audius.co/v1/tracks/trending"

def fetch_trending_tracks():
    """
    Fetch trending tracks and pull relevant fields
    """
    try:
        headers = {
            'Accept': 'application/json'
        }
        response = requests.get(audiusTrendingURL, headers=headers, timeout=10)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()

        # Fetch the data to pull required fields
        fetchTracks = []
        for track in data.get('data', []):
            fetchTrack = {
                "id": track.get('id') or "Undefined",
                "title": track.get('title') or "Undefined",
                "artwork": track.get('artwork') or "Undefined",
                "genre": track.get('genre') or "Undefined",
                "mood": track.get('mood') or "Undefined"
            }
            fetchTracks.append(fetchTrack)

        return fetchTracks

    except requests.exceptions.RequestException as e:
        print(f"Error fetching trending tracks: {e}")
        return []

@app.route('/api/trending', methods=['GET'])
def get_trending_tracks():
    tracks = fetch_trending_tracks()
    return jsonify({"tracks": tracks})

if __name__ == '__main__':
    app.run(debug=True)
