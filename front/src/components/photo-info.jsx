import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { func, shape, string, number, arrayOf } from 'prop-types';
import Tags from './tags';
import Comments from './comments';
import Loading from './loading';
import getTags from '../services/tag-fetcher';
import getComments from './../services/comment-fetcher';
import postComment from './../services/comment-poster';

const PhotoInfo = ({ images, reset }) => {
	const [loading, setLoading] = useState(true);
	const [tags, setTags] = useState([]);
	const [comments, setComments] = useState([]);
	const [author, setAuthor] = useState('');
	const [comment, setComment] = useState('');
	const [image, setImage] = useState(null);
	let { id } = useParams();

	useEffect(() => {
		(async () => {
			const tags = await getTags(id);
			const comments = await getComments(id);
			setTags(tags);
			setComments(comments);
			setImage(images.find(i => i.imageid === Number(id)));
			setLoading(false);
		})()
	}, [id]);

	return (
		<div className="photo-info">
			{loading || image === null ? (
				<Loading />
			) : (
				<>
					<img src={`/${image.name}`} alt={image.name} />
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
										if (comment.length > 0 && author.length > 0) {
											postComment(image.imageid, author, comment)
												.then(res => {
													setComments(comments.concat(res));
													setAuthor('');
													setComment('');
												});
										}
									}}
								>
									Leave a comment
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

PhotoInfo.propTypes = {
	images: arrayOf(shape({ name: string.isRequired, imageid: number.isRequired })).isRequired,
	reset: func.isRequired,
};

export default PhotoInfo;
