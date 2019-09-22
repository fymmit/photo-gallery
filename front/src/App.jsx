import React, { Component } from 'react';
import PhotoGallery from './components/photo-gallery';
import PhotoUpload from './components/photo-upload';
import PhotoSearch from './components/photo-search';
import PhotoInfo from './components/photo-info';
import Header from './components/header';
import './app.css';

class App extends Component {
  state = {
    images: [],
    visibleImages: [],
    selectedImage: null,
    scrollPos: 0,
  }

  componentDidMount() {
    fetch('/images')
      .then(res => res.json())
      .then(images => this.setState({ images, visibleImages: images }));
  }

  componentDidUpdate() {
    const { scrollPos } = this.state;
    window.scrollTo(0, scrollPos);
  }

  updateImages = (image) => {
    const { images } = this.state;
    const updatedImages = images.concat(image);
    this.setState({ images: updatedImages, visibleImages: updatedImages });
  }

  hasImageSearchTag = searchArray => image => {
    if (!image.tags) return false;
    return searchArray.some(searchTag => image.tags.toLowerCase().includes(searchTag));
  };

  setVisibleImages = (searchString) => {
    const { images } = this.state;
    if (searchString) {
      const searchArray = searchString.toLowerCase().split(' ').filter(tag => tag !== '');
      const visibleImages = images.filter(this.hasImageSearchTag(searchArray));
      this.setState({ visibleImages, selectedImage: null });
    } else {
      this.setState({ visibleImages: images });
    }
  }

  selectImage = (imageName) => {
    const { images } = this.state;
    if (imageName) {
      const selectedImage = images.find(image => image.name === imageName);
      this.setState({ selectedImage, visibleImages: [], scrollPos: window.scrollY });
    } else {
      this.setState({ selectedImage: null, visibleImages: images });
    }
  }

  render() {
    const { selectedImage, visibleImages } = this.state;
    let photoInfo;
    if (selectedImage) {
      photoInfo = <PhotoInfo image={selectedImage} reset={() => this.selectImage()} />;
    } else {
      photoInfo = null;
    }
    return (
      <div className="App">
        <div className="sticky">
          <Header />
          <div className="inputs">
            <PhotoUpload updateImages={i => this.updateImages(i)} />
            <PhotoSearch setVisibleImages={s => this.setVisibleImages(s)} />
          </div>
        </div>
        <PhotoGallery
          images={visibleImages}
          selectImage={i => this.selectImage(i)}
        />
        {photoInfo}
      </div>
    );
  }
}

export default App;
