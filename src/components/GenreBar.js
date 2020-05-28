import React from 'react';
import './GenreBar.css';
import MusicDatabase from '../libs/MuiscDatabase';
import { useAppContext } from "../libs/contextLib";

export default function GenreBar() {

    const { setTracks } = useAppContext();
    const { setLoading } = useAppContext();

    let data = [];

    async function searchPlayList(param) {
        setLoading(true)
        await MusicDatabase.searchPlayList(param).then(response => data = response.tracks.data);
        setTracks(data)
        setLoading(false)
    }


    return (
        <div className="genre-bar">
            <a onClick={(e) => searchPlayList(3220851222)} className="items  border-right">Brazilian</a>
            <a onClick={(e) => searchPlayList(1615514485)} className="items  border-right">Jazz</a>
            <a onClick={(e) => searchPlayList(735488796)} className="items  border-right">Indie</a>
            <a onClick={(e) => searchPlayList(1767932902)} className="items  border-right">Blues</a>
            <a onClick={(e) => searchPlayList(4485213484)} className="items  border-right">Soul</a>
            <a onClick={(e) => searchPlayList(2113355604)} className="items ">Dance</a>
            <a onClick={(e) => searchPlayList(3801761042)} className="items  border-left">Pop</a>
        </div>
    );
}
