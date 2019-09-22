import React from 'react';
import { string } from 'prop-types';

const Tags = ({ tags }) => (
  <div className="tags">
    <span>
      Tags:
    </span>
    <ul>
      {tags.split(' ').map(tag => <li key={tag}>{tag}</li>)}
    </ul>
  </div>
);

Tags.propTypes = {
  tags: string.isRequired,
};

export default Tags;
