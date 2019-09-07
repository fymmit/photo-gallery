import React from 'react'

class Photo extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return(
            <div
                className="photo-div"
                onClick={this.handleClick}
            >
                <img 
                    className='photo' 
                    src={this.props.name} 
                    alt={this.props.name} 
                    loading="lazy" />
            </div>
        )
    }

    handleClick(e) {
        this.props.selectImage(this.props.name)
    }
}

export default Photo