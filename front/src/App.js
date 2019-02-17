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
                <PhotoUpload />
                <PhotoGallery images={this.state.images} />
            </div>
        );
    }
}

export default App;
