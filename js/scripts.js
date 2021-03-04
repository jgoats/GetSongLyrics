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
            AddListItem(queriedArtist , queriedSong); 
           }
        }
    function AddListItem (artist , song) {
        var counter = 0;
        var counterTwo = 0;
        const controller = new AbortController();
        var animation = window.setInterval(function () {
            var objectOne = document.getElementById("gearOne");
            var objectTwo = document.getElementById("gearTwo");
            console.log(counter);
            if (counter >= 2000) {
                window.clearInterval(animation);
                controller.abort();
                objectOne.style.opacity = "0";
                objectTwo.style.opacity = "0";
                eraseData();
                message.innerHTML = `Application timed out, make sure you spelled the artist
                 and song correctly and that you have a good internet connection`;
            }
            else {
            objectOne.style.opacity = "1";
            let value = `rotate(${counter++}deg)`;
            objectOne.style.transform = value;
            objectTwo.style.opacity = "1";
            let value2 = `rotate(${counterTwo--}deg)`;
            objectTwo.style.transform = value2;
            }
        } , 10);
        ApiUrl = 'https://api.lyrics.ovh/v1/' + `${artist.join("")}` + '/' + `${song.join("")}`;

        fetch(ApiUrl).then(function (response) {
            document.getElementById("gearOne").style.opacity = "0";
            document.getElementById("gearTwo").style.opacity = "0";
            window.clearInterval(animation);
            return response.json();
          }).then(function (json) {
              let container = document.createElement("div");
              container.setAttribute("class" , "song-container");
              document.getElementsByClassName("songList")[0].appendChild(container);
              let artistSong = document.createElement("p");
              artistSong.setAttribute("class" , "artist-song");
              artistSong.textContent = `${typedArtist.join("").toUpperCase()}` + " : " + `${typedSong.join("").toUpperCase()}`;
              container.append(artistSong);
              let lyrics = document.createElement("p");
              lyrics.setAttribute("class" , "lyrics");
              lyrics.textContent = json.lyrics;
              container.append(lyrics);
              lyricList.push(json.lyrics);
              let btn = document.createElement("button");
              btn.setAttribute("type" , "button");
              btn.setAttribute("class" , "btn btn-danger remove");
              btn.setAttribute("data-toggle" , "modal");
              btn.setAttribute("data-target" , "#Modal");
              btn.textContent = "Remove";
              container.append(btn);
              eraseData();
              btn.addEventListener("click" , function (e) {
                  let string = "Are You Sure You Want To Remove" + "<br>" + `<span class="highlight">${artistSong.textContent}</span>`;
                  document.getElementsByClassName("modal-title")[0].innerHTML = string;
                  document.getElementsByClassName("delete")[0].addEventListener("click" , function () {
                      let elm = e.target.parentNode
                      if (elm) {
                        while(elm.hasChildNodes()) {
                            elm.removeChild(elm.lastChild);
                            eraseData();
                        } 
                        if (!elm.hasChildNodes()) {
                            elm.parentNode.removeChild(elm);
                      }
                     
                    }
                } , true);
                
              } , false);
          }).catch(function (e) {
            
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