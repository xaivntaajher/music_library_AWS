import React, { useState } from "react";
import MusicTable from "./MusicTable/MusicTable";
import SongForm from "./SongForm/SongForm";
import SearchBar from "./SearchBar/SearchBar";
import "./App.css";
import axios from "axios";

const App = (props) => {
  const [songs, setSongs] = useState([]);
  const [toggle, setToggle] = useState();
  const [time, setTime] = useState();

  const IP_ADDRESS = "3.136.83.95"

  const BASE_URL = `http://${IP_ADDRESS}:8000`

  const filterSongs = (e) => {
    let filterValue = e.target.value;
    if (filterValue === "") {
      getAllSongs();
    } else {
     let filteredSongs = songs.filter(
        (song) =>
        song.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        song.artist.toLowerCase().includes(filterValue.toLowerCase()) ||
        song.album.toLowerCase().includes(filterValue.toLowerCase()) ||
        song.genre.toLowerCase().includes(filterValue.toLowerCase())
      );
      setSongs(filteredSongs);
   }
  };


  const getAllSongs = async() =>{
    let response = await axios.get(`${BASE_URL}/api/songs`);
    setSongs(response.data.songs);
    setTime(response.data.total_running_time);
  }

  const deleteSong = async (key) => {
    await axios.delete(`${BASE_URL}/api/songs/${key}`)
    setToggle(!toggle)
  }

  const addSong = async(newSong) => {
    await axios.post(`${BASE_URL}/api/songs`, newSong)
    setToggle(!toggle);
  }

  const editSong = async(id, updatedSong) => {
    await axios.put(`${BASE_URL}/api/songs/${id}`, updatedSong)
  }

  const getSongs = (songs) => {
    setSongs(songs);
  };


  return (
    <div className="main">
      <h1> Music Library </h1>
      <SongForm getSongs={getSongs} addSong={addSong} />
      <p/>
      <SearchBar filterSongs={filterSongs} />
      <MusicTable toggle={toggle} songs={songs} getAllSongs={getAllSongs} filterSongs={filterSongs} time={time} deleteSong={deleteSong} editSong={editSong}/>
    </div>
  );
};
export default App;
