import * as Tone from 'tone';

export default class ImageManager {
    static image = {
        // todo: render the canvases/images for different towers and projectiles
    };

    static drawImage(){
        if(!SoundManager.sound[sound]){
            throw "didn't find the sound: " + sound;
        }

        SoundManager.sound[sound].triggerAttackRelease(pitch, length, time, velocity);
    }
}