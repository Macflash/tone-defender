import TileEntity from "../utils/tileEntity";
import SoundManager from "../utils/soundManager";

export default class Walker {
    static statcanvas = document.createElement('canvas');
    static statctx = Walker.statcanvas.getContext('2d');

    canvas = Walker.statcanvas;
    ctx = Walker.statctx;

    currentMovementDirection = { x: 0, y: 0 };
    currentMovementDurationRemaining = 0;
    health = 1;

    /**
     * Redraw the basic shooter image
     * @param {*} state 
     */
    reDraw(state){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'red';
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
        SoundManager.playSound(this.instrument, pitch, "32n", time, strength);
    }
    
    /**
     * Resize the entity
     * @param {number} tileSize
     */
    reSize(tileSize){
        this.tileSize = tileSize;
        this.canvas.width = this.tileSize;
        this.canvas.height = this.tileSize;
        this.reDraw();
    }
}