'use strict';

import { Server } from 'hapi';
import routes from './routes/index';
import lout from 'lout'
import vision from 'vision';
import inert from 'inert';

const server = new Server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: true
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
