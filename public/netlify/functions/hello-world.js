exports.handler = async (request) => {
  console.log(JSON.stringify(request, null, 2));
  return {
    statusCode: 200,
    body: 'hello world!',
  };
};

