import React from "react";

const DEFAULT_STATE = {
    visible: "hide",
};
export class MessageOverlay extends React.Component {
    state = DEFAULT_STATE;

    triggerShow() {
        window.setTimeout(() => {
            this.setState({ visible: "show" });
        }, 16);
    }

    triggerClose = () => {
        this.setState({ visible: "hide" });

        window.setTimeout(() => {
            this.props.onClosed();
        }, 300);
    };

    componentDidMount() {
        this.triggerShow();
        if (this.props.timeout) {
            window.setTimeout(() => {
                this.triggerClose();
            }, this.props.timeout);
        }
    }
    render() {
        return (
            <div
                className={`message-overlay message-${this.props.messageType ||
                    "info"} message-${this.state.visible}`}
            >
                {this.props.children}
            </div>
        );
    }
}
