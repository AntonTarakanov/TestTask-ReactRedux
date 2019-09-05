import React, { Component }  from 'react';
import CompanyCard from './Company/Card';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="testTask_app__wrap">
                <CompanyCard/>
            </div>
        );
    }
}

export default App;
