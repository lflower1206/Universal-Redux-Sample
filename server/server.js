import path from 'path';
import fs from 'fs';
import Express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../src/store/configureStore';
import App from '../src/containers/App';

import { fetchPostsIfNeeded } from '../src/actions/redditPosts';

const app = new Express();
const port = 3000;

var handleRender = function(req, res) {

    const defaultSelectedReddit = 'reactjs';
    const store = configureStore({});

    store.dispatch(fetchPostsIfNeeded(defaultSelectedReddit));

    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    console.log('state : %o', store.getState());

    res.send(renderFullPage(html, store.getState())); 
};

var renderFullPage = function(html, initialState) {

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Universal Redux Sample</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
            </body>
        </html>
    `;

};

// app.use(handleRender);

app.get('/', handleRender);

app.get('/api/reactjs', (req, res) => {
    fs.readFile(path.join(__dirname, '/api/reactjs.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.send(data);
    });
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`Listening on port ${port} ......`);
    }
});
