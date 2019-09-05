import axios from 'axios'
import MockAdapter from "axios-mock-adapter"
const mock = new MockAdapter(axios);
const CommonData = getCommonData();

mock.onGet('/getCompanyList').reply(200, getCompanyArray());

mock.onGet(/\/companyRead\/\d+/).reply((requestInfo) => {
    return [200, getCompanyObj(requestInfo.url.split('/')[2])]
});

mock.onPatch(/\/companyUpdate\/\d+/).reply(requestInfo => {
    const companyObj = JSON.parse(requestInfo.data);
    setCompanyObj(companyObj);
    return [200, companyObj];
});

function getCommonData() {
    const result = [];
    for (let i = 0; i < 10; i++) {
        const id = i + 1;
        result.push({
            companyId: id,
            companyName: ['companyName -', id].join(' '),
            OGRN: ['ogrn', id].join(''),
            type: i % 2 ? 'OOO' : 'ИП',
            regData: '1995-11-11',
            active: i % 2
        });
    }
    return result;
}

export function getCompanyArray(){
    return CommonData.map(item => {
        return {
            companyId: item.companyId,
            companyName: item.companyName
        };
    });
}

export function getCompanyObj(companyId){
    return CommonData.find(item => Number(companyId) === item.companyId);
}

export function setCompanyObj(newRecord){
    Object.assign(getCompanyObj(newRecord.companyId), newRecord);
}
