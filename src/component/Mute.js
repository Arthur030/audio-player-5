import React from 'react'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

const Mute = ({ 
    toggleMute, isMuted 
    }) => {
    return (
        <button 
            onClick={toggleMute}
            className="volume-button"
            >
            {isMuted ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
    )
}

export default Mute
