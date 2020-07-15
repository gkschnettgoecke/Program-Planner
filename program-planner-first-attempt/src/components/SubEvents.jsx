import React, { Component } from "react";
import SubEvent from "./SubEvent";

class SubEvents extends Component {
    render() {

        const { subEvents } = this.props;
        return (
            <div>
                {subEvents.map((subEvent) => (
                    <SubEvent 
                        key={subEvent.title}
                        subEvent={subEvent}
                        onDelete={this.props.onDelete}
                    ></SubEvent>
                ))}

            </div> 
        );
    }
}

export default SubEvents;
