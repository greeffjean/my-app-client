

/* FETCH FUNCTIONS */
const MusicDatabase = {


/* Search Playlist */
searchPlayList(id){
    return fetch(`https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "bfc9cb153bmsh393eabf1bccbe91p1e3a3fjsn0e373ab683ce"
        }
    }).then(response => {
        return response.json();
    })
}
}

export default MusicDatabase;







