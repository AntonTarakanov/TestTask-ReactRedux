import actionTypes from './Constants'

const initialState = {
    companyList: [],
    companyRecord: {}
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COMPANY_LIST_SUCCESS:
            console.log('GET_COMPANY_LIST_SUCCESS');
            if (action.companyList) {
                return { ...state, companyList: action.companyList };
            }
            return state;

        case actionTypes.COMPANY_READ_SUCCESS:
            console.log('COMPANY_READ_SUCCESS');
            if (action.companyRecord) {
                return { ...state, companyRecord: action.companyRecord };
            }
            return state;

        case actionTypes.COMPANY_UPDATE_SUCCESS:
            console.log('COMPANY_UPDATE_SUCCESS');
            console.log(action);
            if (action.companyRecord) {
                const item = state.companyList.find((item) => item.companyId === action.companyRecord.companyId);
                item.companyName = action.companyRecord.companyName;
                return Object.assign({}, { ...state, companyRecord: action.companyRecord });
                // return ;
            }
            return state;

        default:
            console.log(action);
            return state;
    }
}
