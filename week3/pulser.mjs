import {EventEmitter} from 'events';

export class Pulser extends EventEmitter {
  start() {
    setInterval(() => {
      console.log('in Pulser before Emit');
      this.emit('pulse', 'First arg', {name: 'second arg'});
      console.log('in Pulser after Emit');
    }, 3000)
  }
}