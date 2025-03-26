const popular_urls = {
  tv: '/api/3/tv/popular',
  movie: '/api/3/movie/popular',
  in_theaters: '/api/3/movie/now_playing'
};

/**
 * @function
 * @param {'tv'|'movie'|'in_theaters'} type
 * @returns {Promise<any>}
 */
function popular(type) {
  return fetch(popular_urls[type])
    .then(r => r.json())
    .then(json => json.results);
}

export {popular};
