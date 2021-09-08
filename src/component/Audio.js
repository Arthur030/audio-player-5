import React from 'react'

const Audio = ({
    // audioRef useRef to get the .current of the audio
    // audio is the source of the audio
    // onLoadedMetadata is an event listener used to load the duration when we first
    // load the page
    audioRef, audio, onLoadedMetadata, setCurrentTime
}) => {
    return (
        <audio 
        ref={audioRef} 
        src={audio} 
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={ () => setCurrentTime(audioRef.current.currentTime)}
        />
    )
}

export default Audio


