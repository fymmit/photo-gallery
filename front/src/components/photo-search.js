import React from 'react'

class PhotoSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
        this.handleInput = this.handleInput.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="header-input-item">
		<form
		    onSubmit={this.handleSubmit}>
		    <input
			className="text-input"
			onChange={this.handleInput}
			type="text"
			value={this.state.input}
			placeholder="Search" />
		</form>
            </div>
        )
    }

    handleInput(e) {
        this.setState({ input: e.target.value })
    }

    handleSubmit(e) {
	e.preventDefault();
	this.props.setVisibleImages(this.state.input);
    }
}

export default PhotoSearch
