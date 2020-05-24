import React from 'react';

const SearchBox = ({ name, onSearch }) => {
  return (
    <div className='form-group'>
      <input
        className='form-control'
        type='text'
        name={name}
        id={name}
        placeholder='Search...'
        onChange={(e) => onSearch(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;
