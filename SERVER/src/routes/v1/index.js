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
const addServicesRoute = require('./addServices.route');
const router = express.Router();
const appDataRoute = require('./appData.route');
const path = require('path');
const fs = require('fs');
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
  {
    path: '/AddServices',
    route: addServicesRoute,
  },
  {
    path: '/AppData',
    route: appDataRoute,
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

router.get('/*', (req, res, next) => {
 let webAppPath = path.join(
            '/var/www/html/SERVER', "public", "index.html")
        if (fs.existsSync(webAppPath))
            res.sendFile(webAppPath);
        else
            res.send({ message: 'unavaliable' });

});

module.exports = router;
