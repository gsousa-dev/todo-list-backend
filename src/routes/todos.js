'use strict';

import Handlers from './handlers/todos';
import Validators from './validators/todos';

const routes = [
    { // Fetch tasks
        method: 'GET',
        path: '/todos',
        handler: Handlers.fetchTasks,
        options: {
            validate: Validators.fetchTasks
        }
    },
    { // Create a task
        method: 'PUT',
        path: '/todos',
        handler: Handlers.createTask,
        options: {
            validate: Validators.createTask
        }
    },
    { // Update a task
        method: 'PATCH',
        path: '/todo/{id}',
        handler: Handlers.updateTask,
        options: {
            validate: Validators.updateTask
        }
    },
    { // Delete a task
        method: 'DELETE',
        path: '/todo/{id}',
        handler: Handlers.deleteTask,
        options: {
            validate: Validators.deleteTask
        }
    }
];

export default routes;
