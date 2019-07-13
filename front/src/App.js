import React, { Component } from 'react'
import PhotoGallery from './components/photo-gallery'
import PhotoUpload from './components/photo-upload'
import PhotoSearch from './components/photo-search'
import PhotoInfo from './components/photo-info'
import Header from './components/header'
import './app.css'

class App extends Component {
    state = {
        images: [],
        visibleImages: [],
        selectedImage: null
    }

    componentDidMount() {
        fetch('/images')
        .then(res => res.json())
        .then(images => this.setState({images, visibleImages: images}))
    }
    
    render() {
        let photoInfo
        if (this.state.selectedImage) {
            photoInfo = <PhotoInfo image={this.state.selectedImage} reset={() => this.selectImage()} />
        } else {
            photoInfo = null
        }
        return (
            <div className="App">
                <Header />
                <PhotoUpload updateImages={(i) => this.updateImages(i)} />
                <PhotoSearch setVisibleImages={(s) => this.setVisibleImages(s)} />
                <PhotoGallery
                    className="photo-gallery" 
                    images={this.state.visibleImages}
                    selectImage={(i) => this.selectImage(i)} />
                {photoInfo}
            </div>
        );
    }

    updateImages = (image) => {
        const images = this.state.images.concat(image)
        this.setState({ images, visibleImages: images })
    }

    setVisibleImages = (searchString) => {
        if (searchString) {
            const searchArray = searchString.split(' ').filter(tag => tag !== '')
            const visibleImages = this.state.images.filter(image => {
                if (image.tags) {
                    for (const searchTag of searchArray) {
                        if (!image.tags.includes(searchTag)) {
                            return false
                        }
                    }
                    return true
                }
                return false
            })
            this.setState({ visibleImages, selectedImage: null })
        } else {
            this.setState({ visibleImages: this.state.images })
        }
    }

    selectImage = (imageName) => {
        if (imageName) {
            const selectedImage = this.state.images.find(image => image.name === imageName)
            this.setState({ selectedImage, visibleImages: [] })
        } else {
            this.setState({ selectedImage: null, visibleImages: this.state.images })
        }
    }
}

export default App;
