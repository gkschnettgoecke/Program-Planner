import React, { Component } from "react";

class SubEvent extends Component {
    state = {};

    getStyle = () => {
        return {
            background: "#f4f4f4",
            width: "90",
            maxWith: "40rem",
            margin: "2rem atuo",
            border: "1px solid #ccc",
            padding: "1rem",
        };
    };

    render() {
        const { subEvent, onDelete } = this.props;
        return (
            <div style={this.getStyle()}>
                <h3>{subEvent.title}</h3>
                <h3>{subEvent.description}</h3>
                <h3>{subEvent.date}</h3>
                <h3>{subEvent.time}</h3>
                <button
                    onClick={() => this.props.onDelete(this.props.subEvent.title)}
                    className="btn btn-danger btn-sm m-2"
                >
                    Delete
                </button>
            </div>
        );
    }
}

export default SubEvent;
