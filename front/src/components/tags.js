import React from 'react'

const Tags = ({ tags }) => {
    if (tags.length == 0) return null;
    const tagList = tags.map(tag => <li>{tag.tag}</li>)
    return(
        <div className="tags">
            <span>
                Tags:
            </span>
            <ul>
                {tagList}
            </ul>
        </div>
        
    )
}

export default Tags