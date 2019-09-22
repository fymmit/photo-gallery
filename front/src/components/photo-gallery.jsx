import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import Photo from './photo';

const PhotoGallery = ({ images, selectImage }) => {
  const reversedImages = images.slice().reverse();
  return (
    <div className="photo-gallery">
      {reversedImages.map(image => (
        <Photo
          name={image.name}
          key={image.name}
          selectImage={selectImage}
        />
      ))}
    </div>
  );
};

PhotoGallery.propTypes = {
  images: arrayOf(shape({})).isRequired,
  selectImage: func.isRequired,
};

export default PhotoGallery;
