import React from "react";
import { Action, State, withStateMachine } from "react-automata";
import LoginForm from "./components/LoginForm";
import { MessageOverlay } from "./components/MessageOverlay";
// import { loginFlow } from "./loginFlow";

const loginFlow = {
    initial: "LoggedOut",
    states: {
        LoggedOut: {
            onEntry: "showLoginForm",
            on: {
                LOGIN: "LoggingIn",
            },
        },
        LoggingIn: {
            onEntry: "showLoggingInMessage",
            on: {
                ERROR: "Error",
                SUCCESS: "Success",
            },
        },
        Success: {
            onEntry: "showSuccessMessage",
            on: {
                TIMEOUT: "LoggedIn",
            },
        },
        Error: {
            onEntry: "showErrorMessage",
            on: {
                TIMEOUT: "LoggedOut",
            },
        },
        LoggedIn: {
            onEntry: "showLoggedIn",
            on: {
                LOGOUT: "LoggedOut",
            },
        },
    },
};

const mockUserDetails = {
    username: "aerian",
    password: "isCool,reallyCool",
};

const messages = {
    error: "There was an error with your username or password",
    success: "You have been logged in",
    info: "Logging in...",
};

const DEFAULT_STATE = {
    message: "",
};

export class App extends React.Component {
    state = DEFAULT_STATE;

    mockLoginAPI = async (username, password) => {
        await window.setTimeout(() => {
            if (
                username !== mockUserDetails.username ||
                password !== mockUserDetails.password
            ) {
                this.props.transition("ERROR");
            } else {
                this.props.transition("SUCCESS");
            }
        }, 5000);
    };

    showLoggingInMessage() {
        this.setState({ message: "info" });
    }

    showErrorMessage() {
        this.setState({ message: "error" });
    }

    showSuccessMessage() {
        this.setState({ message: "success" });
    }

    componentWillTransition(event) {
        console.log({ event });
    }

    handleMessageClose = () => {
        this.props.transition("TIMEOUT");
    };

    handleClick = ({ username, password }) => {
        this.props.transition("LOGIN");
        this.mockLoginAPI(username, password);
    };

    render() {
        return (
            <main>
                <p>
                    {this.props.machineState && this.props.machineState.value}
                </p>
                <State is={["LoggedOut", "LoggingIn", "Error", "Success"]}>
                    <LoginForm login={this.handleClick} />
                </State>
                <Action is="showLoggingInMessage">
                    <MessageOverlay messageType={this.state.message}>
                        {messages[this.state.message]}
                    </MessageOverlay>
                </Action>
                <Action is={["showErrorMessage", "showSuccessMessage"]}>
                    <MessageOverlay
                        onClosed={this.handleMessageClose}
                        timeout={true}
                        messageType={this.state.message}
                    >
                        {messages[this.state.message]}
                    </MessageOverlay>
                </Action>
            </main>
        );
    }
}

export default withStateMachine(loginFlow)(App);
