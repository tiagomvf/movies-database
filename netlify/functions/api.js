const API_KEY="a0ff4c0215cc293844471e4c38da0a84";
exports.handler = async (request) => {
  // TODO: User header to authenticate, not apiKey path param

  const newUrl = new URL(request.rawUrl.replace(/https?:[\/]{2}.*[\/]api/, 'https://api.themoviedb.org'));
  newUrl.searchParams.append('api_key', API_KEY)
  const response = await fetch(newUrl);
  const statusCode = response.status;
  const body = await response.text();
  return { statusCode, body };
};

