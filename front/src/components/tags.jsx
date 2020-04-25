import React from "react";
import { Link } from "react-router-dom";

const Tags = ({ tags, search }) => {
  if (tags.length == 0) return null;
  const tagList = tags.map((tag) => (
    <Link key={tag.tag} to="/">
      <span className="tag" key={tag.tag} onClick={() => search(tag.tag)}>
        {tag.tag}
      </span>
    </Link>
  ));
  return <div className="tags centered m-b-sm">{tagList}</div>;
};

export default Tags;
