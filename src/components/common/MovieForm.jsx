import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import { getMovie, saveMovie } from '../../services/movieService';
import { getGenres } from '../../services/genreService';

class Movieform extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number in Stock'),
    genreId: Joi.string().required().label('Genre'),
    dailyRentalRate: Joi.number().min(0).max(100).required().label('Rate'),
  };

  componentDidMount = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });

      // if (!movie) return this.props.history.replace('/not-found');
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status < 500)
        this.props.history.replace('/not-found');
    }
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async (e) => {
    e.preventDefault();
    await saveMovie(this.state.data);

    this.props.history.push('/movies');
  };

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center height-100'>
        <div className='login-form col-4'>
          <h1>Add Movie</h1>
          <form onSubmit={this.doSubmit}>
            {this.renderInput('title', 'Title')}
            {this.renderSelect('genreId', 'Genre', this.state.genres)}
            {this.renderInput('numberInStock', 'Number in Stock')}
            {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
            {this.renderButton('Add Movie')}
          </form>
        </div>
      </div>
    );
  }
}

export default Movieform;
