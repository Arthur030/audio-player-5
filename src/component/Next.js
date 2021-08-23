import React from 'react'
import { MdForward30 } from 'react-icons/md'

const Next = ({next}) => {
    return (
        <button onClick={next}>
            <MdForward30 />
        </button>
    )
}

export default Next
