import React, {useState, useEffect} from "react";
import "./Home.css";
import GenreBar from "../components/GenreBar";
import { AppContext } from "../libs/contextLib";
import MusicItem from '../components/MusicItem';
import MusicDatabase from '../libs/MuiscDatabase';

export default function Home() {

  useEffect(() => {
    loadHomeTracks()
  }, []);

  async function loadHomeTracks() {
    let data = [];
    await MusicDatabase.searchPlayList(3220851222).then(response => data = response.tracks.data );
    setTracks(data)
    setLoading(false)
  }

 const [isLoading, setLoading]  = useState(true);
 const [tracks, setTracks]  = useState();



  return (
    <div className="Home">
      <AppContext.Provider value={{tracks, setTracks, setLoading}}>
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