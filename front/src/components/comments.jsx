import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

const Comments = ({ comments }) => {
    if (comments.length === 0) {
        return null;
    }

    const commentList = comments.map(comment => (<li key={comment.commentid}>{comment.author}: {comment.comment}</li>));
    return (
        <div className="tags">
            <span>Comments:</span>
            <ul>
                {commentList}
            </ul>
        </div>
    );
}

Comments.propTypes = {
    comments: arrayOf(shape({ author: string.isRequired, comment: string.isRequired })).isRequired
};

export default Comments;
