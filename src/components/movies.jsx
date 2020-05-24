import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    PageSize: 3,
    searchQuery: '',
    selectedGenre: { name: 'All Generes' },
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ name: 'All Generes' }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    const { currentPage, PageSize } = this.state;
    this.setState({ movies: movies });
    if (
      currentPage > 1 &&
      movies.length % PageSize === 0 &&
      currentPage * PageSize > movies.length
    ) {
      this.handlePageChange(currentPage - 1);
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    console.log(query);
    this.setState({
      searchQuery: query,
      selectedGenre: { name: 'All Generes' },
      currentPage: 1,
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      PageSize,
      selectedGenre,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    //     : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, PageSize);

    return (
      <div className='container-lg'>
        <div className='row mt-4'>
          <div className='col-3'>
            <ListGroup
              items={this.state.genres}
              valueProperty='_id'
              textProperty='name'
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            ></ListGroup>
          </div>
          <div className='col'>
            <p>
              Showing {filtered.length} movies in the{' '}
              <b>"{selectedGenre.name}"</b> section.
            </p>
            <Link to='/movies/new' className='btn btn-primary mb-3'>
              Add Movie
            </Link>
            <SearchBox onSearch={this.handleSearch}></SearchBox>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            ></MoviesTable>
            <Pagination
              onPageChange={this.handlePageChange}
              itemsCount={filtered.length}
              pageSize={PageSize}
              currentPage={currentPage}
            ></Pagination>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
