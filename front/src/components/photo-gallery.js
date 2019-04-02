import React from 'react'
import Photo from './photo';

const PhotoGallery = (props) => {
    const reverse = props.images.slice()
    const images = reverse.reverse().map(image => {
        return(
            <Photo 
                name={image.name}
                key={image.name}
                selectImage={props.selectImage} />
        )
    })
    return(
        <div>
            {images}
        </div>
    )
}

export default PhotoGallery