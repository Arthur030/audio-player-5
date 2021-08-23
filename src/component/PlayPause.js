import React from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'


const PlayPause = ({ 
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
