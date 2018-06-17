import { Router } from 'express'
import { version } from '../package.json'

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
const api = routes => {
  const router = Router()

  const routeKeys = Object.keys(routes)
  Object.entries(routes).forEach(([key, value]) => {
    // typecheck here

    let url = key
    let method = 'post'

    /* Temp idea to support GET requests
     * {
     *  'GET/rest/getendpoint': () => 'You GET me!',
     *  'rest/postendpoint: () => 'POSTed!'
     * }
     */
    if (url.indexOf('GET') === 0) {
      url = url.replace('GET', '')
      method = 'get'
    }

    const endpoint = value
    router[method](url, ({ body, params }, res) => {
      res.json(endpoint(body, params))
    })
  })

  // Print some data at api root
  router.get('/', (req, res) => {
    res.json({ version, routes: routeKeys })
  })

  router.use((req, res) => {
    res.status(404).send({
      status: '404',
      method: req.method,
      requestUrl: req.originalUrl,
      body: req.body,
      routes: routeKeys
    })
  })

  return router
}

export default api
