import React, { Component } from 'react';

class MovieDetails extends Component {
  onSave = () => {
    // console.log(this.props.match.params.id);
    this.props.history.push('/movies');
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1 className='mt-3 ml-3'>Movie Form {match.params.id}</h1>
        <button className=' ml-3 btn btn-primary' onClick={this.onSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
