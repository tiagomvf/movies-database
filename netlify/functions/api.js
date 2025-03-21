//  const options = {
//    method: 'GET',
//    headers: {
//      accept: 'application/json',
//      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGZmNGMwMjE1Y2MyOTM4NDQ0NzFlNGMzOGRhMGE4NCIsInN1YiI6IjY0Mjg3NDRlMGYzNjU1MDBkMjdhMjQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OVU1QdK3D8Ak73THorxkr85QbntX8j9QjIHA8x7DWCI'
//    }
//  };

// fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));


exports.handler = async (request) => {
  // TODO: User header to authenticate, not apiKey path param
  const newUrl = request.rawUrl.replace(/https?:[\/]{2}.*[\/]api/, 'https://api.themoviedb.org');
  const response = await fetch(newUrl);
  const statusCode = response.status;
  const body = await response.text();
  return { statusCode, body };
};

