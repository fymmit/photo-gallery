import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

const Tags = ({ tags }) => {
	if (tags.length == 0) return null;
	const tagList = tags.map(tag => <li key={tag.tag}>{tag.tag}</li>);
	return (
		<div className="tags">
			<span>Tags:</span>
			<ul>{tagList}</ul>
		</div>
	);
};

Tags.propTypes = {
	tags: arrayOf(shape(string.isRequired)).isRequired,
};

export default Tags;
