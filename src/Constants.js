const CONSTANTS_LIST = [
    'GET_COMPANY_LIST',
    'GET_COMPANY_LIST_SUCCESS',

    'COMPANY_READ',
    'COMPANY_READ_SUCCESS',

    'COMPANY_UPDATE',
    'COMPANY_UPDATE_SUCCESS',

    /* Для каждого можно добавить ошибку. По началу действия повесить лоадер. */
    'ERROR'
];

function createConstantsObj(constantsList) {
    const result = {};
    constantsList.forEach(item => {
        result[item] = item;
    });
    return result;
}

export default createConstantsObj(CONSTANTS_LIST);