import React from 'react';

const DEFAULT_STATE = {
  visible: 'hide'
}
export class MessageOverlay extends React.PureComponent {
  state = DEFAULT_STATE;

  closeMessage = () => {
      this.setState({visible: 'hide'})
      window.setTimeout(() => {
        this.props.onClosed();
    }, 300);
  }

  componentDidMount() {
    this.setState({visible: 'show'})
    if (this.props.timeout) {
      window.setTimeout(() => {
        this.closeMessage();
      }, 3000)
    }
  }

  render() {

    return (
      <div className={`message-overlay message-${this.props.messageType || 'info'} message-${this.state.visible}`}>
        <p>{this.props.children}</p>
      </div>
    )
  }
}