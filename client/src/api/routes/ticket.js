import {BASE_URL,error_handler} from '../environment';

export const get_ticket = id => (
    fetch(BASE_URL + '/tickets/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json())
);

export const create_ticket = data => (
    fetch(BASE_URL + '/tickets', {
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