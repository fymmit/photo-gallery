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
        selectedImage: null,
        scrollPos: 0,
    }

    componentDidMount() {
        fetch('/images')
        .then(res => res.json())
        .then(images => this.setState({images, visibleImages: images}))
    }

    componentDidUpdate() {
        window.scrollTo(0, this.state.scrollPos);
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
                <div className="sticky">
                    <Header />
                    <div className="inputs">
                        <PhotoUpload updateImages={(i) => this.updateImages(i)} />
                        <PhotoSearch setVisibleImages={(s) => this.setVisibleImages(s)} />
                    </div>
                </div>
                { photoInfo || 
		    <PhotoGallery
			images={this.state.visibleImages}
			selectImage={(i) => this.selectImage(i)} />
		}
            </div>
        );
    }

    updateImages = (image) => {
        const images = this.state.images.concat(image)
        this.setState({ images, visibleImages: images })
    }

    setVisibleImages = (searchString) => {
        if (searchString) {
            const query = searchString.toLowerCase().split(' ').filter(tag => tag !==
	    '').map((x, i) => i === 0 ? `?tags=${x}` : `&tags=${x}`).join('');
	    fetch(`/images${query}`)
		.then(res => res.json())
		.then(json => {
		    this.setState({ visibleImages: json, selectedImage: null })
		})
        } else {
            this.setState({ visibleImages: this.state.images })
        }
    }

    selectImage = (imageName) => {
        if (imageName) {
            const selectedImage = this.state.images.find(image => image.name === imageName)
            this.setState({ selectedImage, scrollPos: window.scrollY })
        } else {
            this.setState({ selectedImage: null })
        }
    }
}

export default App;
