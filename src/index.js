import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* ------------------ Redux ------------------ */
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { reducer as form } from 'redux-form'
import { reducer as baseReducer } from "./reducer";
import sagas from "./sagas";

const reducers = combineReducers({ baseReducer, form });
const sagaMiddleware = createSagaMiddleware();
let store = createStore(
    reducers,
    compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();