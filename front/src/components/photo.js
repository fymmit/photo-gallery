import React from 'react'

class Photo extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return(
            <div className="photo-div">
                <img 
                    className='photo' 
                    src={this.props.name} 
                    alt={this.props.name} 
                    onClick={this.handleClick} />
            </div>
        )
    }

    handleClick(e) {
        this.props.selectImage(this.props.name)
    }
}

export default Photo