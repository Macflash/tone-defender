import Layer from './layer';
import ItemGrid from '../utils/itemGrid';
import Shooter from '../towers/shooter';
export default class Towers extends Layer {
    notes = ["E4", "F4","B3","A3","G3","E3", "C3", "C2" ];
    constructor(name, width, height) {
        super(name, width, height);
        this.towerGrid = new ItemGrid(width, height);
    }

    update(time, state){
        // activate the correct towers, and handle collisions
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if(x == state.currentColumn){
                    const tower = this.towerGrid.getCell(x, y);
                    if (tower) {
                        tower.activate(this.notes[y], time);
                    }
                }
            }
        }
    }

    reSize(tileSize){
        super.reSize(tileSize);
        this.towerGrid.listItems().forEach(t => t.reSize(tileSize));
    }

    reDraw(state) {
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