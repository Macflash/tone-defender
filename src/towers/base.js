import TileEntity from "../utils/tileEntity";

export default class Base extends TileEntity {
    /**
     * Redraw the base
     */
    reDraw() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'green';
        // strength is like... 0 - 1 or 0 - 100?
        var pad = this.canvas.width * .1;
        this.ctx.fillRect(Math.floor(pad), Math.floor(pad), Math.floor(this.canvas.width - (2 * pad)), Math.floor(this.canvas.height - (2 * pad)));
    }
}