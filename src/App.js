import React, { useState, useRef } from 'react'
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

  const [trackIndex, setTrackIndex] = useState(0)

  // attribute used to config the audio, title, src of the player 
  const config = domElement.getAttribute("data-player")
  // convert the attribute into an obj
  const configObj = JSON.parse(config)
  // 
  const {audio, img, artist, title} = configObj[trackIndex]
  console.log(configObj)
  // ref in the <audio />
  const audioRef = useRef()
  //
  const progressBarRef = useRef()
  const volume = useRef()

  // sends data to nodejs when clicking test button
  const submitTrack = () => {
    console.log(artist)
    Axios.post('http://localhost:3001/create', {
      artist: artist,
      title: title,
      audio: audio
    })
  }

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration)
    progressBarRef.current.max = seconds
    setDuration(seconds)
  }

  const togglePlayPause = async () => {
    try {
      const prevState = isPlaying;
      setIsPlaying(!prevState);
      if (!prevState) {
        await play();
      } else {
        pause();
      }
    } catch (err) {

    }
  }

  const play = async () => {
    try {
      await audioRef.current.play()
      setCurrentTime(progressBarRef.current.value);
      audioRef.current.currentTime = progressBarRef.current.value;
      // console.log(audioRef.current.currentTime, "currentTime", calculateTime(audioRef.current.duration), "duration")

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
    setCurrentTime(progressBarRef.current.value + 30);
    audioRef.current.currentTime = progressBarRef.current.value;
  }

  const prev = () => {
    if (trackIndex -1 < 0) {
      setTrackIndex(configObj.length -1 || configObj.length > 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
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
      <Image
      img={img}
      />
      <div className="player-container">
        <TrackInfo
        title={title}
        artist={artist}
        />
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
      <button
        onClick={submitTrack}
      />
    </div>
  )
}

export default App;
