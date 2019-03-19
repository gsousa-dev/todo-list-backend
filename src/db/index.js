'use strict';

import uuidv1 from 'uuid/v1';
import server from '../server';

// Fake Database
const DB = {
    tasks: [
        // Example todo
        {
            id: uuidv1(),
            dateAdded: Date.now(),
            description: 'Buy milk at the store',
            state: 'INCOMPLETE'
        }
    ],

    clear: () => {
        return server.methods.fetchTasks.cache.drop();
    }
};

export default DB;
