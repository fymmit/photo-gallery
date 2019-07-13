import React from 'react'

const Tags = (props) => {
    const tags = props.tags.split(' ').map(tag => <li>{tag}</li>)
    return(
        <div>
            Tags:
            <ul>
                {tags}
            </ul>
        </div>
        
    )
}

export default Tags