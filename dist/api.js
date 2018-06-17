'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = require('express');

var _package = require('../package.json');

/**
 * Function to create POST api endpoints. The provided `routes` object uses its
 * keys as the route path, and value as a function to handle the route.
 * @param {object} routes - Object with functions as values
 * @return {Router} Express Router
 * @example
 * const demoApi = api({
 *   '/rest/1': () => 1,
 *   '/rest/2': () => 'abc';
 * })
 *
 * app.use('/', demoApi);
 */
var api = function api(routes) {
  var router = (0, _express.Router)();

  var routeKeys = Object.keys(routes);
  Object.entries(routes).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    // typecheck here

    var url = key;
    var method = 'post';

    /* Temp idea to support GET requests
     * {
     *  'GET/rest/getendpoint': () => 'You GET me!',
     *  'rest/postendpoint: () => 'POSTed!'
     * }
     */
    if (url.indexOf('GET') === 0) {
      url = url.replace('GET', '');
      method = 'get';
    }

    var endpoint = value;
    router[method](url, function (_ref3, res) {
      var body = _ref3.body,
          params = _ref3.params;

      res.json(endpoint(body, params));
    });
  });

  // Print some data at api root
  router.get('/', function (req, res) {
    res.json({ version: _package.version, routes: routeKeys });
  });

  router.use(function (req, res) {
    res.status(404).send({
      status: '404',
      method: req.method,
      requestUrl: req.originalUrl,
      body: req.body,
      routes: routeKeys
    });
  });

  return router;
};

exports.default = api;
//# sourceMappingURL=api.js.map