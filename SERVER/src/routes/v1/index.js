const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const queryRoute = require('./queries.route');
const bugRoute = require('./bugs.route');
const seatRoute = require('./seats.route');
const FileRoute = require('./files.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const hiredGuardsRoute = require('./hiredGuards.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/queries',
    route: queryRoute,
  },
  {
    path: '/bugs',
    route: bugRoute,
  },
  {
    path: '/seats',
    route: seatRoute,
  },
  {
    path: '/files',
    route: FileRoute,
  },
  {
    path: '/hiredGuards',
    route: hiredGuardsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
