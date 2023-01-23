import { applyMiddleware, configureStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const store = configureStore(rootReducer, applyMiddleware(thunk));

export default store;