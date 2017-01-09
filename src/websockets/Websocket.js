import Cable from 'es6-actioncable'

class Websocket {
  connect() {
    this.consumer = Cable.createConsumer('ws://localhost:3000/cable')
  }

  notify(...args) {
    this.consumer.subscriptions.notify(args)
  }

  getConsumer() {
    if (!this.consumer) {
      this.connect()
    }
    return this.consumer
  }

  closeConnection() {
    if (this.consumer) {
      Cable.endConsumer(this.consumer)
    }
    delete this.consumer
  }
}

export default Websocket
