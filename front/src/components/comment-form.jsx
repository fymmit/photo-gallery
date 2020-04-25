import React, { useState } from "react";

const CommentForm = ({ postComment }) => {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    postComment({ author, comment }).then(() => {
      setComment("");
      setAuthor("");
    });
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) handleSubmit();
  };

  return (
    <div id="comment-form">
      <input
        type="text"
        name="author"
        id="author-input"
        placeholder="Name"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        autoComplete="off"
        onKeyDown={handleEnterKey}
      />
      <input
        type="text"
        name="comment"
        id="comment-input"
        placeholder="Comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        autoComplete="off"
        onKeyDown={handleEnterKey}
      />
      <button id="comment-send" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default CommentForm;
