/*
 * @Author: Arpit Yadav 
 * @Date: 2018-08-19 13:28:31 
 * @Last Modified by: Arpit Yadav
 * @Last Modified time: 2018-08-19 13:30:27
 */
const handlers = require('./handlers/handlers');
const router = {};

router.hello = handlers.hello;

module.exports = router;
