import React from "react";
import { withStateMachine, State, Action } from "react-automata";

import LoginForm from "./components/LoginForm";
import { MessageOverlay } from "./components/MesssageOverlay";

const statechart = {
    initial: "LoggedOut",
    states: {
        LoggedOut: {
            onEntry: "doLogOut",
            on: {
                LOG_IN: "LoggingIn",
            },
        },
        LoggingIn: {
            onEntry: "doLoggingIn",
            on: {
                ERROR: "Error",
                SUCCESS: "Success",
            },
        },
        Error: {
            onEntry: "showErrorMessage",
            on: {
                TIMEOUT: "LoggedOut",
            },
        },
        Success: {
            onEntry: "doSuccess",
            on: {
                TIMEOUT: "LoggedIn",
            },
        },
        LoggedIn: {
            on: {
                LOG_OUT: "LoggedOut",
            },
        },
    },
};

const messages = {
    info: "Logging in...",
    error: "There was a problem with your username or password",
    success: "Yay!",
};

const loginDetails = {
    username: "aerian",
    password: "isCool,reallyCool123",
};

const DEFAULT_STATE = {
    messageType: "",
};

export class App extends React.Component {
    state = DEFAULT_STATE;
    handleSubmit = ({ username, password }) => {
        this.props.transition("LOG_IN");

        this.mockAuthServerResponse(username, password);
    };

    mockAuthServerResponse = async (username, password) => {
        await window.setTimeout(() => {
            if (
                username === loginDetails.username &&
                password === loginDetails.password
            ) {
                this.props.transition("SUCCESS");
            } else {
                this.props.transition("ERROR");
            }
        }, 3000);
    };

    doLoggingIn() {
        this.setState({ messageType: "info" });
    }
    doSuccess() {
        this.setState({ messageType: "success" });
    }
    showErrorMessage() {
        this.setState({ messageType: "error" });
    }

    handleMessageClose = () => {
        this.props.transition("TIMEOUT");
    };
    render() {
        return (
            <main>
                <p>
                    {this.props.machineState && this.props.machineState.value}
                </p>
                <State is={["LoggedOut", "LoggingIn", "Error", "Success"]}>
                    <LoginForm login={this.handleSubmit} />
                </State>

                <Action is="doLoggingIn">
                    <MessageOverlay
                        onClosed={this.handleMessageClose}
                        messageType={this.state.messageType}
                    >
                        {messages[this.state.messageType]}
                    </MessageOverlay>
                </Action>
                <Action is={["doSuccess", "showErrorMessage"]}>
                    <MessageOverlay
                        onClosed={this.handleMessageClose}
                        messageType={this.state.messageType}
                        timeout={4000}
                    >
                        {messages[this.state.messageType]}
                    </MessageOverlay>
                </Action>
            </main>
        );
    }
}

export default withStateMachine(statechart)(App);
