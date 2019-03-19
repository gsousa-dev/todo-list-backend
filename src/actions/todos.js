'use strict';

import { ALL, COMPLETE, DATE_ADDED, DELETED, DESCRIPTION, INCOMPLETE } from '../utils/todos.constants';
import uuidv1 from 'uuid/v1';
import DB from '../db/index';
import Hoek from 'hoek';

export const fetchTasks = async (filter = ALL, orderBy = DATE_ADDED) => {
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
                if (a.description.toLowerCase() > b.description.toLowerCase()) { // a.description is greater than b.description
                    return 1;
                }
                
                if (a.description.toLowerCase() < b.description.toLowerCase()) { // a.description is less than b.description
                    return -1;
                }
            
                return 0; // a.description must be equal to b.description
            case DATE_ADDED:
                return a.dateAdded - b.dateAdded;        
        }
    });
};

export const createTask = (description) => {
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
};

export const updateTask = (id) => {
    const index = DB.tasks.findIndex((task) => {
        return task.state !== DELETED && task.id === id;
    });

    if (index === -1) {
        return;
    }

    DB.tasks[index].state = (DB.tasks[index].state === COMPLETE) ? INCOMPLETE : COMPLETE

    return DB.tasks[index];
};

export const deleteTask = (id) => {
    const index = DB.tasks.findIndex((task) => {
        return task.state !== DELETED && task.id === id;
    });

    if (index === -1) {
        return;
    }

    DB.tasks[index].state = DELETED;

    return DB.tasks[index];
};
