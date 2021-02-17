songRepository = (function (){
    var message = document.getElementById("message");
    var lyricList = [];

    var userData = {
        artist : "",
        song : ""
    }
    var typedSong = [];
    var queriedSong = [];
   
    var typedArtist = [];
    var queriedArtist = [];

    function searchForSongArtist(event) {
        userData.artist = "";
        userData.artist = event.target.value;
    }
    function searchForSong(event) {
        userData.song = "";
        userData.song = event.target.value;
    }
    function eraseData () {
        typedSong = [];
        queriedSong = [];
        typedArtist = [];
        queriedArtist = [];
        userData.artist = "";
        userData.song = "";
        document.getElementById("searchforartist").value = "";
        document.getElementById("searchforsong").value = "";    
    }
    function validateInfo() {
        console.log(userData);
         if (userData.artist === "") {
            message.innerHTML = "Artist Search field Is Empty";
        }
        else if (userData.song == "") {
            message.innerHTML = "Song Search Field Is Empty";
        }
        else {
           message.innerHTML = "";
           for (i = 0; i < userData.artist.length; i++) {
               typedArtist.push(userData.artist[i]);
           }
           typedArtist.forEach(function (item) {
            if (item === " ") {
                item = "%20";
            }
            queriedArtist.push(item);
            
            
           });
           for (y = 0; y < userData.song.length; y++) {
            typedSong.push(userData.song[y]);
        }
        typedSong.forEach(function (item) {
         if (item === " ") {
             item = "%20";
         }
         queriedSong.push(item);
         
         
        });
              let artistSong = document.createElement("p");
              artistSong.setAttribute("class" , "artist-song");
              artistSong.textContent = `${typedArtist.join("")}` + " : " + `${typedSong.join("")}`;
              document.getElementsByClassName("songList")[0].append(artistSong);
        }
        AddListItem(queriedArtist , queriedSong);
}
    function AddListItem (artist , song) {
        ApiUrl = 'https://api.lyrics.ovh/v1/' + `${artist.join("")}` + '/' + `${song.join("")}`;

        fetch(ApiUrl).then(function (response) {
            return response.json();
          }).then(function (json) {
              let container = document.createElement("div");
              container.setAttribute("class" , "song-container");
              document.getElementsByClassName("songList")[0].appendChild(container);
              let lyrics = document.createElement("p");
              lyrics.setAttribute("class" , "lyrics");
              lyrics.textContent = json.lyrics;
              container.append(lyrics);
              lyricList.push(json.lyrics);
              var deletebtn = document.createElement("button");
              deletebtn.setAttribute("class" , "deletebtn");
              deletebtn.textContent = "X";
              container.append(deletebtn);
              eraseData();
          }).catch(function (e) {
            console.error(e);   
          });
    }
    
    return {
        searchForSongArtist : searchForSongArtist,
        searchForSong : searchForSong,
        validateInfo : validateInfo,
        eraseData : eraseData
    }
 
})();

document.getElementById("searchforartist")
.addEventListener("input" , (event)=> songRepository.searchForSongArtist(event) , false);
document.getElementById("searchforsong")
.addEventListener("input" , (event) => songRepository.searchForSong(event) , false);
document.getElementById("search-icon").addEventListener("click" , songRepository.validateInfo , false);

    
  

   