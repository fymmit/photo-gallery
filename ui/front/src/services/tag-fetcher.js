import axios from 'axios';

const getTags = (id) =>
  axios.get(`/api/images/${id}/tags`).then((res) => res.data);

export default getTags;
