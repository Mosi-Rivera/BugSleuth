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