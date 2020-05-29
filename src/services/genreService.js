// export const genres = [
//   { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
//   { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
//   { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
// ];

import http from './httpService';

export function getGenres() {
  const genres = http.get(`/genres`);
  // console.log(genres.data);
  return genres;
}
