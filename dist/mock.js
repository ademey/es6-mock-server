'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an Express server to run mock endpoints
 * @param {Router} api - Express Router object
 * @param {object} config - TBD. This was from the boilerplate. Maybe we want to
 * configure the app root or other information from an apps `application.config.js`.
 */
var mock = function mock(api) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config2.default;

  var app = (0, _express2.default)();
  app.server = _http2.default.createServer(app);

  // Logging
  app.use((0, _morgan2.default)('dev'));

  app.use((0, _cors2.default)({
    exposedHeaders: config.corsHeaders
  }));

  app.use(_bodyParser2.default.json());

  app.use('/', api);

  app.server.listen(process.env.PORT || config.port, function () {
    console.log('Started on port ' + app.server.address().port);
  });
};

exports.default = mock;
//# sourceMappingURL=mock.js.map