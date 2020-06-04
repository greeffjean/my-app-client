import React, {useState} from "react";
import './MusicItem.css';
import { API } from "aws-amplify";

export default function MusicItem(props) {

  let [heartActive, setHeartActive] = useState(false)

 
  async function handleSubmit(event) {
    event.preventDefault();
    const track = props.data;

    if(!heartActive) {
    
      setHeartActive(true)
      try {
        await createTrack( {content} );
        console.log("success")
      } catch (e) {
        return [{ error: e.message }];
      }

      if(heartActive) {
        setHeartActive(false)
      }
     }
  }
  
  function createTrack() {
    return API.post("MyApp", "/MyApp", {
      body: props.data
    });
  }


  return (
<div className="item">
<div className="item-left"><img src={`${props.data.album.cover_medium}`} /></div>
<div className="item-right">
    <h2>{props.data.artist.name}</h2>
    <h3>{props.data.album.title} </h3>
    <i onClick={(e) => handleSubmit(e)} className={heartActive  ? "fa fa-heart heart-active" : "fa fa-heart"}></i>
</div>
</div>
    );
}