import Layer from './layer';
import ItemGrid from '../utils/itemGrid';

export default class Enemies extends Layer {
    spawnX = 1;
    spawnY = 0;

    /**
     * Create a new layer of enemies
     * @param {string} name
     * @param {number} width
     * @param {number} height
     */
    constructor(name, width, height) {
        super(name, width, height);
        this.enemies = new ItemGrid(width, height);
        this.path = new ItemGrid(width, height); // TODO: we might not need this?
    }

    /**
     * update the current terrain layer
     * @param {number} time 
     * @param {number} pulseColumn 
     */
    columnPulse(time, pulseColumn) {
        // get all enemies that are in the current column and activate them
        // activation can play a sound, but also have effects
        // like HEALING or SPEEDING UP the enemy movement temporarily
        // or granting them a shield(?)
        // activate the correct towers, and handle collisions
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (x == pulseColumn) {
                    const enemies = this.enemies.getCell(x, y);
                    if (enemies && enemies.length) {
                        for(let enemy of enemies){
                            debugger;
                            enemy.activate("A1", time, .5);
                        }
                    }
                }
            }
        }
    }

    /**
     * resize the towers layer
     * @param {number} tileSize 
     */
    reSize(tileSize) {
        super.reSize(tileSize);
        this.enemies.listItems().forEach(pl => pl.forEach(p => p.reSize(tileSize)));
    }

    /**
     * reDraw the current terrain layer
     * @param {number} pulseColumn
     */
    reDraw(pulseColumn) {
        this.ctx.clearRect(0, 0, this.tileSize * this.width, this.tileSize * this.height);
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const enemies = this.enemies.getCell(x,y);
                // let enemies overlap, however we should be able to
                // visually see which ones are where even if they are in the same tile
                if(enemies && enemies.length){
                    //TODO: we should let tower decide when to redraw //tower.reDraw(state);
                    const offX = x * this.tileSize;
                    const offY = y * this.tileSize;

                    for (const enemy of enemies) {
                        //debugger;
                        //this.ctx.clearRect(offX, offY, this.tileSize, this.tileSize);
                        this.ctx.drawImage(enemy.canvas, offX, offY);
                    }
                }
            }
        }
    }
}