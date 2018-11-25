export default class ItemGrid {
    // grid can have bounds, but they are OPTIONAL
    // items that go beond the bounds are NOT SET
    /**
     * Creates a new ItemGrid with optional boundaries
     * @param {number?} boundX
     * @param {number?} boundY
     */
    constructor(boundX, boundY){
        this._items = {};
        this.boundX = boundX;
        this.boundY = boundY;
    }

    // private
    _getIndex = (x, y) => {
        return x + "," + y;
    }

    /**
     * Get the item in a cell
     * @param {number} x
     * @param {number} y
     * @param {any[]} item
     * @returns {void}
     */
    mergeCell = (x,y, items) => {
        if(!items || ! items.length){return;}
        let currentContents = this.getCell(x,y);
        if(!currentContents || !currentContents.length){ currentContents = [];}
        let newContents = currentContents.concat(items);
        this.setCell(x,y, newContents);
    }

    /**
     * Get the item in a cell
     * @param {number} x
     * @param {number} y
     * @param {*} item
     * @returns {void}
     */
    setCell = (x, y, item) => {
        if(!item){
            delete this._items[this._getIndex(x,y)];
            return;
        }

        if(this.boundX){
            if(x < 0 || x > this.boundX){
                return;
            }
        }
        if(this.boundY){
            if(y < 0 || y > this.boundX){
                return;
            }
        }

        this._items[this._getIndex(x,y)] = item;
    }

    /**
     * Get the item in a cell
     * @param {number} x
     * @param {number} y
     * @returns {any}
     */
    getCell = (x, y) => {
        return this._items[this._getIndex(x,y)];
    }

    /**
     * Get all the items in the grid (not sorted!)
     * @returns {any[]}
     */
    listItems = () => {
        return Object.keys(this._items).map(key => {
            console.log(key + " " + this._items[key]);
            return this._items[key];
        })
    }
}