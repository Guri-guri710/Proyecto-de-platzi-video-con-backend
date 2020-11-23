import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider }  from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import initialState from '../frontend/initialState';
import reducer from '../frontend/reducers/index';
import serverRouter from '../frontend/routes/serverRoutes'

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

  }

  const setResponse = (html) => {
      return(`
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="assets/app.css" type="text/css" / >
              <title>Platzi video</title>
          </head>
          <body>
              <div id="app">${html}</div>
              <script src="assets/app.js" type="text/javascript"></script>
          </body>
      </html>
      `);
  }

const renderApp = (req, res) => {
    const store =  createStore(reducer,initialState);
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRouter)}
            </StaticRouter>
        </Provider>,
    );
    res.send(setResponse(html))
}

app.get('*', renderApp);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log('Server running on port 3000');
});


