
class Queue {
  #items;

  constructor() {
    this.#items = [];
  }


  /**
   * Adds an item to the end of the queue.
   * @param {*} item The item.
   * @return {Number} The length of items.
   */
  enqueue(item) {
    return this.#items.push(item);
  }

  /**
   * Remove an item from the front of the queue.
   * @return {*}
   */
  dequeue() {
    return this.#items.shift()
  }

  /**
   * Check if the queue is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * Peek at the first element in the queue.
   * @return {undefined|*} The first element of the queue.
   */
  peek() {
    return this.isEmpty() ? undefined : this.#items[0];
  }

  /**
   * Ceck the length of the queue.
   * @return {*}
   */
  length() {
    return this.#items.length;
  }
}

export {Queue};
