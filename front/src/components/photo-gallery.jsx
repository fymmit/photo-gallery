import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import Photo from './photo';

const PhotoGallery = ({ images, selectImage }) => {
	const reverse = images.slice();
	const reversedImages = reverse
		.reverse()
		.map(image => (
			<Photo
				name={image.name}
				id={image.imageid}
				key={image.name}
				selectImage={selectImage}
			/>
		));
	return <div className="photo-gallery">{reversedImages}</div>;
};

PhotoGallery.propTypes = {
	images: arrayOf(shape({})).isRequired,
	selectImage: func.isRequired,
};

export default PhotoGallery;
