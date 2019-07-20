import React from 'react'

class PhotoSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
        this.handleInput = this.handleInput.bind(this)
    }

    render() {
        return (
            <div className="header-input-item">
                <input
                    className="text-input"
                    onChange={this.handleInput}
                    type="text"
                    value={this.state.input}
                    placeholder="Search" />
            </div>
        )
    }

    handleInput(e) {
        this.setState({ input: e.target.value })
        this.props.setVisibleImages(e.target.value)
    }
}

export default PhotoSearch