import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter } from "react-router-dom";

import actionTypes from '../Constants';
import List from './List';
import Form from './Form';
import Info from './Info';

class CompanyList extends Component {

    constructor(props) {
        super(props);
        this.companyUpdate = this.companyUpdate.bind(this);
    }

    companyUpdate(values) {
        this.props.setCompanyRecord(values);
        window.location.hash = '/';
    };

    getFormView(){
        if (!this.props.companyRecord.companyId) {
            this.props.getCompanyRecord(window.location.hash.split('/')[3]);
        }
        return () => (
            <Form onSubmit={this.companyUpdate} initialValues={this.props.companyRecord}/>
        );
    }

    render() {
        return (
            <div className="testTask_company__wrap">
                Информация о компании:
                <HashRouter>
                    <div className="testTask_company__card">
                        <section>
                            <Route path="/company/edit/:id" exact render={this.getFormView()}/>
                            <Route path="/company/:id" exact component={Info}/>
                            <Route path="/" exact component={List}/>
                        </section>
                    </div>
                </HashRouter>
            </div>
        )
    };
}

/* Что именно нужно передать в "props" для данного компонента */
function mapStateToProps(state) {
    return {
        companyRecord: state.baseReducer.companyRecord
    };
}

/* Набор действий, которые вызываются в компоненте или в его дочерних. */
const mapDispatchToProps = dispatch => {
    return {
        setCompanyRecord: (record) => dispatch({ type: actionTypes.COMPANY_UPDATE, record: record }),
        getCompanyRecord: (id) => dispatch({ type: actionTypes.COMPANY_READ, id: id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);
