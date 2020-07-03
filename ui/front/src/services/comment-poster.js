import axios from 'axios';

const postComment = (imageId, author, comment) => {
  return axios
    .post(`/api/images/${imageId}/comments`, {
      author,
      comment,
    })
    .then((res) => res.data);
};

export default postComment;
