import React, { useEffect, useState } from 'react';
import { func, shape, string, number } from 'prop-types';
import Tags from './tags';
import Comments from './comments';
import Loading from './loading';
import getTags from '../services/tag-fetcher';
import getComments from './../services/comment-fetcher';
import postComment from './../services/comment-poster';

const PhotoInfo = ({ image, reset }) => {
	const [loading, setLoading] = useState(true);
	const [tags, setTags] = useState([]);
	const [comments, setComments] = useState([]);
	const [author, setAuthor] = useState('');
	const [comment, setComment] = useState('');

	useEffect(() => {
		(async () => {
			const tags = await getTags(image.imageid);
			const comments = await getComments(image.imageid);
			setTags(tags);
			setComments(comments);
			setLoading(false);
		})()
	}, [image]);

	return (
		<div className="photo-info">
			{loading ? (
				<Loading />
			) : (
			<>
			<a href={image.name}>
				<img src={image.name} alt={image.name} />
			</a>
			<div className="col m-left-md">
				<Tags tags={tags} />
				<Comments comments={comments} />
				<div>
					<div>
						<label htmlFor="comment-input">Comment: </label>
						<input
							type="text"
							name="comment"
							id="comment-input"
							placeholder="Comment"
							value={comment}
							onChange={({ target }) => setComment(target.value)}
						/>
					</div>
					<div>
						<label htmlFor="author-input">Author: </label>
						<input
							type="text"
							name="author"
							id="author-input"
							placeholder="Author"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						<button
							onClick={() => {
								postComment(image.imageid, author, comment)
									.then(res => {
										setComments(comments.concat(res));
										setAuthor('');
										setComment('');
									});
							}}
						>
							Leave a comment
						</button>
					</div>
				</div>
				<button onClick={reset} type="button">
					Return to gallery
				</button>
			</div>
			</>
			)}
		</div>
	);
};

PhotoInfo.propTypes = {
	image: shape({ name: string.isRequired, imageid: number.isRequired }).isRequired,
	reset: func.isRequired,
};

export default PhotoInfo;
