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
	};

	componentDidMount() {
		fetch('/images')
			.then(res => res.json())
			.then(images => this.setState({ images, visibleImages: images }));
	}

	componentDidUpdate() {
		const { scrollPos } = this.state;
		window.scrollTo(0, scrollPos);
	}

	updateImages = image => {
		const { images } = this.state;
		const newImages = images.concat(image);
		this.setState({ images: newImages, visibleImages: images });
	};

	setVisibleImages = searchString => {
		const { images } = this.state;
		if (searchString) {
			const query = searchString
				.toLowerCase()
				.split(' ')
				.filter(tag => tag !== '')
				.map((x, i) => (i === 0 ? `?tags=${x}` : `&tags=${x}`))
				.join('');
			fetch(`/images${query}`)
				.then(res => res.json())
				.then(json => {
					this.setState({ visibleImages: json, selectedImage: null });
				});
		} else {
			this.setState({ visibleImages: images });
		}
	};

	selectImage = imageName => {
		const { images } = this.state;
		if (imageName) {
			const selectedImage = images.find(image => image.name === imageName);
			this.setState({ selectedImage, scrollPos: window.scrollY });
		} else {
			this.setState({ selectedImage: null });
		}
	};

	render() {
		const { selectedImage, visibleImages } = this.state;
		let photoInfo;
		if (selectedImage) {
			photoInfo = (
				<PhotoInfo image={selectedImage} reset={() => this.selectImage()} />
			);
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
				{photoInfo || (
					<PhotoGallery
						images={visibleImages}
						selectImage={i => this.selectImage(i)}
					/>
				)}
			</div>
		);
	}
}

export default App;
