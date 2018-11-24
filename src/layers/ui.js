import Layer from './layer';
import * as Tone from 'tone';

export default class Ui extends Layer {
    pulse = new Tone.Synth().toMaster();

    constructor(name, width, height, onClick) {
        super(name, width, height);
        this.canvas.onmousedown = this.clickHandler;
        this.onClick = onClick;
    }

    clickHandler = (ev) => {
        const clickX = Math.floor(ev.offsetX / this.tileSize);
        const clickY = Math.floor(ev.offsetY / this.tileSize);
        console.log("click on " + clickX + "," + clickY);
        if (this.onClick) { this.onClick(clickX, clickY); }
    }

    update(time, state) {
        // UI doesn't need to update in time
        throw "Ui doesn't need to update on pulse"
    }

    reDraw(state) {
        /*
      // TODO: we don't need to clear ALL the terrain unless we have resized
      // TODO: add this optimization later...
      this.ctx.clearRect(0, 0, this.width * this.tileSize, this.height * this.tileSize);
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          if (x === state.currentColumn) {
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
          }
  
          this.ctx.strokeStyle = '#555';
          this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
      }
      */
    }
}