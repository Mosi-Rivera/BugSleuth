import {BASE_URL,error_handler} from '../environment';

export const remove_worker = worker_id => (
    fetch(BASE_URL + '/worker/' + worker_id,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res => res.json())
);

export const get_workers_by_project = project_id => (
    fetch(BASE_URL + '/worker/all/' + project_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res => res.json())
);

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

export const invite_worker = data => (
    fetch(BASE_URL + '/worker',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(error_handler)
    .then(res => res.json())
)