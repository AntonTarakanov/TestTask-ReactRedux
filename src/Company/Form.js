import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import LoadingIndicator from '../LoadingIndicator';
import actionTypes from '../Constants';

class Form extends Component {

    render() {
        const {handleSubmit} = this.props;
        let returnResult;
        if (this.props.loadingCompany) {
            returnResult = (<LoadingIndicator />);
        } else {
            returnResult = (
                <form onSubmit={handleSubmit}>
                    <div className="testTask_company__formRow">
                        <label htmlFor="name">Наименование:</label>
                        <Field name="companyName" component="input" type="text"/>
                    </div>
                    <div className="testTask_company__formRow">
                        <label htmlFor="type">Тип организации:</label>
                        <Field name="type" component="select">
                            <option value="OOO">ООО</option>
                            <option value="ИП">ИП</option>
                        </Field>
                    </div>
                    <div className="testTask_company__formRow">
                        <label htmlFor="active">Активна:</label>
                        <Field name="active" component="input" type="checkbox"/>
                    </div>
                    <div className="testTask_company__formRow">
                        <label htmlFor="OGRN">ОГРН:</label>
                        <Field name="OGRN" component="input" type="text"/>
                    </div>
                    <div className="testTask_company__formRow">
                        <label>Дата регистрации:</label>
                        <Field name="regData" component="input" type="date"/>
                    </div>
                    <p>Идентификатор: {this.props.initialValues.companyId}</p>
                    <button type="submit">Сохранить</button>
                    <p><a href={'#/'}>К списку компаний</a></p>
                </form>
            );
        }
        return returnResult;
    }
}

function mapStateToProps(state) {
    return {
        initialValues: state.baseReducer.companyRecord,
        loadingCompany: state.baseReducer.loadingCompany
    };
}

Form = reduxForm({
    form: 'company',
    enableReinitialize: true
})(Form);

export default connect(mapStateToProps, actionTypes)(Form);
// export default Form
