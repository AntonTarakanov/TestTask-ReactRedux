import React, { Component }  from 'react';
import CompanyCard from './Company/Card';
import List from './Common/List';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="testTask_app__wrap">
                <CompanyCard/>
                <List/>
            </div>
        );
    }
}

export default App;
