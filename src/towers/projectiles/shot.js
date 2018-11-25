import * as Tone from 'tone';
import TileEntity from '../../utils/tileEntity';

export default class Shot extends TileEntity {
    /**
     * Create a new basic shooter
     * @param {number} direction 
     * @param {number} tileSize 
     * @param {number} strength 
     */
    constructor(direction, tileSize, strength){
        super(tileSize, new Tone.Synth().toMaster());
        this.strength = strength;
        this.direction = direction;
        this.reDraw();
    }

    /**
     * Redraw the basic shooter image
     * @param {*} state 
     */
    reDraw(state){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#DDD';
        // strength is like... 0 - 1 or 0 - 100?
        var pad = this.canvas.width * (0.35 * (1.5 - this.strength));
        this.ctx.fillRect(Math.floor(pad), Math.floor(pad), Math.floor(this.canvas.width - (2 * pad)), Math.floor(this.canvas.height - (2 * pad)));
    }
}