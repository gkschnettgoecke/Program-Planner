import React, { Component } from "react";
import NavBar from "./components/NavBar";
import SubEvents from "./components/SubEvents";
import NewEvent from "./NewEventPage";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
    state = {
        sub_events: [
            { title: "Session 1", description: "App Sec", data: "", time: "" },
            {
                title: "Session 2",
                description: "Clean Code",
                data: "",
                time: "",
            },
            { title: "Session 3", description: "Dev ops", data: "", time: "" },
        ],
    };

    constructor() {
        super();
    }

    // Delete SubEvent
    delSubEvent = (subEventID) => {
        const newSubEvents = this.state.sub_events.filter(
            (subEvent) => subEventID !== subEvent.title
        );
        this.setState({ sub_events: newSubEvents });
    };

    onAdd = (data) => {
        console.log(data);
        const newSubEvents = this.state.sub_events.concat(data);
        // console.log(this.state.sub_events);
        // this.setState({ sub_events: newSubEvents });
    };

    handleNoEvents = () => {
        return this.state.sub_events.length === 0 ? (
            <h1>Click Add Event To Create New Events</h1>
        ) : (
            <h1></h1>
        );
    };

    render() {
        console.log(this.state.sub_events);
        console.log(this.state.sub_events.length);
        return (
            <Router>
                <div className="App">
                    <NavBar />

                    <Switch>
                        <Route
                            path="/newevent"
                            exact
                            render={(props) => (
                                <NewEvent {...props} onAdd={this.onAdd} />
                            )}
                        />
                    </Switch>
                    <SubEvents
                        subEvents={this.state.sub_events}
                        onDelete={this.delSubEvent}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
