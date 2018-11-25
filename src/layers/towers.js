import Layer from './layer';
import ItemGrid from '../utils/itemGrid';
import Base from '../towers/base';

export default class Towers extends Layer {
    notes = ["F4", "E4", "B3", "A3", "G3", "E3", "C3", "C2"];

    /**
     * @param {string} name
     * @param {number} width
     * @param {number} height
     */
    constructor(name, width, height) {
        super(name, width, height);
        this.towers = new ItemGrid(width, height);
        this.projectiles = new ItemGrid(width, height);
    }

    checkForTowerProjectileCollisions(time){
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                var projectiles = this.projectiles.getCell(x,y);
                var tower = this.towers.getCell(x,y);
                if(tower && projectiles && projectiles.length){
                    // we have a collision (set strength to .5 for now)
                    // TODO we need to save the other projectiles created here
                    var sum = 0;
                    projectiles.forEach((p) => {
                        sum += p.strength
                    });
                    this.projectiles.mergeCell(x, y, tower.activate(this.notes[y], time, 0.5 * sum));
                }
            }
        }
    }

    moveProjectiles() {
        // move the projectiles
        var movedProjectiles = new ItemGrid(this.width, this.height);
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const projectiles = this.projectiles.getCell(x, y);
                if (projectiles && projectiles.length) {
                    // loop through all the projectiles and move them
                    // watch out we are still IN the loop
                    for (const projectile of projectiles) {
                        //{{x: number, y: number, destroyProjectile: boolean}}
                        const movement = projectile.move();
                        if(!movement.destroyProjectile){
                            movedProjectiles.mergeCell(x + movement.x, y + movement.y, [projectile]);
                        }
                    }
                }
            }
        }

        this.projectiles = movedProjectiles;
    }

    /**
     * Update the towers layer
     * @param {number} time 
     * @param {number} pulseColumn 
     */
    columnPulse(time, pulseColumn) {
        // activate the correct towers, and handle collisions
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (x == pulseColumn) {
                    const tower = this.towers.getCell(x, y);
                    if (tower) {
                        var newProjectiles = tower.activate(this.notes[y], time, 1);
                        this.projectiles.mergeCell(x, y, newProjectiles);
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
        this.towers.listItems().forEach(t => t.reSize(tileSize));
        this.projectiles.listItems().forEach(pl => pl.forEach(p => p.reSize(tileSize)));
    }

    reDraw() {
        this.ctx.clearRect(0, 0, this.tileSize * this.width, this.tileSize * this.height);
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const tower = this.towers.getCell(x, y);
                if (tower) {
                    //TODO: we should let tower decide when to redraw //tower.reDraw(state);
                    const offX = x * this.tileSize;
                    const offY = y * this.tileSize;
                    //this.ctx.clearRect(offX, offY, this.tileSize, this.tileSize);
                    this.ctx.drawImage(tower.canvas, offX, offY);
                }

                const projectiles = this.projectiles.getCell(x, y);
                if (projectiles && projectiles.length) {
                    //TODO: we should let tower decide when to redraw //tower.reDraw(state);
                    const offX = x * this.tileSize;
                    const offY = y * this.tileSize;

                    for (const projectile of projectiles) {
                        //debugger;
                        //this.ctx.clearRect(offX, offY, this.tileSize, this.tileSize);
                        this.ctx.drawImage(projectile.canvas, offX, offY);
                    }
                }
            }
        }
    }
}