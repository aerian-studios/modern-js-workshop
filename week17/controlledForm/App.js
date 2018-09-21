import React, { Component } from "react";
import RequestForm from './components/form';
import "./styles.css";
import ErrorBoundary from "./components/errorBoundary";

class App extends Component {
    render() {
        return (
        <div className="App">
            <ErrorBoundary>
                <RequestForm />
            </ErrorBoundary>
        </div>
        )
    }
}

export default App;
