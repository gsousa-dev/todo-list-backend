'use strict';

import { Server } from 'hapi';

const server = new Server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

const init = async () => {
    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit();
});

init();

