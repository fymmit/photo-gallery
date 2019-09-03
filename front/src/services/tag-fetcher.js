import axios from 'axios';

const getTags = id => {
    return axios.get(`/images/${id}/tags`).then(res => res.data);
};

export default getTags;
