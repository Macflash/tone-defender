export default class ItemGrid {
    // grid can have bounds, but they are OPTIONAL
    // items that go beond the bounds are NOT SET
    constructor(boundX, boundY){
        this._items = {};
        this.boundX = boundX;
        this.boundY = boundY;
    }

    // private
    _getIndex = (x, y) => {
        return x + "," + y;
    }

    setCell = (x, y, item) => {
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

    getCell = (x, y) => {
        return this._items[this._getIndex(x,y)];
    }

    /**
     * not sorted
     */
    listItems = () => {
        return Object.keys(this._items).map(key => {
            return this._items[key];
        })
    }
}