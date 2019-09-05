import React, { Component }  from 'react';
import { connect } from 'react-redux';
import actionTypes from '../Constants';

class Info extends Component {

    componentDidMount() {
        this.props.getCompanyRecord(window.location.hash.split('/')[2]);
    }

    render() {
        return (
            <div>
                <h3>Наименование: {this.props.companyRecord.companyName}</h3>
                <p>Тип: {this.props.companyRecord.type} - {this.props.companyRecord.active ? 'Активна' : 'Неактивна'}</p>
                <p>ОГРН: {this.props.companyRecord.OGRN}</p>
                <p>Дата регистрации: {this.props.companyRecord.regData}</p>
                <p>Идентификатор: {this.props.companyRecord.companyId}</p>
                <p><a href={['#/company/edit/', this.props.companyRecord.companyId].join('')}>Изменить</a></p>
                <p><a href={'#/'}>Назад</a></p>

            </div>
        );
    }
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
        getCompanyRecord: (id) => dispatch({ type: actionTypes.COMPANY_READ, id: id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
