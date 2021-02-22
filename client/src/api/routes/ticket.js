import {BASE_URL,error_handler} from '../environment';

export const get_assigned_tickets = () => (
    fetch(BASE_URL + '/tickets/assigned', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json())
);

export const submit_status = (status,id) => (
    fetch(BASE_URL + '/tickets/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({status})
    })
    .then(error_handler)
    .then(res => res.json())
);

export const submit_severity = (severity,id) => (
    fetch(BASE_URL + '/tickets/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({severity})
    })
    .then(error_handler)
    .then(res => res.json())
);

export const submit_comment = (data) => (
    fetch(BASE_URL + '/comment', {
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