let songs = [{
    "name": "Chosen",
    "genre": "Romantic",
    "singer": "Sidhu Moose Wala",
    "img": "img/chosen.jpg",
    "audio": "audio/chosen.mp3"
}, {
    "name": "Level",
    "genre": "HipHop",
    "singer": "Sidhu Moose Wala",
    "img": "img/level.jpg",
    "audio": "audio/level.mp3"
}, {
    "name": "That Girl",
    "genre": "Romantic",
    "singer": "Amrinder Gill",
    "img": "img/judaa.jpg",
    "audio": "audio/that girl.mp3"
}, {
    "name": "Tere Bina Na Guzara",
    "genre": "Romantic",
    "singer": "Josh Brar",
    "img": "img/tere_bina_na_guzara.jpg",
    "audio": "audio/tere bina na guzara.mp3"
}, {
    "name": "Dilawara",
    "genre": "Romantic",
    "singer": "Prophec",
    "img": "img/dilawara.jpg",
    "audio": "audio/dilawara.mp3"
}, {
    "name": "Titli",
    "genre": "Romantic",
    "singer": "Satinder Sartaaj",
    "img": "img/titli.jpg",
    "audio": "audio/Titli.mp3"
}, {
    "name": "8 asle",
    "genre": "HipHop",
    "singer": "Gurlez Akhtar, Sukha",
    "img": "img/asle.jpg",
    "audio": "audio/8 asle.mp3"
}];
let playlists = {};
let currentPlaylist = null;
let currentSongIndex = -1;
let isPlaying = false;
let updatedSongs = songs;

document.addEventListener("DOMContentLoaded", () => {
    renderSongs();
    document.getElementById("prevBtn").addEventListener("click", playPreviousSong);
    document.getElementById("nextBtn").addEventListener("click", playNextSong);
    document.getElementById("addToPlayList").addEventListener("click", addToPlayList);
    document.getElementById("createPlaylistBtn").addEventListener("click", createPlaylist);
    document.getElementById("searchPlaylist").addEventListener("input", searchPlaylist);
    document.getElementById("filterDropdown").addEventListener("change", filterBasedOnGenre);
    const toggleThemeSwitch = document.getElementById("toggleThemeSwitch");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        toggleThemeSwitch.classList.add('active');
    }

    // Toggle theme on switch click
    toggleThemeSwitch.addEventListener("click", toggleTheme);

});

function toggleTheme() {
    const toggleThemeSwitch = document.getElementById("toggleThemeSwitch");

    document.body.classList.toggle("dark-theme");
    toggleThemeSwitch.classList.toggle('active');

    // Save theme preference to localStorage
    if (toggleThemeSwitch.classList.contains('active')) {
        localStorage.setItem("theme", "dark-theme");
    } else {
        localStorage.removeItem("theme");
    }
}

function renderSongs() {
    const songList = document.getElementById("songList");
    songList.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("button");
        li.textContent = song.name;
        li.style.display = "block";
        li.style.backgroundColor = "#fff";
        li.style.borderRadius = "5%";
        li.style.margin = "10px";
        li.style.width = "75%";
        li.style.height = "5%";
        li.style.color = "black";
        li.addEventListener("click", () => playSong(index));
        songList.appendChild(li);
    });
}

function playSong(index, playlistSongs) {
    currentSongIndex = index;
    console.log(index);
    if(playlistSongs) {
        updatedSongs = playlistSongs;
    }
    let song = updatedSongs[index];
    
    let nowPlayingSongEl = document.getElementById("nowPlayingSong");
    nowPlayingSongEl.innerHTML = `
    <div style="width: 95%; height: 80%">
        <img style="width:200px; height: 170px; margin" class="card-img-top" src=${song.img} alt="Card image cap">
        <div class="card-body">
            <h3 class="card-title">${song.name}</h3>
            <p style="margin-top: -15px; font-size: 10px" class="card-text">${song.singer}</p>
        </div>
    </div>
    <audio style="margin-top: 5px" src="${song.audio}" controls>
    </audio>
    `;
    isPlaying = true;
}

function playNextSong() {
    console.log(updatedSongs);
    if (currentSongIndex < updatedSongs.length - 1) {
        playSong(currentSongIndex + 1);
    } else {
        currentSongIndex = 0;
        playSong(currentSongIndex);
    }
}

function playPreviousSong() {
    if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);
    } else {
        currentSongIndex = updatedSongs.length - 1;
        playSong(currentSongIndex);
    }
}

