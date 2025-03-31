
/**
 * @function
 * @param {'tv'|'movie'|'in_theaters'} type
 * @returns {Promise<any>}
 */
function popular(type) {
  const popular_urls = {
    tv : '/api/3/tv/popular',
    movie : '/api/3/movie/popular',
    in_theaters : '/api/3/movie/now_playing'
  };
  return fetch(popular_urls[type])
      .then(r => r.json())
      .then(json => json.results);
}

/**
 * @function
 * @param {'day'|'week'} type
 * @returns {Promise<any>}
 */
function trendings(range) {
  return fetch(`/api/3/trending/all/${range}`)
      .then(response => response.json())
      .then(json => json.results);
}
/**
 * @function
 * @param {'day'|'week'} type
 * @returns {Promise<any>}
 */
function freeToWatch(type) {
  const url = `/api/3/discover/${
      type}\?with_watch_monetization_types\=free&sort_by\=popularity.desc\&watch_region\=US\&certification_country=\US`
  return fetch(url)
      .then(response => response.json())
      .then(json => json.results);
}
export {popular, trendings, freeToWatch};
