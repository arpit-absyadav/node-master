/*
 * @Author: Arpit Yadav 
 * @Date: 2018-08-19 13:28:39 
 * @Last Modified by: Arpit Yadav
 * @Last Modified time: 2018-08-19 13:41:41
 */
const handlers = {};

handlers.hello = (data, callback) => {
  callback(406, { message: 'Welcome to the world of miracle.' });
};
// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

module.exports = handlers;
