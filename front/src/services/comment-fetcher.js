import axios from 'axios';

const getComments = id => axios.get(`/api/images/${id}/comments`).then(res => res.data);

export default getComments;
