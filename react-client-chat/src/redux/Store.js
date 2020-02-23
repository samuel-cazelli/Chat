import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './RootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));

//store.subscribe(() => { console.log("state changed:", store.getState()) });