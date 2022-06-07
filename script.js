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


// let users = document.querySelectorAll('.listener');
let user1 = document.querySelector('#l1');
let user2 = document.querySelector('#l2');
let user3 = document.querySelector('#l3');

let person = 0;


function chooseUser(user){ //used to switch between the different users' playlists

    if(user.textContent === "Chin's Playlist"){
        person = 0;
    }else if(user.textContent === "Abuchi's Playlist"){
        person = 1;
    }else if(user.textContent === "Kasi's Playlist"){
        person = 2;
    }
}



//music_list is an array of objects that stores the different properties of each of the songs in the playlist, with things like song image, the artist, and the actual mp3 file

let people = [
    {
      name: 'Chin',
      music_list: [
      {
          img : './images/Chin/Charlie_Puth_Voicenotes.png',
          name : 'The Way I Am',
          artist : 'Charlie Puth',
          music : './music/Chin/The_Way_I_Am.mp3'
      },
      {
          img : './images/Chin/Catch_Me_If_You_Can.webp',
          name : 'High',
          artist : 'Adekunle Gold',
          music : './music/Chin/High.mp3'
      },
      {
          img : './images/Chin/Limbo_by_Aminé.png',
          name : 'Woodlawn',
          artist : 'Aminé',
          music : './music/Chin/Woodlawn.mp3'
      },
      {
          img : './images/Chin/Orange_Was_a_Place.jpg',
          name : 'Replay',
          artist : 'Tems',
          music : './music/Chin/Replay.mp3'
      },
  
      {
          img : './images/Chin/Feelings.jpg',
          name : 'Feelings',
          artist : 'AWA ft JB Scofield',
          music : './music/Chin/Feelings.mp3'
      },
      {
          img : './images/Chin/Bad_Vibe.jpg',
          name : 'Bad Vibe',
          artist : 'M.O x Lotto Boyzz x Mr Eazi',
          music : './music/Chin/Bad_Vibe.mp3'
      },
      {
          img : './images/Chin/Venus.jpg',
          name : 'Solo',
          artist : 'Shakka ft. Goldlink',
          music : './music/Chin/Solo.mp3'
      },    
      {
          img : './images/Chin/Lagos.webp',
          name : 'Ginger',
          artist : 'WizKid ft. BurnaBoy',
          music : './music/Chin/Ginger.mp3'
      },
      {
          img : './images/Chin/Dangerous_Woman.png',
          name : 'Be Alright',
          artist : 'Ariana Grande',
          music : './music/Chin/Be_Alright.mp3'
      },
      {
          img : './images/Chin/Attention.webp',
          name : 'Attention',
          artist : 'Omah Lay ft. Justin Bieber',
          music : './music/Chin/Attention.mp3'
      },
      {
          img : './images/Chin/Venus.jpg',
          name : 'When You Pull Up',
          artist : 'Shakka',
          music : './music/Chin/When_You_Pull_Up.mp3'
      },
      {
          img : './images/Chin/Godzilla.jpg',
          name : 'Godzilla',
          artist : 'Eminem ft. Juice WRLD',
          music : './music/Chin/Godzilla.mp3'
      },
      
  
      
  ]
    },
    {
      name: 'Abuchi',
      music_list: [
      {
          img : './images/Abuchi/Cheers_To_the_best.png',
          name : "Don't say a Word",
          artist : 'dvsn ft. Ty Dollar Sign',
          music : "music/Abuchi/Don't_Say_A_Word.mp3"
      },
      {
          img : './images/Abuchi/Cheers_To_the_best.png',
          name : 'Fight Club',
          artist : 'dvsn ft. Ty Dolla Sign',
          music : 'music/Abuchi/Fight_Club.mp3'
      },
      {
          img : './images/Abuchi/To_be_real.webp',
          name : 'Got To be Real',
          artist : 'Cherel Lynn',
          music : 'music/Abuchi/Got_To_Be_Real.mp3'
      },
  
      {
          img : './images/Abuchi/one_more_chance.jpg',
          name : 'One More Chance',
          artist : 'Capella Grey',
          music : 'music/Abuchi/One_More_Chance.mp3'
      },
      {
        img : './images/Abuchi/spin_move.jpg',
        name : 'Spin Move',
        artist : 'Dreamville',
        music : 'music/Abuchi/Spin_Move.mp3'
    },
      {
          img : './images/Abuchi/Mind.png',
          name : 'Back of My Mind',
          artist : 'H.E.R ft Ty Dolla Sign',
          music : 'music/Abuchi/Back_of_My_Mind.mp3'
      },    
      {
          img : './images/Abuchi/Lagos.webp',
          name : 'Ginger',
          artist : 'WizKid ft. BurnaBoy',
          music : 'music/Abuchi/Ginger.mp3'
      },
      {
          img : './images/Abuchi/perfect_timing.jpg',
          name : 'Perfect Timing',
          artist : 'YG ft. Blxst and Mozzy',
          music : 'music/Abuchi/Perfect_Timing.mp3'
      },
      {
          img : './images/Abuchi/love_song.jpg',
          name : 'No love Song',
          artist : 'Children of Zeus',
          music : 'music/Abuchi/No_Love_Song.mp3'
      },
      {
        img : './images/Abuchi/Orange_Was_a_Place.jpg',
        name : 'Replay',
        artist : 'Tems',
        music : 'music/Abuchi/Replay.mp3'
    },
    {
        img : './images/Abuchi/location.png',
        name : 'Location',
        artist : 'Dave ft. Burna Boy',
        music : 'music/Abuchi/Location.mp3'
    },
    {
        img : './images/Abuchi/my_affection.png',
        name : 'My Affection',
        artist : 'Summer Walker ft. Party next door',
        music : 'music/Abuchi/My_Affection.mp3'
    }
      
  
      
  ]
    },
    {
      name: 'Kasi',
      music_list: [
      {
          img : './images/Kasi/boogie.png',
          name : 'Man in the Mirror',
          artist : 'A Boogie Wit Da Hoodie',
          music : 'music/Kasi/Man_In_the_Mirror.mp3'
      },
      {
          img : './images/Kasi/sungba.jpg',
          name : 'Sungba',
          artist : 'Asake ft Burna Boy',
          music : 'music/Kasi/Sungba.mp3'
      },
      {
          img : './images/Kasi/Last_last.jpg',
          name : 'Last Last',
          artist : 'Burna Boy',
          music : 'music/Kasi/Last_Last.mp3'
      },
  
      {
          img : './images/Kasi/encore.jpg',
          name : 'Encore',
          artist : 'Cheryl Lynn',
          music : 'music/Kasi/Encore.mp3'
      },
      {
          img : './images/Kasi/In_Your_Arms.jpg',
          name : "When I'm in Your Arms",
          artist : 'Cleo Sol',
          music : "music/Kasi/When_I'm_in_Your_Arms.mp3"
      },    
      {
          img : './images/Kasi/Something_About_You.jpg',
          name : 'Something About You',
          artist : 'Dr.Sid',
          music : 'music/Kasi/Something_About_You.mp3'
      },
      {
          img : './images/Kasi/Got_It.jpg',
          name : 'You Know I Got It',
          artist : 'Jay Z ft. Rick Ross',
          music : 'music/Kasi/you_know_I_got_it.mp3'
      },
      {
        img : './images/Kasi/woman.jpg',
        name : 'Woman',
        artist : 'Liitle Simz ft. Cleo Sol',
        music : 'music/Kasi/Woman.mp3'
      },
      {
        img : './images/Kasi/Lost_&_Found.png',
        name : 'Lost and Found',
        artist : 'ASAP Rocky & Tyler the Creator',
        music : 'music/Kasi/Lost_and_Found.mp3'
      },
      {
        img : './images/Kasi/wicked.jpg',
        name : 'Wicked, Sexy',
        artist : 'Odunsi(The Engine)',
        music : 'music/Kasi/wicked_sexy.mp3'
      },   
      {
        img : './images/Kasi/FYN.jpg',
        name : 'FYN',
        artist : 'Rema',
        music : 'music/Kasi/FYN.mp3'
      },
      {
        img : './images/Kasi/franchise.jpg',
        name : 'Franchise',
        artist : 'Travis Scott ft. Future, M.I.A, Young Thug',
        music : 'music/Kasi/FRANCHISE.mp3'
      }
 
 
  ]
    }
  ];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer); //sets the timer of the slider back to 0, the start of the next song
    reset();

    curr_track.src = people[person].music_list[track_index].music; //sets the current track to be whatever the track index is at in the music list
   
    curr_track.load(); //sets the state of current back to its inital state

    track_art.style.backgroundImage = "url(" + people[person].music_list[track_index].img + ")"; //sets the track's background image to the img property of the track in the music list

    //textContent change the the content of the specified element
    track_name.textContent = people[person].music_list[track_index].name;
    track_artist.textContent = people[person].music_list[track_index].artist;
    now_playing.textContent = people[person].name + "'s Playlist " + (track_index + 1) + " / " + people[person].music_list.length;

    updateTimer = setInterval(setUpdate, 1000); //sets a delay in the timer to call the setUpdate function every 1000 milliseconds

    curr_track.addEventListener('ended', nextTrack); // the track ends it will call the nextTrack function to set up the next song
}

function reset(){
    curr_time.textContent = "00:00"; //sets timer to 0
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
    if(track_index < people[person].music_list.length - 1 && isRandom === false){ //if shuffle is off and index isn't at the end yet

        track_index += 1; //sets index to be the next song in the list
    }else if(track_index < people[person].music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * people[person].music_list.length); //creates a random number ranging from the length of the music list and assigns that value to the track index
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
        track_index = people[person].music_list.length -1; // if the user presses the prev button at the first song, then the index of the last track of the playlist will start playing
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
    }
}
