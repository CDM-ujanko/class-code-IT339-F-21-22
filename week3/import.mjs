import {Queue} from './queue.mjs';
import {Rectangle, Square} from './extend.mjs';
import {Pulser} from './pulser.mjs';

// console.log(Queue);

let queueInstance = new Queue();

queueInstance.enqueue('My first item');
queueInstance.enqueue(2);
queueInstance.enqueue({
  name: 'bob',
  type: 'person'
});

// console.log(queueInstance.dequeue(), queueInstance.length());
// console.log(queueInstance.#items);
// console.log(queueInstance);

let rect = new Rectangle(10, 15);
// console.log('The area of rect is:', rect.getArea());
// console.log('The circumference of rect is:', rect.getCircumference());

let sq = new Square(12);
// console.log('The area of sq is:', sq.getArea());
// console.log('The circumference of sq is:', sq.getCircumference());
// console.log('The diagonal of sq is:', sq.getDiagonal());

let pulse = new Pulser();

pulse.on('pulse', (arg1, arg2) => {
  console.log('The event triggered!', arg1, arg2);
});

pulse.start();

