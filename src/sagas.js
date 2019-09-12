import { all, takeEvery, fork, call, put, takeLatest } from 'redux-saga/effects';
import actionTypes from './Constants';
import axios from 'axios'

import './exampleData';

function getCompanyList(){
    return axios({
        method: 'get',
        url: '/getCompanyList'
    });
}

function companyRead(id){
    return axios({
        method: 'get',
        url: ['/companyRead/', id].join('')
    });
}

function companyUpdate(record){
    return axios({
        method: 'patch',
        data: record,
        url: ['/companyUpdate/', record.companyId].join('')
    })
}

function* takeCompanyList() {
    try {
        const response = yield call(getCompanyList);
        const companyList = response.data;
        yield put({
            type: actionTypes.GET_COMPANY_LIST_SUCCESS,
            companyList: companyList
        });
    } catch (error) {
        yield put({
            type: actionTypes.ERROR,
            error
        });
    }
}

function* takeCompanyRead(action) {
    try {
        const response = yield call(companyRead, action.id);
        const companyRecord = response.data;
        yield put({
            type: actionTypes.COMPANY_READ_SUCCESS,
            companyRecord: companyRecord
        });
    } catch (error) {
        yield put({
            type: actionTypes.ERROR,
            error
        });
    }
}

function* takeCompanyUpdate(action) {
    try {
        const response = yield call(companyUpdate, action.record);
        const companyRecord = response.data;
        yield put({
            type: actionTypes.COMPANY_UPDATE_SUCCESS,
            companyRecord: companyRecord
        });
    } catch (error) {
        yield put({
            type: actionTypes.ERROR,
            error
        });
    }
}

/**
 * Слушаем Action через takeLatest или takeEvery.
 */
function* getCompanyListWatcher() {
    yield takeLatest(actionTypes.GET_COMPANY_LIST, takeCompanyList);
}

function* getCompanyReadWatcher() {
    yield takeLatest(actionTypes.COMPANY_READ, takeCompanyRead);
}

function* getCompanyUpdateWatcher() {
    yield takeEvery(actionTypes.COMPANY_UPDATE, takeCompanyUpdate);
}

export default function* root() {
    yield all([
        fork(getCompanyListWatcher),
        fork(getCompanyReadWatcher),
        fork(getCompanyUpdateWatcher)
    ])
}