import React, { useEffect, useState } from 'react';
import { func, shape, string } from 'prop-types';
import Tags from './tags';
import getTags from '../services/tag-fetcher';

const PhotoInfo = ({ image, reset }) => {
	const [tags, setTags] = useState([]);
	useEffect(() => {
		getTags(image.imageid).then(res => setTags(res));
	}, [image]);
	return (
		<>
			<div className="photo-info">
				<a href={image.name}>
					<img src={image.name} alt={image.name} />
				</a>
				<div className="col m-left-md">
					<Tags tags={tags} />
					<button onClick={reset} type="button">
						Return to gallery
					</button>
				</div>
			</div>
		</>
	);
};

PhotoInfo.propTypes = {
	image: shape({ name: string.isRequired }).isRequired,
	reset: func.isRequired,
};

export default PhotoInfo;
