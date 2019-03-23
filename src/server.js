'use strict';

import { Server } from 'hapi';
import { ALL, DATE_ADDED } from './utils/todos.constants';
import DB from './db/index';
import routes from './routes/index';
import lout from 'lout'
import vision from 'vision';
import inert from 'inert';

const TTL = 5 * 60 * 1000; // 5 minutes

const server = new Server({
    port: 3001,
    host: 'localhost',
    routes: {
        cors: true
    }
});

let cacheKeys = [];

const clearCache = () => {
    if (cacheKeys.length) {
        cacheKeys.forEach(async (key) => {
            await server.methods.fetchTasks.cache.drop(key);
        });
    
        cacheKeys = [];
    }
};

server.method('clearCache', clearCache);

server.method('fetchTasks', DB.actions.getTasks, {
    cache: {
        expiresIn: TTL,
        generateTimeout: 4000
    },
    generateKey: (...args) => {
        let [ filter, orderBy ] = args;

        filter = filter || ALL;
        orderBy = orderBy || DATE_ADDED;

        const key = args.join();

        if (!cacheKeys.includes(key)) {
            cacheKeys.push(key);
        }

        return args.join();
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
