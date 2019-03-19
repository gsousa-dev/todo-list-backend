'use strict';

import { Server } from 'hapi';
import { fetchTasks } from './actions/todos';
import { ALL, DATE_ADDED } from './utils/todos.constants';
import routes from './routes/index';
import lout from 'lout'
import vision from 'vision';
import inert from 'inert';

const TTL = 5 * 60 * 1000; // 5 minutes

const server = new Server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

server.method('fetchTasks', fetchTasks, {
    cache: {
        expiresIn: TTL,
        generateTimeout: 3000
    },
    generateKey: (filter = ALL, orderBy = DATE_ADDED) => {
        return [filter, orderBy].join();
    }
});

server.route(routes);

const init = async () => {
    await server.register([vision, inert, lout]);
    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit();
});

init();

export default server;
