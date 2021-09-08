import React, { useState, useRef, useEffect } from 'react'
import './App.css'
// fix the errors with async await when running build:widget
import 'regenerator-runtime/runtime'
// used to post data to nodejs
import Axios from 'axios'
import PlayPause from './component/PlayPause'
import Mute from './component/Mute'
import VolumeBar from './component/VolumeBar'
import ProgressBar from './component/ProgressBar'
import Image from './component/Image'
import TrackInfo from './component/TrackInfo'
import CurrentTimeDuration from './component/CurrentTimeDuration'
import Audio from './component/Audio'
import Next from './component/Next'
import Prev from './component/Prev'

function App( { domElement } ) {
  // track if is playing for Play/Pause button
  const [isPlaying, setIsPlaying] = useState(false)
  // total duration of audio
  const [duration, setDuration] = useState(0)
  // current time of audio
  const [currentTime, setCurrentTime] = useState(0)
  // toggle mute/unmute
  const [isMuted, setIsMuted] = useState(true)
  // when set to true, sends data to backend
  const [data, setData] = useState(false)

  const [trackIndex, setTrackIndex] = useState(0)

  // attribute used to config the src, title, author of the player 
  const config = domElement.getAttribute("data-player")
  // convert the attribute into an obj
  const configObj = JSON.parse(config)
  // 
  const {audio, img, author, title} = configObj[trackIndex]
  // ref in the <audio />
  const audioRef = useRef()
  //
  const progressBarRef = useRef()
  const volume = useRef()

  // update the progress bar to the currentTime 
  useEffect(() => {
    progressBarRef.current.value = Math.floor(audioRef.current.currentTime)
  }, [currentTime])

  // sends data to nodejs when clicking test button
  const submitTrack = () => {
    console.log(author)
    Axios.post('http://localhost:3001/create', {
      author: author,
      title: title,
      audio: audio
    })
  }

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration)
    progressBarRef.current.max = seconds
    setDuration(seconds)
  }

  // takes care of the play button to switch between play or pause
  const togglePlayPause = async () => {
    try {
      const prevState = isPlaying;
      setIsPlaying(!prevState);
      if (!prevState) {
        await play()
      } else {
        pause()
      }
    } catch (err) {

    }
  }

  const play = async () => {
    try {
      await audioRef.current.play()
      setCurrentTime(progressBarRef.current.value)
      audioRef.current.currentTime = progressBarRef.current.value
      if(!data){
        submitTrack()
        console.log("sends data")
      }
      setData(true)
    } catch {
      console.log("play promise failed, retrying...")
    }
      
  }

  const pause = () => {
     audioRef.current.pause()
  }
    
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      audioRef.current.volume = volume.current.value / 100;
    } else {
      audioRef.current.volume = 0;
    }
  }

  const changeVolume = () => {
    audioRef.current.volume = volume.current.value / 100;
    if (audioRef.current.volume <= 0) {
      setIsMuted(false) 
      } else {
        setIsMuted(true)
      }
    }
  

  const changeAudioToProgressBar =  async() => {
    if (isPlaying) {
      await play()
      
    } else {
      pause()
    }
  } 


  const next = () => {
    progressBarRef.current.value = Number(progressBarRef.current.value) + 30
    changeAudioToProgressBar()
  }

  const prev = () => {
    progressBarRef.current.value = Number(progressBarRef.current.value) - 30
    changeAudioToProgressBar()
  }

  return (
    <div className="player_widget__App" data-player="data">
      <Audio
      audioRef={audioRef}
      audio={audio}
      onLoadedMetadata={onLoadedMetadata}
      setCurrentTime={setCurrentTime}
      setDuration={setDuration}
      />
      <div className="player-container">
        <div className="info-container">
        <TrackInfo
        title={title}
        author={author}
        />
        <Image
        img={img}
        />
        </div>
        <div className="button-container">
          <Prev
          prev={prev}
          />
          <PlayPause 
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          />
          <Next
          next={next}
          />
          <div className="volume-container">
          <Mute 
          isMuted={isMuted}
          toggleMute={toggleMute}
          />
          <VolumeBar 
          volume={volume}
          changeVolume={changeVolume}
          />
          </div>
        </div>
        <ProgressBar
          progressBarRef={progressBarRef}
          changeAudioToProgressBar={changeAudioToProgressBar}
        />
        <CurrentTimeDuration
          currentTime={currentTime}
          duration={duration}
          calculateTime={calculateTime}
        />
      </div>
    </div>
  )
}

export default App;
