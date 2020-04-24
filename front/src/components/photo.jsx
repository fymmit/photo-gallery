import React from 'react';
import { func, string, number, shape } from 'prop-types';
import { Link } from 'react-router-dom';

class Photo extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { selectImage, image } = this.props;
		selectImage(image);
	}

	render() {
		const { image } = this.props;
		return (
			<div
				className="photo-div"
				onClick={this.handleClick}
				role="button"
				tabIndex={0}
			>
				<Link to={`/image/${image.imageid}`}>
				{/* <Link to={`/image/${image.imageid}`}> */}
					<img className="photo" src={image.name} alt={image.name} loading="lazy" />
				</Link>
			</div>
		);
	}
}

Photo.propTypes = {
	selectImage: func.isRequired,
	image: shape({ name: string.isRequired, imageid: number.isRequired }).isRequired,
};

export default Photo;
