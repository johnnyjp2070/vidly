import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (item) => <Link to={`/movies/${item._id}`}>{item.title}</Link>,
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      label: 'Like',
      content: (item) => (
        <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
      ),
    },
  ];

  deleteColumn() {
    return {
      label: 'Action',
      content: (item) => {
        return (
          <button
            onClick={() => this.props.onDelete(item)}
            className='btn btn-danger btn-sm'
          >
            Delete
          </button>
        );
      },
    };
  }

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn());
    }
  }
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

export default MoviesTable;
