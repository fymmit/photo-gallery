import axios from 'axios';

const uploadImage = (file, tags) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('tags', tags);
  return axios.post('/images', formData).then(res => res.data);
};

export default uploadImage;
