import React from 'react'

const Photo = (props) => {
    return(
        <img className='photo' src={props.name} alt={props.name} />
    )
}

export default Photo