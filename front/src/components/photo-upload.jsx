import React, { useState, useEffect, useRef } from "react";
import { func } from "prop-types";
import uploadImage from "../services/photo-uploader";

const PhotoUpload = ({ updateImages, pasted }) => {
  const [tagsInput, setTagsInput] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    if (pasted && pasted.length > 0) {
      fileInput.current.files = pasted;
    }
  }, [pasted]);

  const setFileNameWithChecks = () => {
    if (fileInput.current && fileInput.current.files[0]) {
      setFileName(fileInput.current.files[0].name);
    }
  };

  const handleTagsInput = ({ target }) => {
    setTagsInput(target.value);
  };

  const handleSubmit = () => {
    const file = fileInput.current.files[0];
    const tags = tagsInput;
    uploadImage(file, tags).then((res) => updateImages(res));
    setTagsInput("");
    fileInput.current.value = null;
    setFileName("");
  };

  return (
    <div className="header-input-item">
      <input
        className="hidden"
        type="file"
        name="image"
        ref={fileInput}
        onChange={() => setFileNameWithChecks()}
      />
      <div className="row">
        <button
          className="button m-right-sm"
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click();
            }
          }}
        >
          Select image
        </button>
        <span id="file-name" className="ellipsis">
          {fileName}
        </span>
      </div>
      <div className="row">
        <input
          className="text-input m-right-sm"
          onChange={handleTagsInput}
          value={tagsInput}
          type="text"
          placeholder="Tags"
          onKeyDown={({ keyCode }) => {
            if (keyCode === 13) handleSubmit();
          }}
        />
        <button className="button" type="submit" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </div>
  );
};

PhotoUpload.propTypes = {
  updateImages: func.isRequired,
};

export default PhotoUpload;
