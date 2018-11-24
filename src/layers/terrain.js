import Layer from './layer';
import * as Tone from 'tone';

export default class Terrain extends Layer {
  pulse = new Tone.Synth().toMaster();

  update(time, state) {
    // TODO: should we update?
    // for now, we assume 4n pulse, and always update
    this.pulse.triggerAttackRelease('C0', '8n', time);
    this.reDraw(state);
  }

  reDraw(state) {
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
  }

}