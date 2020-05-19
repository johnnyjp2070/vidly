import React, { Component } from 'react';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import UserTable from './userTable';
import _ from 'lodash';

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    PageSize: 10,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => this.setState({ users: json }))
      .catch((e) => console.log(e));
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleLike = (movie) => {
    const movies = [...this.state.users];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ users: movies });
  };
  handleDelete = (movie) => {
    const users = this.state.users.filter((m) => m.id !== movie.id);
    const { currentPage, PageSize } = this.state;
    this.setState({ users });
    if (
      currentPage > 1 &&
      users.length % PageSize === 0 &&
      currentPage * PageSize > users.length
    ) {
      this.handlePageChange(currentPage - 1);
    }
  };

  render() {
    const { length: count } = this.state.users;
    const { currentPage, PageSize, users, sortColumn } = this.state;
    console.log(users);
    if (count === 0) return <p>There are no user in the database.</p>;

    const sorted = _.orderBy(users, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, PageSize);

    return (
      <div className='container-lg'>
        <div className='row mt-4'>
          <div className='col'>
            <p>
              Showing <b>{movies.length}</b> of <b>{users.length} posts</b>
            </p>
            <UserTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            ></UserTable>
            <Pagination
              onPageChange={this.handlePageChange}
              itemsCount={users.length}
              pageSize={PageSize}
              currentPage={currentPage}
            ></Pagination>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
