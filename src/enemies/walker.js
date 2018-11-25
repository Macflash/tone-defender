import TileEntity from "../utils/tileEntity";

export default class Walker extends TileEntity {
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
        this.pulse.triggerAttackRelease(pitch, "32n", time);
        /// TODO: create a projectile
    }
}