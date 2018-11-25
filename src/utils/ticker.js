export default class Ticker {
    constructor(ticks){
        this.ticks = ticks;
        this.current = ticks;
    }

    tick(){
        this.current++;
        if(this.current >= this.ticks){
            this.current = 0;
            return true;
        }

        return false;
    }
}