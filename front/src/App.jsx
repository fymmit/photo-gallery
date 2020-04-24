import React, { useState, useEffect } from 'react';
import {
	Switch,
	Route
} from 'react-router-dom';
import PhotoGallery from './components/photo-gallery';
import PhotoUpload from './components/photo-upload';
import PhotoSearch from './components/photo-search';
import PhotoInfo from './components/photo-info';
import Header from './components/header';
import Loading from './components/loading';
import './app.css';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState([]);
	const [visibleImages, setVisibleImages] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		(async () => {
			const images = await fetch('/api/images').then(res => res.json());
			setImages(images);
			setVisibleImages(images);
			setLoading(false);
		})();
	}, []);

	return (
		<div className="App">
			<div className="sticky">
				<Header />
				<div className="inputs">
					<PhotoUpload
						updateImages={image => {
							const newImages = images.concat(image);
							setImages(newImages);
							setVisibleImages(newImages);
						}}
					/>
					<PhotoSearch
						setVisibleImages={searchString => {
							if (searchString) {
								const query = searchString
									.toLowerCase()
									.split(' ')
									.filter(tag => tag !== '')
									.map((x, i) => (i === 0 ? `?tags=${x}` : `&tags=${x}`))
									.join('');
								fetch(`/api/images${query}`)
									.then(res => res.json())
									.then(data => {
										setVisibleImages(data);
									});
							} else {
								setVisibleImages(images);
							}
						}}
					/>
				</div>
			</div>
			{loading ? (
				<Loading />
			) : (
				<>
					<div>
						<Switch>
							<Route exact path="/">
								<PhotoGallery images={visibleImages} selectImage={setSelectedImage} />
							</Route>
							<Route path="/image/:id">
								<PhotoInfo images={images} reset={() => setSelectedImage(null)} />
							</Route>
							<Route path="/">
								<div>
									Page not found.
								</div>
							</Route>
						</Switch>
					</div>
				</>
			)}
		</div>
	)
};

export default App;
