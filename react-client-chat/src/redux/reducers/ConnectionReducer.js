import { CONNECTION_REQUEST, CONNECTION_SUCCESS, CONNECTION_ERROR } from '../actions/ConnectionAction';
import { RealTime } from 'shared-client-chat/index';

const initialState = {
    realTime: new RealTime(),
    connected: false,
    connectionError: ''
}

export const connectionReducer = (state = initialState, action) => {
    switch (action.type) {

        case CONNECTION_REQUEST: return { ...state, connected: false };

        case CONNECTION_SUCCESS: return { ...state, connected: true };

        case CONNECTION_ERROR: return { ...state, connected: false, connectionError: action.connectionError };

        default: return state;

    }
}