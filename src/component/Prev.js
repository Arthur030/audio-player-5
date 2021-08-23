import React from 'react'
import { MdReplay } from 'react-icons/md'

const Prev = ({prev}) => {
    return (
        <button onClick={prev}>
            <MdReplay />
        </button>
    )
}

export default Prev
