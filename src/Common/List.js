import {PureComponent} from 'react';
import {ACTION} from './modules';
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
        getCompanyRecord: () => dispatch({ type: ACTION.GET_INFO, method: '/getUniversalList' })
    };
};

function mapStateToProps(state) {
    return {
        listInfo: state.baseComponentsReducer.infoList
    };
}

class List extends PureComponent {

    constructor(props) {
        super(props);
        this.props.getCompanyRecord();
    }

    render() {
        console.log(this.props.listInfo);

        return 'Hello'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);