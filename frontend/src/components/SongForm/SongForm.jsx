import React, {useState} from 'react';
import './SongForm.css'
import axios from "axios";

const SongForm = (props) => {
    const [title,setTitle] = useState('')
    const [artist,setArtist] = useState('')
    const [album,setAlbum] = useState('')
    const [genre,setGenre] = useState('')
    const [release_date,setReleaseDate] = useState('')
    const [running_time,setRunningTime] = useState('')

const handleSubmit = async(e) =>{
    e.preventDefault()
    let newSong = {
        title:title,
        artist:artist,
        album:album,
        genre: genre,
        release_date:release_date,
        running_time: running_time
    }
    await props.addSong(newSong)
}

        return ( 
            <div className="formDiv">
            <form onSubmit={handleSubmit}>
                <h1>Add a Song</h1>
                <label>Title</label>
                <input name="title" onChange={(e)=>setTitle(e.target.value)} />
                <label>Artist</label>
                <input name="artist" onChange={(e)=>setArtist(e.target.value)} />
                <label>Album</label>
                <input name="album" onChange={(e)=>setAlbum(e.target.value)} />
                <label>Genre</label>
                <input name="genre" onChange={(e)=>setGenre(e.target.value)} />
                <label>Release Date</label>
                <input type="date" name="release_date" onChange={(e)=>setReleaseDate(e.target.value)} />
                <label>Running Time</label>
                <input name="running_time" onChange={(e)=>setRunningTime(e.target.value)} />
                <button type="submit">Add Song</button>
            </form>
            </div>
         );
}
 
export default SongForm;
