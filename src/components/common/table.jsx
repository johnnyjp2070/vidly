import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, data, onLike, onDelete, onSort, sortColumn }) => {
  return (
    <table className='table'>
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      ></TableHeader>
      <TableBody
        data={data}
        onLike={onLike}
        onDelete={onDelete}
        columns={columns}
      ></TableBody>
    </table>
  );
};

export default Table;
