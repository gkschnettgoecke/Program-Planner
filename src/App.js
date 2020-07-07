import "./index.css";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
    const testEvent = [
        { title: "Session 1", description: "App Sec", data: "", time: "" },
        {
            title: "Session 2",
            description: "Clean Code",
            data: "",
            time: "",
        },
        { title: "Session 3", description: "Dev ops", data: "", time: "" },
    ];
    const { sub_events, setSubEvents } = useState([]);

    const handleDelete = () => {};

    return (
        <div className="App">
            <Navbar>
                <NavItems />
            </Navbar>
            <Events subEvents={testEvent} onDelete={handleDelete} />
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
                <DropdownMenuPlus />
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

function DropdownMenuPlus() {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

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
                    <DropdownItem leftIcon={<BoltIcon />}>Title:</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>
                        Description:
                    </DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>Date:</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>Time:</DropdownItem>
                    <DropdownItem goToMenu="main" leftIcon={<BoltIcon />}>
                        Add
                    </DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}

function Events(props) {
    function Event(props) {
        return (
            <div className="event">
                <h3>{props.subEvent.title}</h3>
                <h3>{props.subEvent.description}</h3>
                <h3>{props.subEvent.date}</h3>
                <h3>{props.subEvent.time}</h3>
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

function TestFunc(props) {}

export default App;
