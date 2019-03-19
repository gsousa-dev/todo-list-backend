'use strict';

import DB from '../../db';
import server from '../../server';

const Handlers = {

    fetchTasks: async (request, h) => {
        try {
            const { filter, orderBy } = request.query;

            const tasks = await server.methods.fetchTasks(filter, orderBy);

            return h.response(tasks).code(200);
        } catch (error) {
            console.log(error);

            return h.response().code(500);
        }
    },

    createTask: async (request, h) => {
        try {
            const newTask = DB.actions.createTask(request.payload.description);
    
            if (!newTask) {
                return h.response().code(400);
            }

            await server.methods.fetchTasks.cache.drop();

            return h.response(newTask).code(201);
        } catch (error) {
            console.log(error);

            return h.response().code(500);
        }
    },

    updateTask: async (request, h) => {
        try {
            const id = encodeURIComponent(request.params.id);
            const updatedTask = DB.actions.updateTask(id);
            
            if (!updatedTask) {
                return h.response().code(404);
            }

            await server.methods.fetchTasks.cache.drop();

            return h.response(updatedTask).code(200);
        } catch (error) {
            console.log(error);

            return h.response().code(500);
        }
    },

    deleteTask: async (request, h) => {
        try {
            const id = encodeURIComponent(request.params.id);
            const deletedTask = DB.actions.deleteTask(id);
            
            if (!deletedTask) {
                return h.response().code(404);
            }

            await server.methods.fetchTasks.cache.drop();

            return h.response().code(200);
        } catch (error) {
            console.log(error);

            return h.response().code(500);
        }
    }

};

export default Handlers;
