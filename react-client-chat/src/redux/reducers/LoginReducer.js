import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/LoginAction';

const initialState = {
    isLoggedIn: false,
    errorMessageLogin: '',
}

export const loginReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOGIN_REQUEST: return state;

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            }


        case LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                errorMessageLogin: action.errorMessageLogin
            }

        default: return state;

    }
}