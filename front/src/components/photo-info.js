import React from 'react'

const PhotoInfo = (props) => {
    const tags = props.image.tags.split(' ').map(tag => {
        return(
            <li key={tag}>
                {tag}
            </li>
        )
    })
    return(
        <div className="photo-info">
            <img src={props.image.name} alt={props.image.name} />
            <br />
            Tags:
            <ul>
                {tags}
            </ul>
            <button onClick={props.reset}>Return to gallery</button>
        </div>
    )
}

export default PhotoInfo