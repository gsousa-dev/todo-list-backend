'use strict';

import todoRoutes from './todos';
import Boom from 'boom';

const homeRoute = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return h.redirect().location('todos');
    },
    options: {
        plugins: {
            lout: false
        }
    }
};

const notFoundRoute = {
    method: 'GET',
    path: '/{path*}',
    handler: (request, h) => {
        return h.response(Boom.notFound('The route you\'re looking for does not exist.').output.payload)
                .code(404);
    },
    options: {
        plugins: {
            lout: false
        }
    }
};

const routes = [
    homeRoute,
    notFoundRoute,
    ...todoRoutes
];

export default routes;
