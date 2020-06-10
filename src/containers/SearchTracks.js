import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SearchTracks.css";
import GenreBar from "../components/GenreBar";
import { AppContext } from "../libs/contextLib";
import MusicItem from '../components/MusicItem';
import MusicDatabase from '../libs/MuiscDatabase';


export default function Home() {

  /* useEffect hook*/
  useEffect(() => {
    loadHomeTracks();
  }, []);

  /* Hooks */
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [tracks, setTracks] = useState();




  /* Fetch default data from Deezer */
  async function loadHomeTracks() {
    let data = [];
    await MusicDatabase.searchPlayList(3220851222).then(response => data = response.tracks.data);
    setTracks(data)
    setLoading(false)
  }


  /* Return */
  return (
    <div className="Home">
      <AppContext.Provider value={{ tracks, setTracks, setLoading }}>
        < GenreBar />
      </AppContext.Provider>

      <div className="tracks-window">
        {!isLoading
          ?
          tracks.map(val => {
            return <MusicItem
              data={val}
            />
          })
          :
          <div className="spinner-container">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        }
      </div>
    </div>

  );
}



