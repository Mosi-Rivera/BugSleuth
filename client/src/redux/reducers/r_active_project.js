import {createAction,createReducer} from '@reduxjs/toolkit';
export const set_project     = createAction('set_project');
export const set_tickets     = createAction('set_tickets');
export const add_ticket      = createAction('add_ticket');
export const set_worker      = createAction('set_worker');
export const add_worker      = createAction('add_Worker');
export const set_all_workers = createAction('set_all_workers');
export const clear           = createAction('clear');
const state = {
    tickets: [],
    workers: [],
    project: null,
    worker_id: null,
    worker_role: null
};
export default createReducer(state,{
    [set_project.type]: (state,data) => {
        state.project = data.payload;
        return state;
    },
    [set_tickets.type]: (state,data) => {
        state.tickets = data.payload;
        return state;
    },
    [clear.type]: (state) => {
        state.tickets = [];
        state.project = null;
        return state;
    },
    [add_ticket.type]: (state,data) => {
        state.tickets.push(data.payload);
        return state;
    },
    [set_worker.type]: (state,data) => {
        let payload = data.payload;
        if (!payload)
            return state;
        state.worker_role   = payload.role;
        state.worker_id     = payload.id;
        return state;
    },
    [set_all_workers.type]: (state,data) => {
        state.workers = data.payload;
        return state;
    },
    [add_worker.type]: (state,data) => {
        state.workers.push(data.payload);
        return state;
    }
});