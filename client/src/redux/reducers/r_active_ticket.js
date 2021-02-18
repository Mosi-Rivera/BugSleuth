import {createAction,createReducer} from '@reduxjs/toolkit';
export const set_ticket     = createAction('set-ticket');
export const add_comments   = createAction('set-comments');
export const add_history    = createAction('set-history');
export const set_all        = createAction('set-all');

const state = {
    ticket: null,
    comments: [],
    history: [],
};

export default createReducer(state,{
    [set_ticket.type]: (state,data) => {
        state.ticket = data.payload;
        return state;
    },
    [add_comments.type]: (state,data) => {
        state.comments.push(data.payload);
        return state;
    },
    [add_history.type]: (state,data) => {
        state.history.push(data.payload);
        return state;
    },
    [set_all.type]: (state,data) => {
        console.log(state.payload);
        state = data.payload;
        return state;
    }
});