import "./index.css";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { useForm } from "react-hook-form";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
    const [sub_events, setSubEvents] = useState([
        {
            title: "Session 1",
            description: "App Sec",
            date: "2020-07-11",
            time: "03:09",
        },
        {
            title: "Session 2",
            description: "Clean Code",
            date: "2020-07-5",
            time: "03:09",
        },
        {
            title: "Session 3",
            description: "Dev ops",
            date: "2020-07-3",
            time: "03:09",
        },
    ]);

    const handleDelete = () => {};

    const handleNewEvent = (data) => {
        const newEvents = sub_events.concat(data);
        setSubEvents(newEvents);
        //console.log(newEvents);
    };

    return (
        <div className="App">
            <Navbar>
                <NavItems onAdd={handleNewEvent} />
            </Navbar>
            <Events subEvents={sub_events} onDelete={handleDelete} />
        </div>
    );
}

function Navbar(props) {
    return (
        <div>
            <nav className="navbar">{props.children}</nav>
        </div>
    );
}

function NavItems(props) {
    const [activeMenu, setActiveMenu] = useState("main");

    function NavItem(props) {
        const [open, setOpen] = useState(true);

        return (
            <li className="nav-item">
                <a
                    href="#"
                    className="icon-button"
                    onClick={() => {
                        setActiveMenu(props.menu);
                        setOpen(!open);
                    }}
                >
                    {props.icon}
                </a>

                {activeMenu === props.menu && open && props.children}
            </li>
        );
    }

    return (
        <ul className="navbar-nav">
            <NavItem icon={<PlusIcon />} menu="plus">
                <DropdownMenuPlus onAdd={props.onAdd} />
            </NavItem>

            <NavItem icon={<CaretIcon />} menu="caret">
                <DropdownMenuCaret />
            </NavItem>
        </ul>
    );
}

function DropdownMenuCaret(props) {
    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className="dropdown">
            <DropdownItem>Sign Out</DropdownItem>
        </div>
    );
}

function DropdownMenuPlus(props) {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <a
                href="#"
                className="menu-item"
                onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
            >
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    const onSubmit = (data) => {
        //console.log(data);
        props.onAdd(data);
    };

    return (
        <div
            className="dropdown"
            style={{ height: menuHeight }}
            ref={dropdownRef}
        >
            <CSSTransition
                in={activeMenu === "main"}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem
                        leftIcon={<CogIcon />}
                        rightIcon={<ChevronIcon />}
                        goToMenu="newEvent"
                    >
                        Add Event
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "newEvent"}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Event Details</h2>
                    </DropdownItem>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DropdownItem leftIcon={<BoltIcon />}>
                            Title:
                            <input
                                type="text"
                                placeholder="Event Title"
                                name="title"
                                ref={register}
                            />
                        </DropdownItem>

                        <DropdownItem leftIcon={<BoltIcon />}>
                            Description:
                            <input
                                type="text"
                                placeholder="Event Description"
                                name="description"
                                ref={register}
                            />
                        </DropdownItem>

                        <DropdownItem leftIcon={<BoltIcon />}>
                            Date:
                            <input type="date" name="date" ref={register} />
                        </DropdownItem>

                        <DropdownItem leftIcon={<BoltIcon />}>
                            Time:
                            <input type="time" name="time" ref={register} />
                        </DropdownItem>

                        <DropdownItem>
                            <input type="submit" />
                        </DropdownItem>

                        <DropdownItem goToMenu="main" leftIcon={<BoltIcon />}>
                            Close
                        </DropdownItem>
                    </form>
                </div>
            </CSSTransition>
        </div>
    );
}

function Events(props) {
    function Event(props) {
        return (
            <div className="event">
                <ul>
                    <li>
                        <span>
                            Title:{""}
                            {props.subEvent.title}
                        </span>
                    </li>
                    <li>
                        Description:{""}
                        {props.subEvent.description}
                    </li>
                    <li>
                        Date:{""}
                        {props.subEvent.date}
                    </li>
                    <li>
                        Time:{""}
                        {props.subEvent.time}
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="events">
            {props.subEvents.map((subEvent) => (
                <Event
                    key={subEvent.title}
                    subEvent={subEvent}
                    onDelete={props.onDelete}
                ></Event>
            ))}
        </div>
    );
}

export default App;
