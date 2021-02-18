import {BASE_URL,error_handler} from '../environment';

export const create_project = data => (
    fetch(BASE_URL + '/projects',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(error_handler)
    .then(res => res.json())
);

export const get_project_by_id = id => (
    fetch(BASE_URL + '/projects/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json())
)

export const get_projects = () => (
    fetch(BASE_URL + '/projects',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json())
)
