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
              let artistSong = document.createElement("p");
              artistSong.setAttribute("class" , "artist-song");
              artistSong.textContent = `${typedArtist.join("")}` + " : " + `${typedSong.join("")}`;
              container.append(artistSong);
              let lyrics = document.createElement("p");
              lyrics.setAttribute("class" , "lyrics");
              lyrics.textContent = json.lyrics;
              container.append(lyrics);
              lyricList.push(json.lyrics);
              var deletebtn = document.createElement("img");
              deletebtn.setAttribute("class" , "icon");
              deletebtn.setAttribute("id" , "deletebtn");
              deletebtn.setAttribute("src" , "./images/remove.svg");
              container.append(deletebtn);
              deletebtn.addEventListener("click" , function (event) {
            document.getElementsByClassName("songList")[0].style.zIndex= "-1";
             var trashCan = document.createElement("img");
             trashCan.setAttribute("class" , "icon");
             trashCan.setAttribute("id" , "trash-icon");
             trashCan.setAttribute("src" , "./images/trash.svg");
             document.getElementsByClassName("modal-delete")[0].append(trashCan);
              var prompt = document.createElement("p");
              prompt.setAttribute("id" , "prompt");
              var textNode = `Are you sure you want to delete lyrics from ` + "<br>" +
              `${artistSong.innerHTML}` + " ?";  
              prompt.innerHTML = textNode.toUpperCase();
              document.getElementsByClassName("modal-delete")[0].append(prompt);
              var check = document.createElement("img");
             check.setAttribute("class" , "icon");
             check.setAttribute("id" , "check");
             check.setAttribute("src" , "./images/check.svg");
             document.getElementsByClassName("modal-delete")[0].append(check);
             var undo = document.createElement("img");
             undo.setAttribute("class" , "icon");
             undo.setAttribute("id" , "remove");
             undo.setAttribute("src" , "./images/remove.svg");
             document.getElementsByClassName("modal-delete")[0].append(undo);
                check.addEventListener("click" , function (e) {
                    // remove children from modal delete
                    let elm = e.target.parentNode;
                    while (elm.hasChildNodes()) {
                        elm.removeChild(elm.lastChild);
                      }
                    if (!elm.hasChildNodes()) {
                        eraseData();
                        document.getElementsByClassName("songList")[0].style.zIndex= "1";
                        let parent = event.target.parentNode.parentNode;
                        parent.removeChild(event.target.parentNode);       
                    }
                },false);
                undo.addEventListener("click" , function(e) {
                    let elm = e.target.parentNode;
                    while (elm.hasChildNodes()) {
                        elm.removeChild(elm.lastChild);
                      }
                      if (!elm.hasChildNodes()) {
                        eraseData();
                        document.getElementsByClassName("songList")[0].style.zIndex= "1";     
                    }
                },false);
                trashCan.addEventListener("click" , function (e) {
                    let elm = e.target.parentNode;
                    while (elm.hasChildNodes()) {
                        elm.removeChild(elm.lastChild);
                      }
                      if (!elm.hasChildNodes()) {
                        eraseData();
                        document.getElementsByClassName("songList")[0].style.zIndex= "1";     
                    }
                },false);
              },false);
              eraseData();
          }).catch(function (e) {
            message.innerHTML = (e); 
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
