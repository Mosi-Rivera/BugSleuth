import {BASE_URL,error_handler} from '../environment';

export const get_worker = project_id => (
    fetch(BASE_URL + '/worker/data/' + project_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res => res.json())
);