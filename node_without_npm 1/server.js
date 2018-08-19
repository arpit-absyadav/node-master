/*
 * @Author: Arpit Yadav 
 * @Date: 2018-08-07 23:16:49 
 * @Last Modified by: Arpit Yadav
 * @Last Modified time: 2018-08-19 13:50:28
 */

const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config/config');
const handlers = require('./src/handlers/handlers');
const router = require('./src/router');
// const router = require('./src/router');

// Configure the server to respond to all requests with a string
const server = http.createServer((req, res) => {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  //Get the headers as an object
  const headers = req.headers;

  // Get the payload,if any
  const decoder = new stringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();

    console.log(router);
    const chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      statusCode = typeof statusCode == 'number' ? statusCode : 200;

      payload = typeof payload == 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('Returning this response: ', statusCode, payloadString);
    });
  });
});

server.listen(config.port, () => {
  console.log(
    'The server is running on port ' +
      config.port +
      ' in ' +
      config.envName +
      ' mode.'
  );
});
