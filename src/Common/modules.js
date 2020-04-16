import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'

import '../exampleData';

export const ACTION = {
    GET_INFO: 'GET_INFO',
    GET_INFO_SUCCESS: 'GET_INFO_SUCCESS',
    ERROR: 'ERROR'
};

const initialState = {
    infoList: [],
    loading: false
};

export function reducer(state = initialState, payload) {
    function getNewState(paramObj) {
        return Object.assign({}, state, paramObj);
    }
    switch (payload.type) {
        case ACTION.GET_INFO:
            return getNewState({loading: true});
        case ACTION.GET_INFO_SUCCESS:
            return getNewState({loading: false, infoList: payload.infoList});
        case ACTION.ERROR:
            return getNewState({loading: false});
        default:
            return state;
    }
}

function infoRequest(method) {
    console.log(method);
    return axios({
        method: 'get',
        url: 'getUniversalList'// getUniversalList
    });
}

function* getInfo(data) {
    console.log(data);
    try {
        const response = yield call(infoRequest, '');
        const infoList = response.data;
        yield put({
            type: ACTION.GET_INFO_SUCCESS,
            infoList
        });
    } catch (error) {
        yield put({
            type: ACTION.ERROR
        });
    }
}

/**
 * Слушаем Action через takeLatest или takeEvery.
 */
function* getInfoWatcher() {
    yield takeLatest(ACTION.GET_INFO, getInfo);
}

export const baseComponentsSaga = [
        fork(getInfoWatcher)
    ];
    /*yield all([
        fork(getInfoWatcher)
    ])*/
/*}*/
