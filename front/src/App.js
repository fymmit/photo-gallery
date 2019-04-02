import React, { Component } from 'react'
import PhotoGallery from './components/photo-gallery'
import PhotoUpload from './components/photo-upload'
import PhotoSearch from './components/photo-search'
import './app.css'

class App extends Component {
    state = {
        images: [],
        visibleImages: []
    }

    componentDidMount() {
        fetch('/images')
        .then(res => res.json())
        .then(images => this.setState({images, visibleImages: images}))
    }
    
    render() {
        return (
            <div className="App">
                <PhotoUpload updateImages={(i) => this.updateImages(i)} />
                <PhotoSearch setVisibleImages={(s) => this.setVisibleImages(s)} />
                <PhotoGallery images={this.state.visibleImages} />
            </div>
        );
    }

    updateImages = (image) => {
        const images = this.state.images.concat(image)
        this.setState({ images })
    }

    setVisibleImages = (searchString) => {
        console.log(searchString)
        if (searchString) {
            const searchArray = searchString.split(' ').filter(tag => tag != '')
            const visibleImages = this.state.images.filter(image => {
                if (image.tags) {
                    const tags = image.tags.split(' ')
                    for (const searchTag of searchArray) {
                        if (!tags.includes(searchTag)) {
                            return false
                        }
                    }
                    return true
                }
                return false
            })
            this.setState({ visibleImages })
        } else {
            this.setState({ visibleImages: this.state.images })
        }
    }
}

export default App;
