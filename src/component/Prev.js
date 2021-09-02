import React from 'react'
import { FaFastBackward } from 'react-icons/fa'

const Prev = ({prev}) => {
    return (
        <button 
        className="prev"
        onClick={prev}>
            <FaFastBackward className="svg-prev" />
        </button>
    )
}

export default Prev
