import * as Tone from 'tone';
import Shot from './projectiles/shot';
import TileEntity from '../utils/tileEntity';
import Pulse from './projectiles/pulse';

export default class Shooter extends TileEntity {
    /**
     * Create a new basic shooter
     * @param {number} direction 
     * @param {number} tileSize 
     */
    constructor(direction, tileSize) {
        super(tileSize, new Tone.PolySynth().toMaster());
        this.direction = direction;
        this.reDraw();
    }

    /**
     * Redraw the basic shooter image
     */
    reDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#A0A0A0';
        const pad = Math.floor(this.canvas.width * 0.1);
        const pad2 = 2 * pad;
        const pad4 = 4 * pad;
        this.ctx.fillRect(pad, pad, Math.floor(this.canvas.width - (pad2)), Math.floor(this.canvas.height - (pad2)));
        switch (this.direction) {
            case 0: //right
                this.ctx.clearRect(this.canvas.width - pad4, 0, pad4, pad4);
                this.ctx.clearRect(this.canvas.width - pad4, this.canvas.height - pad4, pad4, pad4);
                break;

            case 1: //down
                this.ctx.clearRect(this.canvas.width - pad4, this.canvas.height - pad4, pad4, pad4);
                this.ctx.clearRect(0, this.canvas.height - pad4, pad4, pad4);
                break;

            case 2: //left
                this.ctx.clearRect(0, this.canvas.height - pad4, pad4, pad4);
                this.ctx.clearRect(0, 0, pad4, pad4);
                break;

            case 3: //up
                this.ctx.clearRect(this.canvas.width - pad4, 0, pad4, pad4);
                this.ctx.clearRect(0, 0, pad4, pad4);
                break;
        }
    }

    // think it would be cool to have the pitches be different based on how it was activated?
    // pulse is mellower and when hit by a projectile it is different or more melodic?
    // or should it be the same?
    // this could also depend on the tower AND the projectile
    /**
     * Activate the shooter (with the specified pulse strength?)
     * @param {string} pitch
     * @param {number} time
     * @param {number} strength
     * @returns {any[]}
     */
    activate(pitch, time, strength) {
        if(strength <= .1){ return []; }
        super.activate(pitch, time, strength);
        const range = 7;
        const s = strength * ((range + 1) / range)
//        this.instrument.triggerAttackRelease(pitch, "8n", time, strength);
        return [new Pulse(range, this.direction, this.tileSize, s)];
    }
}