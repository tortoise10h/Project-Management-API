class Queue {
  constructor() {
    this.store = {};
    this.head = 0;
    this.tail = 0;
  }

  enQueue(item) {
    this.store[this.tail] = item;
    this.tail++;
  }

  deQueue() {
    const size = this.tail - this.head;
    if (size <= 0) return undefined;

    const item = this.store[this.head];

    delete this.store[this.head];
    this.head++;

    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
    }

    return item;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.tail - this.head;
  }

  peek() {
    return this.store[this.tail - 1];
  }

  print() {
    return Object.values(this.store);
  }
}

module.exports = Queue;
