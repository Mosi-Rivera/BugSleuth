import {
    configureStore,
    combineReducers,
    createAction
} from '@reduxjs/toolkit';
import auth from './reducers/r_auth';
import projects from './reducers/projects';
import active_project from './reducers/r_active_project';
import active_ticket from './reducers/r_active_ticket';

export const USER_LOGOUT = createAction('USER_LOGOUT');

const app_reducers = combineReducers({
    auth,
    projects,
    active_project,
    active_ticket
});

const root_reducer = (state,action) => {
    if (action.type === USER_LOGOUT.type) {
        state = undefined;
    }

    return app_reducers(state,action);
}

export default configureStore({
    reducer: root_reducer
});
