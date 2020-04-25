import React, { useState, useEffect } from "react";

const PhotoSearch = ({ setSearchString, searchString }) => {
  const [input, setInput] = useState("");
  const handleInput = ({ target }) => {
    setInput(target.value);
  };

  useEffect(() => {
    setInput(searchString);
  }, [searchString]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchString(input);
  };

  return (
    <div className="header-input-item">
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          onChange={handleInput}
          type="text"
          value={input}
          placeholder="Search"
        />
      </form>
    </div>
  );
};

export default PhotoSearch;
