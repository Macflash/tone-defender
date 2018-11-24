import React, { Component } from 'react';

class Tile {

}

class App extends Component {
  componentDidMount() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'grey';

    window.addEventListener('resize', () => { this.reSize() }, false);

    this.reSize();
  }

  reSize() {
    if (!window || !this.canvas) { return; }
    this.vpWidth = this.canvas.width = window.innerWidth - 10;
    this.vpHeight = this.canvas.height = window.innerHeight - 10;
    this.reDraw();
  }

  reDraw() {
    if (!this.ctx) { return; }

    this.ctx.clearRect(0, 0, this.vpWidth, this.vpHeight);

    // number of tiles in the view
    const tWidth = 8;
    const tHeight = 8;
    // resulting size of the tiles
    const tileSize = Math.min(this.vpWidth / tWidth, this.vpHeight / tHeight);

    for (var x = 0; x < tWidth; x++) {
      for (var y = 0; y < tHeight; y++) {
        this.ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

  }

  render() {
    return <canvas id="gameCanvas" />;
  }
}

export default App;
