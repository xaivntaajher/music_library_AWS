from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_restful import Api, Resource
from marshmallow import post_load, ValidationError, fields
from dotenv import load_dotenv
from os import environ
from datetime import time, timedelta, datetime

load_dotenv()

# Create App instance
app = Flask(__name__)

# Add DB URI from .env
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')

# Registering App w/ Services
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
CORS(app)
Migrate(app, db)

# Models
class Song(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist = db.Column(db.String(255), nullable=False)
    album = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date)
    genre = db.Column(db.String(255), nullable=False)
    running_time = db.Column(db.Integer())


# Schemas
class SongSchema(ma.Schema):
    id = fields.Integer(primary_key=True), 
    title = fields.String(),
    artist = fields.String(),
    album = fields.String(),
    release_date = fields.Date(),
    genre = fields.String(),
    running_time = fields.Integer()
    class Meta:
        fields = ("id", "title", "artist", "album", "release_date", "genre", "running_time")

    @post_load
    def create_song(self, data, **kwargs):
        return Song(**data)

song_schema = SongSchema()
songs_schema = SongSchema(many=True)

# Resources
class SongListResource(Resource):
    """
    /api/songs
    """
    def get(self):
        custom_response = {} 
        songs = Song.query.all()
        custom_response['songs'] = songs_schema.dump(songs)
        total_time = 0
        for song in songs:
            total_time += song.running_time
        custom_response['total_running_time'] = round(total_time / 60, 2)
        return custom_response
        

    def post(self):
        form_data = request.get_json()
        try:
            new_song = song_schema.load(form_data)
            db.session.add(new_song)
            db.session.commit()
            return song_schema.dump(new_song), 201
        except ValidationError as err:
            return err.messages, 400

class SongResource(Resource):
    """
    /api/songs/<int:song_id>
    """
    def get(self, song_id):
        song = Song.query.get_or_404(song_id)
        return song_schema.dump(song)

    def put(self, song_id):
        song = Song.query.get_or_404(song_id)

        if 'title' in request.json:
            song.title = request.json['title']
        if 'artist' in request.json:
            song.artist = request.json['artist']
        if 'album' in request.json:
            song.album = request.json['album']
        if 'release_date' in request.json:
            song.release_date = request.json['release_date']
        if 'genre' in request.json:
            song.genre = request.json['genre']
        if 'running_time' in request.json:
            song.running_time = request.json['running_time']

        db.session.commit()
        return song_schema.dump(song)

    def delete(self, song_id):
        song = Song.query.get_or_404(song_id)
        db.session.delete(song)
        db.session.commit()
        return '', 204

# Creating routes
api.add_resource(SongListResource, '/api/songs')
api.add_resource(SongResource, '/api/songs/<int:song_id>')