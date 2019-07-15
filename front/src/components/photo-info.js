import React from 'react'
import Tags from './tags'

const PhotoInfo = (props) => {
    return(
        <>
            <div className="photo-info">
                <Tags tags={props.image.tags} />
                <img src={props.image.name} alt={props.image.name} />
                <button onClick={props.reset}>Return to gallery</button>
            </div>
        </>
    )
}

export default PhotoInfo