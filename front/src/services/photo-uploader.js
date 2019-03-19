const axios = require('axios')

const uploadImage = (file, tags) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('tags', tags)
    return axios.post('/images', formData).then(res => res.data)
}

module.exports = { uploadImage }