import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import Photo from './photo';

const PhotoGallery = ({ images }) => {
  const reversedImages = images
    .slice()
    .reverse()
    .map((image) => <Photo image={image} key={image.imageid} />);
  return <div className="photo-gallery">{reversedImages}</div>;
};

PhotoGallery.propTypes = {
  images: arrayOf(shape({})).isRequired,
};

export default PhotoGallery;