function filterBasedOnGenre() {
    const filterType = document.getElementById("filterDropdown").value;

    const songList = document.getElementById("songList");

    songList.innerHTML = "";
    if(filterType === "allsongs") {
        updatedSongs = [];
        songs.forEach((song, index) => {
            const li = document.createElement("button");
            li.textContent = song.name;
            li.style.display = "block";
            li.style.backgroundColor = "#fff";
            li.style.borderRadius = "5%";
            li.style.margin = "10px";
            li.style.width = "75%";
            li.style.height = "5%";
            li.addEventListener("click", () => playSong(index));
            songList.appendChild(li);
            updatedSongs.push(song);
        });
    } else {
        updatedSongs = [];
        newIndex = 0;
        songs.forEach((song, index) => {
            if(song.genre === filterType) {
                const li = document.createElement("button");
                li.textContent = song.name;
                li.style.display = "block";
                li.style.backgroundColor = "#fff";
                li.style.borderRadius = "5%";
                li.style.margin = "10px";
                li.style.width = "75%";
                li.style.height = "5%";
                const currIndex = newIndex;
                li.addEventListener("click", () => playSong(currIndex));
                songList.appendChild(li);
                updatedSongs.push(song);
                newIndex++;
            }      
              
        });
    }
    
}

// function togglePlayPause() {
//     if (isPlaying) {
//         isPlaying = false;
//         document.getElementById("nowPlayingSong").textContent = "Paused";
//     } else if (currentSongIndex !== -1) {
//         isPlaying = true;
//         document.getElementById("nowPlayingSong").textContent = `Playing: ${songs[currentSongIndex]}`;
//     }
// }

function createPlaylist() {
    console.log("Create Playlist")
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        renderPlaylists();
    } else {
        alert("Playlist already exists or name is invalid.");
    }
}

function renderPlaylists() {
    const playlistList = document.getElementById("playlistList");
    playlistList.innerHTML = "";
    active = false;
    Object.keys(playlists).forEach(playlistName => {
        const li = document.createElement("button");
        li.textContent = playlistName;
        li.style.display = "block";
        li.style.backgroundColor = "#fff";
        li.style.borderRadius = "5%";
        li.style.margin = "10px";
        li.style.width = "75%";
        li.style.height = "5%";
        li.style.hover = "5%";
        li.addEventListener("click", () => {
            li.style.backgroundColor = 'rgba(48, 0, 0, 0.676)';
            li.style.color = '#fff';
            active = !active;
            renderPlaylistSongs(playlistName, li)
        });
        playlistList.appendChild(li);
    });
}

function addToPlayList() {
    console.log(currentPlaylist);
    if(currentPlaylist === null || currentPlaylist === undefined) {
        alert("NO PLAYLIST SELECTED");
    } else {
        playlists[currentPlaylist].push(songs[currentSongIndex]);
        renderPlaylistSongs(currentPlaylist);
    }
    
}

function renderPlaylistSongs(playlistName, li) {
    currentPlaylist = playlistName;
    const songList = document.getElementById("playlistSongs");
    songList.innerHTML = "";
    playlistSongs = [];
    // console.log(playlists[playlistName]);
    // newIndex = 0;
    // li.style.backgroundColor = "#brown";
    playlists[playlistName].forEach((song, index) => {
        const li = document.createElement("button");
        li.style.display = "block";
        li.style.backgroundColor = "#fff";
        li.style.borderRadius = "5%";
        li.style.margin = "10px";
        li.style.width = "75%";
        li.style.height = "5%";
        li.style.hover = "5%";
        li.textContent = song.name;
        // const currIndex = newIndex;
        li.addEventListener("click", () => playSong(index, playlistSongs));
        playlistSongs.push(song);
        songList.appendChild(li);
        // newIndex++
    });
    // updatedSongs = playlistSongs;
}

// function searchSong() {
//     const query = document.getElementById("searchSong").value.toLowerCase();
//     const filteredSongs = songs.filter(song => song.toLowerCase().includes(query));
//     renderFilteredSongs(filteredSongs);
// }

// function renderFilteredSongs(filteredSongs) {
//     const songList = document.getElementById("songList");
//     songList.innerHTML = "";
//     filteredSongs.forEach(song => {
//         const li = document.createElement("li");
//         li.textContent = song;
//         songList.appendChild(li);
//     });
// }

function searchPlaylist() {
    const query = document.getElementById("searchPlaylist").value.toLowerCase();
    const filteredPlaylists = Object.keys(playlists).filter(playlist => playlist.toLowerCase().includes(query));
    renderFilteredPlaylists(filteredPlaylists);
}

function renderFilteredPlaylists(filteredPlaylists) {
    const playlistList = document.getElementById("playlistList");
    playlistList.innerHTML = "";
    filteredPlaylists.forEach(playlist => {
        const li = document.createElement("button");
        li.style.display = "block";
        li.style.backgroundColor = "#fff";
        li.style.borderRadius = "5%";
        li.style.margin = "10px";
        li.style.width = "75%";
        li.style.height = "5%";
        li.style.hover = "5%";
        li.textContent = playlist;
        li.addEventListener("click", () => renderPlaylistSongs(playlist));
        playlistList.appendChild(li);
    });
}

function removeSongFromPlaylist(playlistName, songIndex) {
    if (playlists[playlistName]) {
        playlists[playlistName].splice(songIndex, 1);
        renderPlaylistSongs(playlistName);
    }
}
