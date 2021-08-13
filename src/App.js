import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import './App.css';
import 'regenerator-runtime/runtime'

function App( { domElement } ) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  
  const config = domElement.getAttribute("data-player")
  const configObj = JSON.parse(config)
  const {audio, img, artist, title} = configObj

  const audioRef = useRef();
  const progressBarRef = useRef();
  const volume = useRef();



  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration)
    progressBarRef.current.max = seconds
    setDuration(seconds)
  };

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
  };

  const play = async () => {
    try {
      await audioRef.current.play()
      setCurrentTime(progressBarRef.current.value);
      audioRef.current.currentTime = progressBarRef.current.value;
      console.log(audioRef.current.currentTime, "currentTime", calculateTime(audioRef.current.duration), "duration")

    } catch {
      console.log("play promise failed, retrying...")
    }
      
  };

  const pause = async() => {
    try {
      await audioRef.current.pause()
    } catch {
      console.log("pause promise failed, retrying...")
      audioRef.current.currentTime = progressBarRef.current.value;
      setCurrentTime(progressBarRef.current.value);
    }
  };
    
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
  };

  const changeVolume = () => {
    audioRef.current.volume = volume.current.value / 100;
  }

  const changeAudioToProgressBar =  async() => {
    if (isPlaying) {
      await play()
      
    } else {
      await pause()
    }
  } 
  return (
    <div className="player_widget__App" data-player="data">
      <audio 
      ref={audioRef} 
      src={audio} 
      preload="metadata"
      onLoadedMetadata={onLoadedMetadata}
      onTimeUpdate={ () => setCurrentTime(audioRef.current.currentTime, setDuration(audioRef.current.duration))}
      >
      </audio>
      <div className="image-container">
        <img className="img" 
          height="250"
          width="250"
          src={img} 
          alt="cover"
        />
      </div>
      <div className="player-container">
      <div className="track-info">
      <h4 className="title">{title} -</h4>
      
      <h4 className="artist">{artist}</h4>
        </div>
        <div className="button-container">
          <button 
          className="play"
          onClick={togglePlayPause}>
          {isPlaying ? <FaPause className="svg-pause"/> : <FaPlay className="svg-play"/>}
          </button>
          <div className="volume-container">
          <button 
          onClick={toggleMute}
          className="volume-button"
          >
            {isMuted ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <input 
              type="range"
              className="volume-bar"
              min="0"
              max="100"
              defaultValue="50"
              ref={volume}
              onChange={changeVolume}
              />
          </div>
        </div>
        <input 
          className="progress-bar"
          type="range"
          defaultValue="0"
          ref={progressBarRef}
          onChange={changeAudioToProgressBar}
        />
        <div className="time-container">
          <h5>{calculateTime(currentTime)}</h5>
          <h5>{ duration ? calculateTime(duration) : "00:00" }</h5>
        </div>
      </div>
    </div>
  );
}

export default App;
