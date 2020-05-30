import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Loading from './loading';

const Tags = ({ tags, search, postTags }) => {
  const [input, setInput] = useState('');
  const [addingNewTag, setAddingNewTag] = useState(false);
  const [loading, setLoading] = useState(false);
  const tagList = tags.map((tag) => (
    <Link key={tag.tag} to="/">
      <span className="tag" key={tag.tag} onClick={() => search(tag.tag)}>
        {tag.tag}
      </span>
    </Link>
  ));
  return (
  <div className="tags centered m-b-sm">
    {tagList}
    <span
      className="tag"
      onClick={() => setAddingNewTag(prev => !prev)}
    >
      {loading ? <Loading /> : addingNewTag ? (
        <input
          id="tag-input"
          className="text-input"
          type="text"
          value={input}
          onChange={({ target }) => setInput(target.value)}
          autoFocus
          onBlur={() => setAddingNewTag(false)}
          onKeyDown={({ keyCode }) => {
            if (keyCode === 13) {
              setLoading(true);
              postTags(input).then(() => {
                setLoading(false);
              });
              setInput('');
              setAddingNewTag(false);
            } else if (keyCode === 13) {
              setInput('');
              setAddingNewTag(false);
            }
          }}
        />
      ): (
        <FontAwesomeIcon icon={faPlus} />
      )}
    </span>
  </div>);
};

export default Tags;
