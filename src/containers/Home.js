import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import "./Home.css";
import bin from "./bin.png"



export default function Home() {
  const id = useParams();
  const [tracks, setTracks] = useState([]);
  const { isAuthenticated } = useAppContext();
  const {userTracks, setUserTracks } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const tracks = await loadTracks();
        setIsLoading(false)
        setTracks(tracks);
        setUserTracks(tracks);
        console.log(tracks)
      } catch (e) {
        onError(e);
        setIsLoading(false)
      }
    }

    onLoad();
  }, [isAuthenticated]);


  function loadTracks() {
    return API.get("MyApp", "/MyApp");
  }


  async function handleDelete(event, id) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this track?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteNote(id);
      window.location.reload();
    } catch (e) {
      onError(e)
    }
  }

  function deleteNote(id) {
    return API.del("MyApp", `/MyApp/${id}`);
  }



  function renderTrackList(tracks) {
    let trackList = [];
    console.log(tracks)
    tracks.map(val => {
      trackList.push(
        <div className="track" style={{position: "relative"}}>
          <a onClick={(e) => handleDelete(e, val.trackId)} style={{fontSize: 1.6 + "rem", color: "hsl(0, 0%, 67%)", marginLeft: 30 + "px", cursor: "pointer", position: "absolute", top: 0, right: 0, padding: 2 + "rem"}}>remove</a>
          <div className="left"><img style={{height: 100 + "px", width: 100 + "px"}} src={`${val.content.album.cover_medium}`}></img></div>
          <div className="right"><p  style={{fontSize: 3 + "rem", color: "hsl(0, 0%, 67%)", marginBottom: 0}}>{val.content.artist.name}</p>
          <div style={{display: "flex", alignItems: "baseline"}}><h4 style={{fontSize: 2 + "rem", color: "hsl(0, 0%, 46%)", marginTop: 0, fontFamily: "Verdana"}}>{val.content.album.title}</h4>
          </div> 
           </div>
        </div>
      )
    })

    return trackList;
  }

  function renderLoader() {
    return (
      <div className="spinner-container">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
    );
  }

  function renderTracks() {
    return (
      <div className="tracks">
        <PageHeader ><h1 style={{color: "hsl(0, 0%, 30%)", fontSize: 4 + "rem", fontFamily: 'Verdana'}}>Your Tracks</h1></PageHeader>
        <Link style={{color: "hsl(0, 0%, 69%)", fontSize: 2 + "rem"}} to={"/search-tracks"}>Add +</Link>
        <ListGroup>
          {isAuthenticated && renderTrackList(tracks)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {!isLoading ? renderTracks() : renderLoader()}
    </div>
  );
}