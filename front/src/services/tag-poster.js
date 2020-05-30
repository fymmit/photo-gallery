import axios from 'axios';

const postTags = (imageId, tags) => {
  const tagArray = tags.toLowerCase().split(' ').filter((v, i, a) => a.indexOf(v) === i);
  return axios.post(`/api/images/${imageId}/tags`, {
    tags: tagArray
  }).then(res => res.data);
};

export default postTags;
