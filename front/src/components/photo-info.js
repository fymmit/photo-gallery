import React from 'react'
import Tags from './tags'

const PhotoInfo = (props) => {
    return(
        <div className="photo-info">
            <img src={props.image.name} alt={props.image.name} />
            <Tags tags={props.image.tags} />
            <button onClick={props.reset}>Return to gallery</button>
        </div>
    )
}

export default PhotoInfo