import React, { useEffect, useState } from "react";
import { arrayOf, shape, string } from "prop-types";
import CommentForm from "./comment-form";

const Comments = ({ comments: propsComments, postComment }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(
      propsComments.slice().sort((a, b) => (a.commentid > b.commentid ? -1 : 1))
    );
  }, [propsComments]);

  const commentList = comments.map((comment) => (
    <div className="comment" key={comment.commentid}>
      {comment.author}: {comment.comment}
    </div>
  ));
  return (
    <div id="comment-section">
      <div id="comments-header">Comments</div>
      <CommentForm postComment={postComment} />
      {commentList.length > 0 ? (
        commentList
      ) : (
        <div className="comment">
          No comments yet. Be the first to say something!
        </div>
      )}
    </div>
  );
};

Comments.propTypes = {
  comments: arrayOf(
    shape({ author: string.isRequired, comment: string.isRequired })
  ).isRequired,
};

export default Comments;
