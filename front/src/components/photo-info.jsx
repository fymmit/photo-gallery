import React from 'react';
import { func, shape, string } from 'prop-types';
import Tags from './tags';

const PhotoInfo = ({ image, reset }) => (
  <>
    <div className="photo-info">
      <a href={image.name}>
        <img src={image.name} alt={image.name} />
      </a>
      <div className="col m-left-md">
        <Tags tags={image.tags} />
        <button onClick={reset} type="button">Return to gallery</button>
      </div>
    </div>
  </>
);

PhotoInfo.propTypes = {
  image: shape({ name: string.isRequired }).isRequired,
  reset: func.isRequired,
};

export default PhotoInfo;
