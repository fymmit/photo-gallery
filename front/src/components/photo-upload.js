import React from 'react'

const PhotoUpload = (props) => {
    return(
        <form action='/images' method='POST' enctype='multipart/form-data'>
            <input type='file' name='image' />
            <input type='submit' value='Upload'/>
        </form>
    )
}

export default PhotoUpload