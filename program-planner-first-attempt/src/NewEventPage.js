import React, { Component } from "react";
import { useForm } from "react-hook-form";

export default function NewEvent(props) {
    const onSubmit = (data) => {
        props.onAdd(data);
        //console.log(data);
        document.getElementById("newevent-form").reset();
    };

    const { register, handleSubmit } = useForm();
    return (
        <div>
            <h2>Add New Event</h2>
            <form id="newevent-form"onSubmit={handleSubmit(onSubmit)}>
                Title:{" "}
                <input
                    name="title"
                    type="text"
                    placeholder="Event Title"
                    ref={register({ required: true, maxLength: 20 })}
                />
                <br></br>
                Description:{" "}
                <input
                    name="description"
                    type="text"
                    placeholder="Event Description"
                    ref={register}
                />
                <br></br>
                Date: <input name="date" type="date" ref={register} />
                <br></br>
                Time: <input name="time" type="time" ref={register} />
                <br></br>
                <button className="btn btn-primary m-2" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}
