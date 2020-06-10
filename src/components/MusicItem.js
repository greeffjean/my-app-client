import React, { useState, useEffect } from "react";
import './MusicItem.css';
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";


export default function MusicItem(props) {

  const [itemId, setItemId] = useState();
  const content = props.data;
  let [heartActive, setHeartActive] = useState(false)
  const {userTracks} = useAppContext();

  /*Check for any existing tracks in user;s playlist for UI styling*/
  useEffect(function() {
    if(!heartActive && userTracks) {
      userTracks.map(val => {
        if(val.content.id == content.id){
          setHeartActive(true)
          setItemId(val.trackId)
        }
      })
    }
  }, [userTracks])


   /*Create track data*/
  function createTrack(track) {
    return API.post("MyApp", "/MyApp", {
      body: track
    });
  }

   /*Submit track data*/
  async function handleSubmit(event) {
    event.preventDefault();
    if (!heartActive) {
      setHeartActive(true)
      try {
        const newTableItem = await createTrack({ content });
         setItemId(newTableItem.trackId)
      } catch (e) {
        return [{ error: e.message }];
      }
    }

      if (heartActive) {
        handleDelete()
      }
    
  }


   /*Del functions*/
  function deleteTrack() {
    return API.del("MyApp", `/MyApp/${itemId}`);
  }

  async function handleDelete() {

    const confirmed = window.confirm(
      "Are you sure you want to delete this track?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setHeartActive(false)
    try {
      await deleteTrack();
    } catch (e) {
      onError(e)
    }
  }






 /*Return*/
  return (
    <div className="item">
      <div className="item-left"><img src={`${props.data.album.cover_medium}`} /></div>
      <div className="item-right">
        <h2>{props.data.artist.name}</h2>
        <h3>{props.data.album.title} </h3>
        <i onClick={(e) => handleSubmit(e)} className={heartActive ? "fa fa-heart heart-active" : "fa fa-heart"}></i>
      </div>
    </div>
  );
}