# HTML-FW-MOCK-SERVER

I am introducing this package as a proposal for a tool to improve the work flow of our
front end teams. I am hoping others see value in this tool and would help contribute
to its refinement.

The server portion of this project started with a [boilerplate](https://github.com/developit/express-es6-rest-api). I don't have much experience writing
node applications and I am sure many improvements with the server scripts can be made.
(Like how to make the data creation asynchronous so serving thousands of rows wont make the server to hang.)

The data creation portion of this project is not required to run the server. Though I like the solution I wrote, there are other data gen scripts out there:
- [casual](https://github.com/boo1ean/casual)
- [Faker.js](https://github.com/marak/Faker.js/)
- [chance](http://chancejs.com/)

## About

This package contains scripts to start a local Node Express server and generate
fake data to serve from it's endpoints.

The server is intended to be installed in Isobar Air Force applications
and generate mock data as a backup for remote services, or to generate data 
during application development.

## Structure

#### `/src`
Scripts related to creating a server.

#### `/lib`
Scripts related to generating data. See the [README](./lib/README.md)

#### `/sandbox`
A playground to test scripts and provide examples. No meaningful code should be
exported from here.

The `npm` scripts for this package will build and serve this directory. This
will be an allegory for the `__mock__` directory in an application. See docs
that [don't exist yet](?)

#### `/data`
JSON files for seeding data creating functions.

## Scripts

- `start`: Run the server. It must be built first.
- `watch`: Run the server for development. Nodemon will watch for changed files and reload
the server
- `build`: Build the `sandbox` directory to `target`. Run `mock` after.

## Usage
To build an endpoint for our server we will use the `api()` function. It is a
convenience method to generate routes with Express Router.
```
import { api, mock } from 'html-fw-mock-server
import config from './config.json'

const routes = api({
  '/rest/path': ({ body }) => 'You POSTed to "/rest/path"'
});

export default mock(api, config);
```

Running this script will start an Express server on port 3000.

### Running
The server scripts must be built using `babel` before starting the server. Using
the npm script `npm run build` the sandbox directory will be built.

The server can be started with `npm run start`. Or if actively developing,
the server can be run watch mode with `npm run watch`.  

## Application Integration
TODO


