class Rectangle {
  #height;
  #width;

  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }

  getArea() {
    return this.#width * this.#height;
  }

  getCircumference() {
    return this.#height * 2 + this.#width * 2;
  }
}

class Square extends Rectangle {
  #side;

  constructor(side) {
    super(side, side);
    this.#side = side;
  }

  getDiagonal() {
    // d*d = side * side + side * side
    return Math.sqrt(2) * this.#side;
  }

  getArea() {
    // return Math.pow(this.getDiagonal(),2) / 2
    return this.getCircumference();
  }
}

export {Rectangle, Square}