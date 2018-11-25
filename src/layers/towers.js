import Layer from './layer';
import ItemGrid from '../utils/itemGrid';
import Shooter from '../towers/shooter';
export default class Towers extends Layer {
    notes = ["F4", "E4","B3","A3","G3","E3", "C3", "C2" ];

    /**
     * @param {string} name
     * @param {number} width
     * @param {number} height
     */
    constructor(name, width, height) {
        super(name, width, height);
        this.towerGrid = new ItemGrid(width, height);
    }

    /**
     * Update the towers layer
     * @param {number} time 
     * @param {number} pulseColumn 
     */
    columnPulse(time, pulseColumn){
        // activate the correct towers, and handle collisions
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if(x == pulseColumn){
                    const tower = this.towerGrid.getCell(x, y);
                    if (tower) {
                        tower.activate(this.notes[y], time);
                    }
                }
            }
        }
    }

    /**
     * resize the towers layer
     * @param {number} tileSize 
     */
    reSize(tileSize){
        super.reSize(tileSize);
        this.towerGrid.listItems().forEach(t => t.reSize(tileSize));
    }

    reDraw() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const tower = this.towerGrid.getCell(x, y);
                if (tower) {
                    //TODO: we should let tower decide when to redraw //tower.reDraw(state);
                    const offX = x * this.tileSize;
                    const offY = y * this.tileSize;
                    this.ctx.clearRect(offX, offY, this.tileSize, this.tileSize);
                    this.ctx.drawImage(tower.canvas, offX, offY);
                }
            }
        }
    }
}