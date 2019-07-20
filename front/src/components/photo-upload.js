import React from 'react'
const uploader = require('../services/photo-uploader')

class PhotoUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tagsInput: ''
        }
        this.handleTagsInput = this.handleTagsInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileInput = React.createRef()
    }

    render() {
        return(
            <div className="header-input-item">
                <form className="photo-upload" onSubmit={this.handleSubmit}>
                    <input type='file' name='image' ref={this.fileInput} />
                    <div className="row">
                        <input
                            className="text-input m-right-sm"
                            onChange={this.handleTagsInput}
                            value={this.state.tagsInput}
                            type='text'
                            placeholder='Tags' />
                        <input type='submit' value='Upload' />
                    </div>
                </form>
            </div>
        )
    }

    handleTagsInput(event) {
        this.setState({ tagsInput: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const file = this.fileInput.current.files[0]
        const tags = this.state.tagsInput
        uploader.uploadImage(file, tags).then(res => this.props.updateImages(res))
        this.setState({
            tagsInput: ''
        })
        this.fileInput.current.value = null
    }
}

export default PhotoUpload