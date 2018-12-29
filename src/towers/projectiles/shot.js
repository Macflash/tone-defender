import * as Tone from 'tone';
import TileEntity from '../../utils/tileEntity';
import BaseProjectile from './baseProjectile';

export default class Shot extends BaseProjectile {
    res = .5;
    /**
     * Create a new basic shooter
     * @param {number} direction 
     * @param {number} tileSize 
     * @param {number} strength 
     */
    constructor(direction, tileSize, strength) {
        super(tileSize);
        this.strength = strength;
        this.direction = direction;
        this.reDraw();
    }

    /**
     * Move and update the projectile
     * @returns {{x: number, y: number, destroyProjectile: boolean}}
     */
    move() {
        // by default don't move, and don't decay (lessen strength)
        switch (this.direction) {
            case 0: //right
                return { x: this.res, y: 0 };
            case 0.5: //down right
                return { x: this.res, y: this.res };
            case 1: //down
                return { x: 0, y: this.res };
            case 1.5: //down left
                return { x: -1 * this.res, y: this.res };
            case 2: //left
                return { x: -1 * this.res, y: 0 };
            case 2.5: //left up
                return { x: -1 * this.res, y: -1 * this.res };
            case 3: //up
                return { x: 0, y: -1 * this.res };
            case 3.5: //up right
                return { x: this.res, y: -1 * this.res };
        }

        return { x: 0, y: 0 };
    }
}