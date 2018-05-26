import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

/**
 * Create an Express server to run mock endpoints
 * @param {Router} api - Express Router object
 * @param {object} config - TBD. This was from the boilerplate. Maybe we want to
 * configure the app root or other information from an apps `application.config.js`.
 */
const mock = (api, config) => {
  const app = express();
  app.server = http.createServer(app);

  // Logging
  app.use(morgan('dev'));

  app.use(cors({
    exposedHeaders: config.corsHeaders
  }));

  app.use(bodyParser.json());

  app.use('/', api);

  app.server.listen(process.env.PORT || config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Started on port ${app.server.address().port}`);
  });
};

export default mock;
