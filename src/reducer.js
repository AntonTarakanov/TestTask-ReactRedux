import actionTypes from './Constants'

const initialState = {
    companyList: [],
    companyRecord: {},
    loadingList: false,
    loadingCompany: false
};

export function reducer(state = initialState, action) {
    function getNewState(paramObj) {
        return Object.assign({}, state, paramObj);
    }

    let result;

    switch (action.type) {
        case actionTypes.GET_COMPANY_LIST:
            return getNewState({ loadingList: true });

        case actionTypes.GET_COMPANY_LIST_SUCCESS:
            if (action.companyList) {
                result = getNewState({ companyList: action.companyList, loadingList: false });
            }
            return result ? result : state;

        case actionTypes.COMPANY_READ_SUCCESS:
            if (action.companyRecord) {
                result = getNewState({ companyRecord: action.companyRecord, loadingCompany: false });
            }
            return result ? result : state;

        case actionTypes.COMPANY_READ:
            return getNewState({ loadingCompany: true });

        case actionTypes.COMPANY_UPDATE_SUCCESS:
            if (action.companyRecord && state.companyList.length) {
                const item = state.companyList.find((item) => item.companyId === action.companyRecord.companyId);
                item.companyName = action.companyRecord.companyName;
                result = getNewState({ companyRecord: action.companyRecord });
            }
            return result ? result : state;

        default:
            return state;
    }
}
