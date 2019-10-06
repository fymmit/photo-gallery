import React from 'react';
import { string } from 'prop-types';

const Tags = ({ tags }) => {
	if (tags.length == 0) return null;
	const tagList = tags.map(tag => <li>{tag.tag}</li>);
	return (
		<div className="tags">
			<span>Tags:</span>
			<ul>{tagList}</ul>
		</div>
	);
};

Tags.propTypes = {
	tags: string.isRequired,
};

export default Tags;
