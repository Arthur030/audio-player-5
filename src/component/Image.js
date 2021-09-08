import React from 'react'

const Image = ({ img }) => {
    return (
      <img className="img" 
        height="250"
        width="250"
        src={img} 
        alt="cover"
      />
    )
}

export default Image


