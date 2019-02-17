import React from 'react'
import Photo from './photo';

const PhotoGallery = (props) => {
    const images = props.images.map(image => {
        return(
            <Photo 
                name={image}/>
        )
    })
    return(
        <div>
            {images}
        </div>
    )
}

export default PhotoGallery