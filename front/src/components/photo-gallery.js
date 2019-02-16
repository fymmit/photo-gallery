import React from 'react'

const PhotoGallery = (props) => {
    const images = props.images.map(image => {
        return(
            <img src={image} alt={image} key={image}/>
        )
    })
    return(
        <div>
            {images}
        </div>
    )
}

export default PhotoGallery