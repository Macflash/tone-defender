import Layer from './layer';
import SoundManager from '../utils/soundManager';

export default class Terrain extends Layer {
  instrument = "beat";

  /**
   * update the current terrain layer
   * @param {number} time 
   * @param {number} pulseColumn 
   */
  columnPulse(time, pulseColumn) {
    // TODO: should we update?
    // for now, we assume 4n pulse, and always update
    SoundManager.playSound(this.instrument, "C0", "8n", time, 1);
    this.reDraw(pulseColumn);
  }

  /**
   * reDraw the current terrain layer
   * @param {number} pulseColumn
   */
  reDraw(pulseColumn) {
    // TODO: we don't need to clear ALL the terrain unless we have resized
    // TODO: add this optimization later...
    this.ctx.clearRect(0, 0, this.width * this.tileSize, this.height * this.tileSize);
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (x === pulseColumn) {
          this.ctx.fillStyle = '#333';
          this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }

        this.ctx.strokeStyle = '#555';
        this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }
}