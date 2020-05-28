import React, {useState} from "react";
import './MusicItem.css';

export default function MusicItem(props) {

  let [heartActive, setHeartActive] = useState(false)

  function heartFunction() {
   if(!heartActive) {
    setHeartActive(true)
    return
   }
    if(heartActive) {
      setHeartActive(false)
    }
  }


  return (
<div className="item">
<div className="item-left"><img src={`${props.data.album.cover_medium}`} /></div>
<div className="item-right">
    <h2>{props.data.artist.name}</h2>
    <h3>{props.data.album.title} </h3>
    <i onClick={heartFunction} className={heartActive  ? "fa fa-heart heart-active" : "fa fa-heart"}></i>
</div>
</div>
    );
}