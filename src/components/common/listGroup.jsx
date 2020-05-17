import React from 'react';

const ListGroup = (props) => {
  const { items, textProperty, onItemSelect, selectedItem } = props;
  return (
    <ul className='list-group'>
      {items.map((item, i) => (
        <li
          onClick={() => onItemSelect(item)}
          className={
            selectedItem.name === item.name
              ? 'list-group-item active'
              : 'list-group-item'
          }
          key={i}
          style={{ cursor: 'pointer' }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default ListGroup;
