import React from 'react';
import { func } from 'prop-types';
import uploadImage from '../services/photo-uploader';


class PhotoUpload extends React.Component {
  state = {
    tagsInput: '',
  };

  fileInput = React.createRef();


  handleTagsInput = event => {
    this.setState({ tagsInput: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { tagsInput } = this.state;
    const { updateImages } = this.props;
    const file = this.fileInput.current.files[0];
    const tags = tagsInput;
    uploadImage(file, tags).then(res => updateImages(res));
    this.setState({
      tagsInput: '',
    });
    this.fileInput.current.value = null;
  }

  render() {
    const { tagsInput } = this.state;
    return (
      <div className="header-input-item">
        <form className="photo-upload" onSubmit={this.handleSubmit}>
          <input type="file" name="image" ref={this.fileInput} />
          <div className="row">
            <input
              className="text-input m-right-sm"
              onChange={this.handleTagsInput}
              value={tagsInput}
              type="text"
              placeholder="Tags"
            />
            <input type="submit" value="Upload" />
          </div>
        </form>
      </div>
    );
  }
}

PhotoUpload.propTypes = {
  updateImages: func.isRequired,
};

export default PhotoUpload;
