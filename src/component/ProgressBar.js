import React from 'react'

const ProgressBar = ({
    progressBarRef, changeAudioToProgressBar
}) => {
    return (
        <input 
        className="progress-bar"
        type="range"
        defaultValue="0"
        ref={progressBarRef}
        onChange={changeAudioToProgressBar}
        />
    )
}
        
export default ProgressBar



