import {BASE_URL,error_handler} from '../environment';


export const is_logged_in = () => (
    fetch(BASE_URL + '/login',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json())
);


export const login = data => (
    fetch(BASE_URL + '/login',{
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

export const signup = data => (
    fetch(BASE_URL + '/signup',{
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
