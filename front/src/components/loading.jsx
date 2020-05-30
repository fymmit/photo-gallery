import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = ({ size }) => {
  return (
    <div className="loading-spinner centered">
      <FontAwesomeIcon icon={faSpinner} size={size} />
    </div>
  );
};

export default Loading;
