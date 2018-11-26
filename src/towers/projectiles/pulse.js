import * as Tone from 'tone';
import TileEntity from '../../utils/tileEntity';
import BaseProjectile from './baseProjectile';
import Shot from './shot';

export default class Pulse extends Shot {
    /**
     * Create a new basic shooter
     * @param {number} lifeSpan 
     * @param {number} direction 
     * @param {number} tileSize 
     * @param {number} strength 
     */
    constructor(lifeSpan, direction, tileSize, strength) {
        super(direction, tileSize, strength * ((lifeSpan + 1) / lifeSpan));
        this.lifeSpan = lifeSpan + 1; // this is to make it simpler. EG. 1 is 1 tile, 2 is 2 tiles
        this.reDraw();
    }

    /**
     * Move and update the projectile
     * @returns {{x: number, y: number, destroyProjectile: boolean}}
     */
    move() {
        var movement = super.move();
        var decayRate = (this.lifeSpan - 1) / this.lifeSpan;
        this.strength *= decayRate;
        this.lifeSpan--;
        this.reDraw();

        return { 
            x: movement.x, 
            y: movement.y, 
            destroyProjectile: this.lifeSpan <= 0 || this.strength <= 0 
        };
    }
}