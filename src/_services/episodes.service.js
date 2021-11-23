import { config } from '../_constants';

export const episodesService = {
    getAll,
};

function getAll(input) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/episode${input == '' ? '' : '/?name='+input+''}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}