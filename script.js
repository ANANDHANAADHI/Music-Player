const musicContainer = document.querySelector('.music-container')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const repeatBtn = document.querySelector('#repeat')
const shuffleBtn = document.querySelector('#shuffle')
// console.log(repeatBtn)
let rflag = false
let sflag = false
const songs = ["Mudhal-Nee-Mudivum-Nee","Kanja-Poovu-Kannala","Bae","Private-party","Sandalee","Oxygen","Once-Upon-a-Time","Halamithi-Habibo","Megham-Karukatha","Mehabooba",'Bimbilikki-Pilapi',"Manasellam",'Happy-New-Year']
let songIndex = 0
let flag  = false
let x =0
let y = 0
let shuffleP =0
loadSong(songs[songIndex])
function loadSong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `image/${song}.webp`
    if(flag  == true){
        audio.play()
    }
    else{
        audio.pause()
    }

}

function playSong(){
    flag = true
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()

}

function pauseSong(){
    flag = false
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function updateProgress(e){
    const {duration,currentTime} = e.srcElement
    const progressPrecent = (currentTime/duration)*100
    progress.style.width =`${progressPrecent}%`
    // console.log(duration,currentTime)a
    if ((e.srcElement.currentTime) >= (e.srcElement.duration)-2){
        console.log("song finished")
        console.log(rflag, sflag);
        if (rflag == true){
            songIndex =songIndex
        }
        else{
        songIndex+=1
        }
        if (sflag){
        songIndex = Math.floor(Math.random()*songs.length)
        }
        else{
            songIndex =songIndex
        }
        loadSong(songs[songIndex])
    }
}


function setProgress(e){
    const width  = this.clientWidth
    const clickX  = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX/ width) * duration
    const progressPrecent = (currentTime/duration)*100
    progress.style.width =`${progressPrecent}%`
}
function repeatProcess(e){
    if (sflag == false) {
    rflag = true
    x +=1
    repeatBtn.style.color = "rgb(178, 178, 236)"
    if (x == 2){
        rflag = false
        x = 0
        repeatBtn.style.color = `#dbd2db`

    }
}
}
function shuffleProcess(e){

    // console.log(123);
    if (rflag == false ) {
    sflag = true
    y +=1
    console.log(y)
    shuffleBtn.style.color = "rgb(178, 178, 236)"
    if (y == 2){
        sflag = false
        y = 0
        shuffleBtn.style.color = `#dbd2db`

    }
}
}



playBtn.addEventListener('click',() => {

    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    }
    else{
        playSong()
    }

})

nextBtn.addEventListener("click", () =>{
    songIndex +=1
    if (songIndex >= songs.length){
        songIndex -= songs.length
    }
    loadSong(songs[songIndex])
})

prevBtn.addEventListener("click", () =>{
    songIndex -=1
    if(songIndex < 0){
        songIndex +=songs.length
    }
    loadSong(songs[songIndex])
})
repeatBtn.addEventListener("click", repeatProcess)
shuffleBtn.addEventListener("click", shuffleProcess)
audio.addEventListener("timeupdate", updateProgress)
progressContainer.addEventListener("click", setProgress)
