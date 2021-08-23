import React from 'react'

const VolumeBar = ({
    volume, changeVolume
}) => {
    return (
        <input 
        type="range"
        className="volume-bar"
        min="0"
        max="100"
        defaultValue="50"
        ref={volume}
        onChange={changeVolume}
        />
    )
}

export default VolumeBar
