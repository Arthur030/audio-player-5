import React from 'react'

const TrackInfo = ({
    title, artist
}) => {
    return (
        <div className="track-info">
          <h4 className="title">{title} -</h4>
          <h4 className="artist">{artist}</h4>
        </div>
    )
}

export default TrackInfo
