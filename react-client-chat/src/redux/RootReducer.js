import { combineReducers } from 'redux';

import { loginReducer } from './reducers/LoginReducer';
import { connectionReducer } from './reducers/ConnectionReducer';
import { messagesReducer } from './reducers/MessagesReducer';

const logReducer = (state = {}, action) => { console.log(action); return state; }


export const rootReducer = combineReducers({
   connection: connectionReducer,
   login: loginReducer,
   messages: messagesReducer,
   log: logReducer
});
