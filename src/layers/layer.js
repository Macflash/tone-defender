export default class Layer {
  constructor(name, width, height) {
    this.name = name;
    this.canvas = document.getElementById(this.name);
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
  }

  reSize(tileSize) {
    if (!this.canvas) { throw "didn't find " + this.name; }
    this.tileSize = tileSize;
    this.canvas.width = tileSize * this.width;
    this.canvas.height = tileSize * this.height;
  }

  update(time, state) {
    throw "Should be implemented by child class!";
  }
}
