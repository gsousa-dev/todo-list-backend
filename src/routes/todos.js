'use strict';

import Handlers from './handlers/todos';

const routes = [
    { // Fetch tasks
        method: 'GET',
        path: '/todos',
        handler: Handlers.fetchTasks
    },
    { // Create a task
        method: 'PUT',
        path: '/todos',
        handler: Handlers.createTask
    },
    { // Update a task
        method: 'PATCH',
        path: '/todo/{id}',
        handler: Handlers.updateTask
    },
    { // Delete a task
        method: 'DELETE',
        path: '/todo/{id}',
        handler: Handlers.deleteTask
    }
];

export default routes;
