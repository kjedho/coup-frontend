import React from "react";
import "../components/Coup.css";

class Coup extends React.Component {
    initialize = () => {
        return {};
    };

    state = this.initialize();

    reset = () => {
        this.setState(this.initialize());
    };

    render() {
        return (
            <div>
            <h1>Coup</h1>
            </div>
        );
    }
}

export default Coup;