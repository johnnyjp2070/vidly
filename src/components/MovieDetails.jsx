import React, { Component } from 'react';
import MovieForm from '../components/common/MovieForm';

class MovieDetails extends Component {
  onSave = () => {
    // console.log(this.props.match.params.id);
    this.props.history.push('/movies');
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <MovieForm></MovieForm>
      </div>
    );
  }
}

export default MovieDetails;
