# EXPRESS-MOCK-SERVER

## About

This package contains scripts to start a local Node Express server and generate
fake data to serve from it's endpoints.

The server is intended to be installed for local development
and generate mock data as a backup for remote services, or to generate data
during application development.

## Structure

#### `/src`

Scripts related to creating a server.

#### `/lib`

Scripts related to generating data. See the [README](./lib/README.md)

#### `/sandbox`

A playground to test scripts and provide examples. No meaningful code should be
exported from here. The `sandbox/scratch` folder is excluded from source control.

## Scripts

* `start`: Run the server. It must be built first.
* `watch`: Run the server for development. Nodemon will watch for changed files and reload
  the server
* `build`: Build the `sandbox` directory to `target`. Run `mock` after.

## Usage

To build an endpoint for our server we will use the `api()` function. It is a
convenience method to generate routes with Express Router.

```
import { api, mock } from 'mock-server
import config from './config.json'

const routes = api({
  '/rest/path': ({ body }) => 'You POSTed to "/rest/path"'
});

export default mock(api, config);
```

Running this script will start an Express server on port 3000.

## History

The server portion of this project started with a [boilerplate](https://github.com/developit/express-es6-rest-api).

The data creation portion of this project is not required to run the server. Though I like the solution I wrote, there are other data gen scripts out there:

* [casual](https://github.com/boo1ean/casual)
* [Faker.js](https://github.com/marak/Faker.js/)
* [chance](http://chancejs.com/)
