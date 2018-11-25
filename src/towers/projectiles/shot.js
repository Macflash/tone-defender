import * as Tone from 'tone';

export default class Shot {
    /**
     * Create a new basic shooter
     * @param {number} direction 
     * @param {number} tileSize 
     * @param {number} strength 
     */
    constructor(direction, tileSize, strength){
        this.strength = strength;
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
        this.canvas.width = tileSize;
        this.canvas.height = tileSize;
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
        var pad = this.canvas.width * 0.35;
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
     */
    activate(pitch, time, strength){
        this.pulse.triggerAttackRelease(pitch, "32n", time);
        /// TODO: create a projectile
    }
}