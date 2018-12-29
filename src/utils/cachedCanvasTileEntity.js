import * as Tone from 'tone';
import SoundManager from './soundManager';

export default class CachedCanvasTileEntity {
    static statcanvas = document.createElement('canvas');
    static statctx = CachedCanvasTileEntity.statcanvas.getContext('2d');

    canvas = CachedCanvasTileEntity.statcanvas;
    ctx = CachedCanvasTileEntity.statctx;

    /**
     * Create a new basic tile entity
     * @param {number} tileSize 
     * @param {string} instrument 
     */
    constructor(tileSize, instrument){
        this.instrument = instrument || "pulse";
        this.reSize(tileSize);
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

    /**
     * Redraw the basic shooter image
     * @param {*} state 
     */
    reDraw(state){
        throw "reDraw Should be implemented by each class!";
    }

    /**
     * Activate the basic entity
     * @param {string} pitch
     * @param {number} time
     * @param {number} strength
     */
    activate(pitch, time, strength){
        SoundManager.playSound(this.instrument, pitch, "32n", time, strength);
    }
}