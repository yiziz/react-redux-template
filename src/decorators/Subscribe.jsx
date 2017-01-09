import React from 'react'

import Websocket from 'websockets/Websocket'

const Subscribe = (Component) => class extends React.Component {

  handleOnConnect = () => this._component.onConnect(arguments)
  handleOnReceive = () => this._component.onReceive(arguments)

  socketSend = (data) => {
    this.subscription.send(data)
  }

  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe()
  }

  componentRef = (c) => {
    this._component = c
  }

  socketConnect = ({ channel, room, ...options }) => {
    const identifier = JSON.stringify({
      channel,
      room
    })
    this.ws = new Websocket()
    this.subscription = this.ws.getConsumer().subscriptions.create(channel, {
      connected: this.handleOnConnect,
      received: this.handleOnReceive,
      identifier,
      ...options
    })
  }

  render() {
    const { componentRef, socketSend } = this
    return (
      <Component
        ref={componentRef}
        socketSend={socketSend}
        socketConnect={this.socketConnect}
        {...this.props}
      />
    )
  }
}

export default Subscribe
