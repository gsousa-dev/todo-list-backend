'use strict';

const routes = [
    { // Fetch tasks
        method: 'GET',
        path: '/todos',
        handler: (request, h) => {

        }
    },
    { // Create a task
        method: 'PUT',
        path: '/todos',
        handler: (request, h) => {

        }
    },
    { // Update a task
        method: 'PATCH',
        path: '/todo/{id}',
        handler: (request, h) => {

        }
    },
    { // Delete a task
        method: 'DELETE',
        path: '/todo/{id}',
        handler: (request, h) => {
            
        }
    }
];

export default routes;
