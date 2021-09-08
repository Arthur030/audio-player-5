import React from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'


const PlayPause = ({ 
    // togglePlayPause is a function that switch between play and pause
    // isPlaying is a state to keep track if the audio is playing or not
    togglePlayPause, isPlaying
    }) => {


    return (
        <button 
            className="play"
            onClick={togglePlayPause}>
            {isPlaying ? <FaPause className="svg-pause"/> : <FaPlay className="svg-play"/>}
        </button>
    )
}

export default PlayPause






