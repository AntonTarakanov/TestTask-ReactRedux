import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import LoadingIndicator from '../LoadingIndicator';
import actionTypes from '../Constants';

class CompanyList extends Component {

    constructor(props) {
        super(props);
        props.getCompanyList();
    }

    getRenderList() {
        const list = [];
        if (this.props.companyList && this.props.companyList.length) {
            this.props.companyList.forEach(item => {
                list.push(<Link to={['/company/', item.companyId].join('')} key={item.companyId}>{item.companyName}</Link>);

            });
        }
        return (
            <div className="testTask_company__cardContent">
                {list}
            </div>
        )
    }

    render() {
        let returnResult;
        if (this.props.loadingList){
            returnResult = (<LoadingIndicator />);
        } else {
            returnResult = (
                <div className="testTask_company__wrap">
                    Список компаний:
                    {this.getRenderList()}
                </div>
            );
        }
        return returnResult;
    };
}

/* Что именно нужно передать в "props" для данного компонента */
function mapStateToProps(state) {
    return {
        companyList: state.baseReducer.companyList,
        loadingList: state.baseReducer.loadingList
    };
}

/* Набор действий, которые вызываются в компоненте или в его дочерних. */
const mapDispatchToProps = dispatch => {
    return {
        getCompanyList: () => dispatch({ type: actionTypes.GET_COMPANY_LIST })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);
