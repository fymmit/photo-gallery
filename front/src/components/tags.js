import React from 'react'

const Tags = (props) => {
    const tags = props.tags.split(' ').map(tag => <li>{tag}</li>)
    return(
        <div className="tags">
            <span>
                Tags:
            </span>
            <ul>
                {tags}
            </ul>
        </div>
        
    )
}

export default Tags