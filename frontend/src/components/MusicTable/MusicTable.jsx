import React from "react";
import "./MusicTable.css";
import EditSong from "../EditSong/EditSong";
import { useState, useEffect } from "react";
import axios from 'axios'

const MusicTable = (props) => {
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState()
  const [song, setSong] = useState([])

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  useEffect(() => {
    props.getAllSongs()
  }, [toggle, props.toggle])

  const handleEdit = (song) => {
    console.log("Editing song", song);
    setSong(song);
    showModal();
  }

  const calculateMinutes = (seconds) => {
    return seconds/60
  }

  if (props.songs !== [])
    return (
      <div>
        <table className="center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Running Time</th>
            </tr>
          </thead>
          <tbody>
            {props.songs.map((song) => {
              return (
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td>{song.genre}</td>
                  <td>{song.release_date}</td>
                  <td>{calculateMinutes(song.running_time).toFixed(2)}</td>
                  <td><button onClick={() => props.deleteSong(song.id)} type="submit">
                    Delete Song
                  </button></td>
                  <td><button type="button" onClick={() => handleEdit(song)}>
                    Edit Song
                  </button></td>
                </tr>
              );
            })}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><b>Total Time: {props.time}</b></td>
                  <td></td>
                  <td></td>
                </tr>
          </tbody>
        </table>
        {/* Proper location for modal display */}
        <EditSong show={show} handleClose={hideModal} props={song} editSong={props.editSong}>
          <p>Edit Song</p>
        </EditSong>
      </div>
    );
  else {
    return (
      <div>
        <h1>Loading Music, Please Wait</h1>
      </div>
    );
  }
};

export default MusicTable;
