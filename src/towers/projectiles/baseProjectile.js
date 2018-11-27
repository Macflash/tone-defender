import * as Tone from 'tone';
import TileEntity from '../../utils/tileEntity';

export default class BaseProjectile extends TileEntity {
    res = .5;

    /**
     * Create a new basic projectile
     * @param {number} tileSize 
     * @param {number} strength 
     */
    constructor(tileSize, strength) {
        super(tileSize, new Tone.Synth().toMaster());
        this.strength = strength;
        this.reDraw();
    }

    /**
     * Move and update the projectile
     * @returns {{x: number, y: number, destroyProjectile: boolean}}
     */
    move() {
        // by default don't move, and don't decay (lessen strength)
        return { x: 0, y: 0 };
    }

    /**
     * Handle projectile collisions with enemies
     * @returns {{damage: number, destroyProjectile: boolean, spawnedProjectiles: any[] }}
     */
    onEnemyHit() {
        this.instrument.dispose();
        // todo: handle damage or something here?
        // handle like splitting or creating new projectiles?
        return {damage: this.strength, destroyProjectile: true};
    }

    /**
     * Handle projectile collisions with towers
     * @returns {{strength: number, destroyProjectile: boolean, spawnedProjectiles: any[] }}
     */
    onTowerHit() {
        this.instrument.dispose();
        // todo: handle damage or something here?
        // handle like splitting or creating new projectiles?
        return {strength: this.strength, destroyProjectile: true};
    }

    /**
     * Redraw the basic shooter image
     * @param {*} state 
     */
    reDraw(state) {
        // can implement in other class!
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(100,150,255,.8)';
        var pad = this.canvas.width * (0.35 * (1.5 - this.strength));
        this.ctx.fillRect(Math.floor(pad), Math.floor(pad), Math.floor(this.canvas.width - (2 * pad)), Math.floor(this.canvas.height - (2 * pad)));
    }
}