import axios from 'axios';

const postComment = (imageId, author, comment) => {
    return axios.post(`/images/${imageId}/comments`, {
        author,
        comment
    }).then(res => res.data);
};

export default postComment;
