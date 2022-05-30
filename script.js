//All the querySelector calls are finding the first instance of the element that matches the selectors
//In this case, the variables are storing different sections of the HTML page

let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio'); //Used to create a new audio HTML media element called

let track_index = 0;
let isPlaying = false;
let isRandom = false; //determines if the shuffle button is on
let updateTimer;

//music_list is an array of objects that stores the different properties of each of the songs in the playlist, with things like song image, the artist, and the actual mp3 file
const music_list = [
    {
        img : './images/Charlie_Puth_Voicenotes.png',
        name : 'The Way I Am',
        artist : 'Charlie Puth',
        music : './music/The_Way_I_Am.mp3'
    },
    {
        img : './images/Catch_Me_If_You_Can.webp',
        name : 'High',
        artist : 'Adekunle Gold',
        music : 'music/High.mp3'
    },
    {
        img : './images/Limbo_by_Aminé.png',
        name : 'Woodlawn',
        artist : 'Aminé',
        music : 'music/Woodlawn.mp3'
    },
    {
        img : './images/Orange_Was_a_Place.jpg',
        name : 'Replay',
        artist : 'Tems',
        music : 'music/Replay.mp3'
    },

    {
        img : './images/Feelings.jpg',
        name : 'Feelings',
        artist : 'AWA ft JB Scofield',
        music : 'music/Feelings.mp3'
    },
    {
        img : './images/Bad_Vibe.jpg',
        name : 'Bad Vibe',
        artist : 'M.O x Lotto Boyzz x Mr Eazi',
        music : 'music/Bad_Vibe.mp3'
    },
    {
        img : './images/Venus.jpg',
        name : 'Solo',
        artist : 'Shakka ft. Goldlink',
        music : 'music/Solo.mp3'
    },    
    {
        img : './images/Lagos.webp',
        name : 'Ginger',
        artist : 'WizKid ft. BurnaBoy',
        music : 'music/Ginger.mp3'
    },
    {
        img : './images/Dangerous_Woman.png',
        name : 'Be Alright',
        artist : 'Ariana Grande',
        music : 'music/Be_Alright.mp3'
    },
    {
        img : './images/Attention.webp',
        name : 'Attention',
        artist : 'Omah Lay ft. Justin Bieber',
        music : 'music/Attention.mp3'
    },
    {
        img : './images/Venus.jpg',
        name : 'When You Pull Up',
        artist : 'Shakka',
        music : 'music/When_You_Pull_Up.mp3'
    },
    {
        img : './images/Godzilla.jpg',
        name : 'Godzilla',
        artist : 'Eminem ft. Juice WRLD',
        music : 'music/Godzilla.mp3'
    },
    

    
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer); //sets the timer of the slider back to 0, the start of the next song
    reset();

    curr_track.src = music_list[track_index].music; //sets the current track to be whatever the track index is at in the music list
   
    curr_track.load(); //sets the state of current back to its inital state

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")"; //sets the track's background image to the img property of the track in the music list

    //textContent change the the content of the specified element
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Chin's Playlist " + (track_index + 1) + " / " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000); //sets a delay in the timer to call the setUpdate function every 1000 milliseconds

    curr_track.addEventListener('ended', nextTrack); // the track ends it will call the nextTrack function to set up the next song
}

function reset(){
    curr_time.textContent = "00:00"; //sets timer to 0
    // total_duration.textContent = "00:40";
    seek_slider.value = 0; // places the slider to the beginning
}

function randomTrack(){ //determines if the shuffle button is on or off, pausing the random order if its off and plays songs in a random order if isRandom is true
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){ //sets the isRandom state to true
    isRandom = true;
}
function pauseRandom(){ //sets the isRandom state to true
    isRandom = false;
}
function repeatTrack(){ //repeats and plays the same track
    let current_index = track_index; // sets the track to a variable
    loadTrack(current_index); //rather than going to the next track, it just repeats the current song again
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate'); //adds a rotating property to the track's art
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate'); //removes rotate feature
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){ //if shuffle is off and index isn't at the end yet

        track_index += 1; //sets index to be the next song in the list
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length); //creates a random number ranging from the length of the music list and assigns that value to the track index
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){ //reduces the track number by 1, being the last song that was played
        track_index -= 1;
    }else{
        track_index = music_list.length -1; // if the user presses the prev button at the first song, then the index of the last track of the playlist will start playing
    }
    loadTrack(track_index); //plays the song at the specified index
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        // total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}