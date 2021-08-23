import React from 'react'

const audio = ({
    audioRef, audio, onLoadedMetadata, setCurrentTime, setDuration
}) => {
    return (
        <audio 
        ref={audioRef} 
        src={audio} 
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={ () => setCurrentTime(audioRef.current.currentTime, setDuration(audioRef.current.duration))}
        />
    )
}

export default audio
