'use strict';

import { Server } from 'hapi';
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
