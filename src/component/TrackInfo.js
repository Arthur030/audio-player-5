import React from 'react'

const TrackInfo = ({
    title, author
}) => {
    return (
        <div className="track-info">
          <h4 className="title">{title}</h4>
          <h4 className="author">{author}</h4>
        </div>
    )
}

export default TrackInfo
