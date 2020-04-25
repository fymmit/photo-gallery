import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { func, shape, string, number, arrayOf } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Tags from './tags';
import Comments from './comments';
import Loading from './loading';
import getTags from '../services/tag-fetcher';
import getComments from './../services/comment-fetcher';
import postComment from './../services/comment-poster';

const PhotoInfo = ({ images, setSearchString }) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [nextImage, setNextImage] = useState(null);
  const [fullSize, setFullSize] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const tags = await getTags(id);
      const comments = await getComments(id);
      setTags(tags);
      setComments(comments);
      const selectedImage = images.findIndex((i) => i.imageid === Number(id));
      if (selectedImage === -1) {
        history.push('/404');
      }
      setImage(images[selectedImage]);
      setNextImage(selectedImage > 0 ? selectedImage - 1 : -1);
      setPrevImage(selectedImage < images.length - 1 ? selectedImage + 1 : -1);
      setLoading(false);
    })();
  }, [id]);

  const handlePostComment = ({ author, comment }) => {
    return new Promise((resolve, reject) => {
      if (comment.length > 0 && author.length > 0) {
        postComment(id, author, comment).then((res) => {
          setComments(comments.concat(res));
          resolve();
        });
      } else {
        reject();
      }
    });
  };

  return (
    <div className="photo-info">
      {loading || image === null ? (
        <Loading />
      ) : (
        <>
          <div className="col">
            <Tags tags={tags} search={setSearchString} />
            <div className="row j-c-sb">
              <Link
                className="photo-info-arrow"
                to={
                  prevImage !== -1 ? `/image/${images[prevImage].imageid}` : '/'
                }
              >
                <FontAwesomeIcon icon={faAngleLeft} size="2x" />
              </Link>
              <img
                className={fullSize ? 'full-size-pic' : 'fit-size'}
                src={`/${image.name}`}
                alt={image.name}
                onClick={() => setFullSize((prev) => !prev)}
              />
              <Link
                className="photo-info-arrow"
                to={
                  nextImage !== -1 ? `/image/${images[nextImage].imageid}` : '/'
                }
              >
                <FontAwesomeIcon icon={faAngleRight} size="2x" />
              </Link>
            </div>
            <Comments comments={comments} postComment={handlePostComment} />
          </div>
        </>
      )}
    </div>
  );
};

PhotoInfo.propTypes = {
  images: arrayOf(
    shape({ name: string.isRequired, imageid: number.isRequired }),
  ).isRequired,
};

export default PhotoInfo;
