import React from 'react'

const CurrentTimeDuration = ({
    currentTime, duration, calculateTime
}) => {
    return (
        <div className="time-container">
            <h5>{calculateTime(currentTime)}</h5>
            <h5>{ duration ? calculateTime(duration) : "00:00" }</h5>
        </div>
    )
}

export default CurrentTimeDuration
