exports.handler = async (request) => {
  // TODO: User header to authenticate, not apiKey path param
  const newUrl = new URL(request.rawUrl.replace(/https?:[\/]{2}.*[\/]api/,
                                                'https://api.themoviedb.org'));
  newUrl.searchParams.append('api_key', process.env.API_KEY)
  const response = await fetch(newUrl);
  const statusCode = response.status;
  const body = await response.text();
  return {statusCode, body};
};
