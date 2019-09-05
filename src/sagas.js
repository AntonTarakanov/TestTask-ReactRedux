import { all, take, fork, call, put } from 'redux-saga/effects';
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

function* getCompanyListWatcher(){
    while(true){
        yield take(actionTypes.GET_COMPANY_LIST);
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
}

function* getCompanyReadWatcher(){
    while(true){
        const action = yield take(actionTypes.COMPANY_READ);
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
}

function* getCompanyUpdateWatcher(){
    while(true){
        const action = yield take(actionTypes.COMPANY_UPDATE);
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
}

export default function* root() {
    yield all([
        fork(getCompanyListWatcher),
        fork(getCompanyReadWatcher),
        fork(getCompanyUpdateWatcher)
    ])
}