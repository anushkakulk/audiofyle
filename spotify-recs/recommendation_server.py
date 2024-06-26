from flask import Flask, request, jsonify
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import numpy as np
from sklearn.neighbors import NearestNeighbors
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
import webbrowser

app = Flask(__name__)

class AuthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        code = self.path.split("?code=")[1]
        sp_oauth = self.server.sp_oauth
        token_info = sp_oauth.get_access_token(code)
        self.server.token_info = token_info

        self.wfile.write(
            b'Authentication successful. You can close this window.')

def start_local_server(server, handler):
    server.serve_forever()

@app.route('/auth-url', methods=['POST'])
def get_auth_url():
    data = request.json
    client_id = data.get('client_id')
    client_secret = data.get('client_secret')
    
    if not client_id or not client_secret:
        return jsonify({'error': 'client_id and client_secret are required'}), 400

    sp_oauth = SpotifyOAuth(client_id=client_id, client_secret=client_secret,
                            redirect_uri='http://localhost:5000/callback', scope='user-library-read')
    
    auth_url = sp_oauth.get_authorize_url()

    # Store the OAuth object in the server object for later use
    server = HTTPServer(('localhost', 5000), AuthHandler)
    server.sp_oauth = sp_oauth
    server_thread = threading.Thread(target=start_local_server, args=(server, AuthHandler))
    server_thread.start()

    return jsonify({'auth_url': auth_url})

if __name__ == '__main__':
    app.run(debug=True)


def get_recommendations(user_preferences):
    # auth with spotify
    sp = authenticate()

    # get liked tracks
    liked_tracks = sp.current_user_saved_tracks()

    # get features
    track_features = []
    for track in liked_tracks['items']:
        track_id = track['track']['id']
        features = sp.audio_features(tracks=[track_id])[0]
        track_features.append(
            [features['danceability'], features['energy'], features['acousticness']])

    track_features = np.array(track_features)

    # k nearest neighbors
    knn_model = NearestNeighbors(n_neighbors=5, metric='euclidean')
    knn_model.fit(track_features)

    # get recommended tracks
    distances, indices = knn_model.kneighbors(user_preferences)

    recommended_tracks = []
    for index in indices.flatten():
        recommended_tracks.append(liked_tracks['items'][index]['track']['name'])

    return recommended_tracks

@app.route('/recommend', methods=['POST'])
def recommend():
    # extract user preferences from the request
    data = request.json
    user_preferences = np.array([[data['danceability'], data['energy'], data['acousticness']]])

    # get recommendations
    recommendations = get_recommendations(user_preferences)

    # return JSON 
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
