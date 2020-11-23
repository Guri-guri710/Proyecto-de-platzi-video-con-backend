import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider }  from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import initialState from '../frontend/initialState';
import reducer from '../frontend/reducers/index';
import serverRouter from '../frontend/routes/serverRoutes';
import getManifest from './getManifest';

dotenv.config();
const { ENV , PORT } = process.env;
const app = express();

if (ENV === 'development') {
    console.log('Development config');
    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const { publicPath } = webpackConfig.output;
    const serverConfig = { serverSideRender: true, publicPath };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));

  }else{
      app.use((req, res ,next) => {
        if(!req.hashManifest)req.hashManifest = getManifest();
        next();
      })
      app.use(express.static(`${__dirname}/public`));
      app.use(helmet());
      app.use(helmet.permittedCrossDomainPolicies());
      app.disable('x-poweder-by')
  }

  const setResponse = (html, preloadedState, manifest) => {
      const mainStyless = manifest ? manifest['vendors.css'] : 'assets/app.css';
      const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
      const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
      return(`
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href=${mainStyless} type="text/css" / >
              <title>Platzi video</title>
          </head>
          <body>
              <div id="app">${html}</div>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                /</g,
                '\\u003c'
              )}
              </script>
             <script src=${mainBuild} type="text/javascript">
             <script src=${vendorBuild} type="text/javascript">
          </body>
      </html>
      `);
  }

const renderApp = (req, res) => {
    const store =  createStore(reducer,initialState);
    const preloadedState = store.getState();
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRouter)}
            </StaticRouter>
        </Provider>,
    );
    res.send(setResponse(html ,preloadedState, req.hashManifest))
}

app.get('*', renderApp);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
});


