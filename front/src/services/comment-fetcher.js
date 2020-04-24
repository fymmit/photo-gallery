import axios from 'axios';

const getComments = id => axios.get(`/images/${id}/comments`).then(res => res.data);

export default getComments;
