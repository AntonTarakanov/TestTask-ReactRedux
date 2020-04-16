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
import { reducer as baseComponentsReducer, baseComponentsSaga } from "./Common/modules";
import sagas from "./sagas";
import { all } from 'redux-saga/effects';

const reducers = combineReducers({ baseReducer, form, baseComponentsReducer });
const sagaMiddleware = createSagaMiddleware();
let store = createStore(
    reducers,
    compose(applyMiddleware(sagaMiddleware))
);
/*
*
*
* */

console.log(baseComponentsSaga);
console.log(sagas);
sagaMiddleware.run(function* () {
    yield all([...baseComponentsSaga, ...sagas]);
});
// sagaMiddleware.run();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();