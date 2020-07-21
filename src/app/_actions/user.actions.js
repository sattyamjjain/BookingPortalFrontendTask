import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllFacilities,
    bookFacility,
    isAvailable
};

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
                user => { 
                    history.push('/');
                },
                error => {
                    console.log('error',error)
                }
            );
    };
}

function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        userService.register(user)
            .then(
                user => { 
                    console.log('users',user)
                    history.push('/login');
                },
                error => {
                    console.log('error',error)
                }
            );
    };
}

function bookFacility(bookingDetails) {
    return userService.bookFacility(bookingDetails).then(
        res => { 
            console.log('result book',res)
        },
        error => {
            console.log('error',error)
        }
    );
}

function isAvailable(bookingDetails) {
    return userService.isAvailable(bookingDetails)
}

function getAllFacilities() {
    return dispatch => {
        userService.getFacilities()
            .then(
                users => console.log('users',users),
            );
    };
}