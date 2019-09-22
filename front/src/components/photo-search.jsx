import React from 'react';
import { func } from 'prop-types';

class PhotoSearch extends React.Component {
  state = {
    input: '',
  };


  handleInput = event => {
    const { setVisibleImages } = this.props;
    this.setState({ input: event.target.value });
    setVisibleImages(event.target.value);
  }

  render() {
    const { input } = this.state;
    return (
      <div className="header-input-item">
        <input
          className="text-input"
          onChange={this.handleInput}
          type="text"
          value={input}
          placeholder="Search"
        />
      </div>
    );
  }
}

PhotoSearch.propTypes = {
  setVisibleImages: func.isRequired,
};

export default PhotoSearch;
