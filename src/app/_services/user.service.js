import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getFacilities,
    bookFacility,
    isAvailable
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://localhost:4000/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:4000/users/register`, requestOptions).then(handleResponse);
}

function bookFacility(bookingDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
    };

    return fetch(`http://localhost:4000/bookingFacility/bookFacility`, requestOptions).then(handleResponse);
}

function isAvailable(bookingDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails)
    };

    return fetch(`http://localhost:4000/bookingFacility/isAvailable`, requestOptions).then(handleResponse);
}


function getFacilities() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/facilities`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                // window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}