import React from 'react';
import { func } from 'prop-types';

class PhotoSearch extends React.Component {
	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		input: '',
	};

	handleInput(e) {
		this.setState({ input: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const { setVisibleImages } = this.props;
		const { input } = this.state;
		setVisibleImages(input);
	}

	render() {
		const { input } = this.state;
		return (
			<div className="header-input-item">
				<form onSubmit={this.handleSubmit}>
					<input
						className="text-input"
						onChange={this.handleInput}
						type="text"
						value={input}
						placeholder="Search"
					/>
				</form>
			</div>
		);
	}
}

PhotoSearch.propTypes = {
	setVisibleImages: func.isRequired,
};

export default PhotoSearch;
