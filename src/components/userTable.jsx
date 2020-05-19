import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';

class UserTable extends Component {
  columns = [
    { path: 'id', label: '#' },
    { path: 'title', label: 'Title' },
    { path: 'body', label: 'Body' },
    {
      label: 'Like',
      content: (item) => (
        <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
      ),
    },
    {
      label: 'Action',
      content: (item) => (
        <button
          onClick={() => this.props.onDelete(item)}
          className='btn btn-danger btn-sm'
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        onLike={onLike}
        onDelete={onDelete}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      ></Table>
    );
  }
}

export default UserTable;
