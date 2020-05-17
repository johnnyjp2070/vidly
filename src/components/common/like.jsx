import React from 'react';

const Like = (props) => {
  let classes = 'fa-heart';
  if (!props.liked) {
    classes += ' far ';
  } else {
    classes += ' fas ';
  }
  return (
    <i
      className={classes}
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
    ></i>
  );
};

export default Like;
