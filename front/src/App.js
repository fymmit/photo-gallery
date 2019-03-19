import React, { Component } from 'react';
import PhotoGallery from './components/photo-gallery';
import PhotoUpload from './components/photo-upload';
import './app.css'

class App extends Component {
    state = {
        images: []
    }

    componentDidMount() {
        fetch('/images')
        .then(res => res.json())
        .then(images => this.setState({images}))
    }
    
    render() {
        return (
            <div className="App">
                <PhotoUpload updateImages={(i) => this.updateImages(i)} />
                <PhotoGallery images={this.state.images} />
            </div>
        );
    }

    updateImages = (image) => {
        const images = this.state.images.concat(image)
        this.setState({ images })
    }
}

export default App;
