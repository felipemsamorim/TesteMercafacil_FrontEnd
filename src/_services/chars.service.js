import { config } from '../_constants';

export const charsService = {
    getAll,
    getAllCustom
};

function getAll(input) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/character${input == '' ? '' : '/?name='+input+''}`, requestOptions).then(handleResponse);
}

function getAllCustom(fullPath) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(fullPath, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}