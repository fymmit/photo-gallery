import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

const PhotoSearch = ({ setSearchString, searchString }) => {
  const [input, setInput] = useState("");
  const handleInput = ({ target }) => {
    setInput(target.value);
  };

  useEffect(() => {
    setInput(searchString);
  }, [searchString]);

  const handleSubmit = () => {
    setSearchString(input);
  };

  return (
    <div className="header-input-item row">
      <input
        className="text-input m-right-sm"
        onChange={handleInput}
        type="text"
        value={input}
        placeholder="Search"
        onKeyDown={({ keyCode }) => {
          if (keyCode === 13) handleSubmit();
        }}
      />
      <button
        className="button"
        onClick={() => {
          setSearchString("");
        }}
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
    </div>
  );
};

export default PhotoSearch;
