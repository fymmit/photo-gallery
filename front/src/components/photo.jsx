import React from 'react';
import { func, string, number, shape } from 'prop-types';
import { Link } from 'react-router-dom';

class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image } = this.props;
    return (
      <div className="photo-div" role="button" tabIndex={0}>
        <Link to={`/image/${image.imageid}`}>
          <img
            className="photo"
            src={image.name}
            alt={image.name}
            loading="lazy"
          />
        </Link>
      </div>
    );
  }
}

Photo.propTypes = {
  image: shape({ name: string.isRequired, imageid: number.isRequired })
    .isRequired,
};

export default Photo;
