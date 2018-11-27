import * as Tone from 'tone';

export default class SoundManager {
    static sound = {
        beat: new Tone.PolySynth(4).toMaster(),
        rhythm: new Tone.PolySynth(16).toMaster(),
        pulse: new Tone.PolySynth(16).toMaster(),
    };

    static playSound(sound, pitch, length, time, velocity){
        if(!SoundManager.sound[sound]){
            throw "didn't find the sound: " + sound;
        }

        SoundManager.sound[sound].triggerAttackRelease(pitch, length, time, velocity);
    }
}