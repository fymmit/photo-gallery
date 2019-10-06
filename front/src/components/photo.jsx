import React from 'react';
import { func, string } from 'prop-types';

class Photo extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { selectImage, name } = this.props;
		selectImage(name);
	}

	render() {
		const { name } = this.props;
		return (
			<div
				className="photo-div"
				onClick={this.handleClick}
				role="button"
				tabIndex={0}
			>
				<img className="photo" src={name} alt={name} loading="lazy" />
			</div>
		);
	}
}

Photo.propTypes = {
	selectImage: func.isRequired,
	name: string.isRequired,
};

export default Photo;
