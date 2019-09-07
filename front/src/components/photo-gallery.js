import React from 'react'
import Photo from './photo';

const PhotoGallery = ({ images, selectImage }) => {
    const reverse = images.slice()
    const reversedImages = reverse.reverse().map(image => {
        return(
            <Photo 
                name={image.name}
                id={image.imageid}
                key={image.name}
                selectImage={selectImage} />
        )
    })
    return(
        <div className="photo-gallery">
            {reversedImages}
        </div>
    )
}

export default PhotoGallery