import React, { useState, useEffect, useRef } from "react";
import { func } from "prop-types";
import uploadImage from "../services/photo-uploader";

const PhotoUpload = ({ updateImages, pasted }) => {
  const [tagsInput, setTagsInput] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    if (pasted && pasted.length > 0) {
      fileInput.current.files = pasted;
    }
  }, [pasted]);

  const handleTagsInput = ({ target }) => {
    setTagsInput(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];
    const tags = tagsInput;
    uploadImage(file, tags).then((res) => updateImages(res));
    setTagsInput("");
    fileInput.current.value = null;
  };

  return (
    <div className="header-input-item">
      <form className="photo-upload" onSubmit={handleSubmit}>
        <input type="file" name="image" ref={fileInput} />
        <div className="row">
          <input
            className="text-input m-right-sm"
            onChange={handleTagsInput}
            value={tagsInput}
            type="text"
            placeholder="Tags"
          />
          <input type="submit" value="Upload" />
        </div>
      </form>
    </div>
  );
};

PhotoUpload.propTypes = {
  updateImages: func.isRequired,
};

export default PhotoUpload;
