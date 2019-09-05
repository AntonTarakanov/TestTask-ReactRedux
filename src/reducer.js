import actionTypes from './Constants'

const initialState = {
    companyList: [],
    companyRecord: {}
};

export function reducer(state = initialState, action) {
    function getNewState(paramObj) {
        return Object.assign({}, state, paramObj);
    }

    switch (action.type) {
        case actionTypes.GET_COMPANY_LIST_SUCCESS:
            if (action.companyList) {
                return getNewState({ companyList: action.companyList });
            }
            return state;

        case actionTypes.COMPANY_READ_SUCCESS:
            if (action.companyRecord) {
                return getNewState({ companyRecord: action.companyRecord });
            }
            return state;

        case actionTypes.COMPANY_UPDATE_SUCCESS:
            if (action.companyRecord && state.companyList.length) {
                const item = state.companyList.find((item) => item.companyId === action.companyRecord.companyId);
                item.companyName = action.companyRecord.companyName;
                return getNewState({ companyRecord: action.companyRecord });
            }
            return state;

        default:
            return state;
    }
}
