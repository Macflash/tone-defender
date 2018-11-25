import * as Tone from 'tone';
import Shot from './projectiles/shot';

export default class Shooter {
    /**
     * Create a new basic shooter
     * @param {number} direction 
     * @param {number} tileSize 
     */
    constructor(direction, tileSize){
        if(!tileSize){throw "need tilesize!!";}
        this.direction = direction;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.pulse = new Tone.Synth().toMaster();
        this.reSize(tileSize);
    }

    /**
     * Resize the shooter
     * @param {number} tileSize
     */
    reSize(tileSize){
        this.tileSize = tileSize;
        this.canvas.width = this.tileSize;
        this.canvas.height = this.tileSize;
        this.reDraw();
    }

    /**
     * Redraw the basic shooter image
     * @param {*} state 
     */
    reDraw(state){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#A0A0A0';

        var pad = this.canvas.width * 0.1;
        this.ctx.fillRect(Math.floor(pad), Math.floor(pad), Math.floor(this.canvas.width - (2 * pad)), Math.floor(this.canvas.height - (2 * pad)));
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
    activate(pitch, time, strength){
        this.pulse.triggerAttackRelease(pitch, "8n", time);
        return [new Shot(this.direction, this.tileSize)];
    }
}