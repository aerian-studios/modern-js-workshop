export const loginFlow = {
    initial: "LoggedOut",
    states: {
        LoggedOut: {
            "onEntry": "showLoginForm",
            "on": {
                "LOGIN": "LoggingIn"
            }
        },
        LoggingIn: {
            "onEntry": "showLoggingInMessage",
            "on": {
                "ERROR": "Error",
                "SUCCESS": "Success"
            }
        },
        Success: {
            "onEntry": "showSuccessMessage",
            "on": {
                "TIMEOUT": "LoggedIn"
            }
        },
        Error: {
            "onEntry": "showErrorMessage",
            "on": {
                "TIMEOUT": "LoggedOut"
            }
        },
        LoggedIn: {
            "onEntry": "showLoggedIn",
            "on": {
                "LOGOUT": "LoggedOut"
            }
        }
    }
};