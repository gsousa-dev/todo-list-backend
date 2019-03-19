'use strict';

import { ALL, COMPLETE, DATE_ADDED, DELETED, DESCRIPTION, INCOMPLETE } from '../utils/todos.constants';
import uuidv1 from 'uuid/v1';
import Hoek from 'hoek';

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

    actions: {
        getTasks: async (filter = ALL, orderBy = DATE_ADDED) => {
            await Hoek.wait(2000);

            const filteredTasks = DB.tasks.filter((task) => {
                if (filter === ALL && task.state !== DELETED) {
                    return true;
                }

                return task.state === filter;
            });

            return [...filteredTasks].sort((a, b) => {
                switch (orderBy) {
                    case DESCRIPTION:
                        if (a.description.toLowerCase() > b.description.toLowerCase()) {
                            return 1;
                        }

                        if (a.description.toLowerCase() < b.description.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    case DATE_ADDED:
                        return a.dateAdded - b.dateAdded;
                }
            });
        },

        createTask: (description) => {
            if (!description) {
                return;
            }

            const newTask = {
                id: uuidv1(),
                dateAdded: Date.now(),
                description,
                state: 'INCOMPLETE'
            };

            DB.tasks.push(newTask);
        
            return newTask;
        },

        updateTask: (id) => {
            const index = DB.tasks.findIndex((task) => {
                return task.state !== DELETED && task.id === id;
            });

            if (index === -1) {
                return;
            }

            DB.tasks[index].state = (DB.tasks[index].state === COMPLETE) ? INCOMPLETE : COMPLETE

            return DB.tasks[index];
        },

        deleteTask: (id) => {
            const index = DB.tasks.findIndex((task) => {
                return task.state !== DELETED && task.id === id;
            });

            if (index === -1) {
                return;
            }

            DB.tasks[index].state = DELETED;
        
            return DB.tasks[index];
        }
    },

};

export default DB;
