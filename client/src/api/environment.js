export const BASE_URL = 'http://localhost:4200';//http://localhost:4200
export const error_handler = (res) => {
    if (!res.ok)
        throw new Error(res.statusText);
    else
        return res;

} 