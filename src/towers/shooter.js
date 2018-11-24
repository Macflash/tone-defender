import * as Tone from 'tone';

export default class Shooter {
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.pulse = new Tone.Synth().toMaster();
    }

    reSize(tileSize){
        this.canvas.width = tileSize;
        this.canvas.height = tileSize;
        this.reDraw();
    }

    reDraw(state){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#DDD';
        this.ctx.fillRect(5, 5, this.canvas.width - 10, this.canvas.height - 10);
    }

    // think it would be cool to have the pitches be different based on how it was activated?
    // pulse is mellower and when hit by a projectile it is different or more melodic?
    // or should it be the same?
    // this could also depend on the tower AND the projectile
    activate(pitch, time){
        this.pulse.triggerAttackRelease(pitch, "8n", time);
        /// TODO: create a projectile
    }
}