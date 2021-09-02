import React from 'react'
import { FaFastForward } from 'react-icons/fa'

const Next = ({next}) => {
    return (
        <button 
        className="next"
        onClick={next}>
            <FaFastForward className="svg-next"/>
        </button>
    )
}

export default Next
