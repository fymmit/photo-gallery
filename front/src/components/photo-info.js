import React from 'react'
import Tags from './tags'

const PhotoInfo = (props) => {
    return(
        <>
            <div className="photo-info">
                <a href={props.image.name}>
                    <img src={props.image.name} alt={props.image.name} />
                </a>
                <div className="col m-left-md">
                    <Tags tags={props.image.tags} />
                    <button onClick={props.reset}>Return to gallery</button>
                </div>
            </div>
        </>
    )
}

export default PhotoInfo