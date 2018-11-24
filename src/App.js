import React, { Component } from 'react';
import * as Tone from 'tone';

class Cnv {
  constructor(name){
    this.name = name;
    this.canvas = document.getElementById(this.name);
    this.ctx = this.canvas.getContext('2d');
  }
  
  reSize(width, height) {
    if (!window || !this.canvas) { return; }
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

class App extends Component {
  tHeight = 8;
  tWidth = 8;
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      bpm: 90,
      currentColumn: -1,
    };
  }

  componentDidMount() {
    // Init Canvas components
    this.terrain = new Cnv("terrainCanvas");
    this.tower = new Cnv("towerCanvas");
    this.enemy = new Cnv("enemyCanvas");
    this.ui = new Cnv("uiCanvas");


    this.reSize();
    window.addEventListener('resize', () => { this.reSize() }, false);

    // Init transport
    this.setTempoFromState();
    Tone.Transport.start()

    //create a synth and connect it to the master output (your speakers)
    this.synth = new Tone.Synth().toMaster();
    this.loop = new Tone.Loop(this.onLoop, "4n");
  }

  setTempoFromState = () => {
    Tone.Transport.bpm.value = this.state.bpm;
  }

  speedUp = () => {
    this.setState(state => {
     return {...state, bpm: state.bpm + 20};
    }, this.setTempoFromState);
  }

  slowDown = () => {
    this.setState(state => {
     return {...state, bpm: state.bpm - 20};
    }, this.setTempoFromState);
  }

  onLoop = (time) => {
    this.setState((state) => {
      let currentColumn = this.state.currentColumn + 1;
      if (currentColumn >= this.tWidth) {
        currentColumn = 0;
      }
      return { ...state, currentColumn };
    });
    this.synth.triggerAttackRelease('C0', '8n', time);
  }

  start = () => {
    this.loop.start();
    this.setState({ running: true });
  }

  stop = () => {
    this.loop.stop();
    this.setState({ running: false });
  }

  reSize() {
    if (!window) { return; }
    this.vpWidth = window.innerWidth - 10;
    this.vpHeight = window.innerHeight - 10;

    this.terrain.reSize(this.vpWidth, this.vpHeight);
    this.tower.reSize(this.vpWidth, this.vpHeight);
    this.enemy.reSize(this.vpWidth, this.vpHeight);
    this.ui.reSize(this.vpWidth, this.vpHeight);

    this.reDraw();
  }

  reDraw() {
    if (!this.terrain) { return; }

    this.terrain.ctx.clearRect(0, 0, this.vpWidth, this.vpHeight);

    // resulting size of the tiles
    // floor them to avoid aliasing as much as possible
    const tileSize = Math.floor(Math.min(this.vpWidth / this.tWidth, this.vpHeight / this.tHeight));

    for (var x = 0; x < this.tWidth; x++) {
      for (var y = 0; y < this.tHeight; y++) {
        if (x === this.state.currentColumn) {
          this.terrain.ctx.fillStyle = '#333';
          this.terrain.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }

        this.terrain.ctx.strokeStyle = '#555';
        this.terrain.ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

  }

  render() {
    this.reDraw();
    return <div>
      <div style={{ color: "white", padding: "5px" }}>
        {this.state.running
          ? <button onClick={this.stop}>Stop</button>
          : <button onClick={this.start}>Start</button>
        }

        {this.state.bpm > 60
          ? <button onClick={this.slowDown}>-</button>
          : null}

        {this.state.bpm.toString().toUpperCase()} BPM

      {this.state.bpm < 160
          ? <button onClick={this.speedUp}>+</button>
          : null}
      </div>
      <div style={{ position: "relative" }}>
        <canvas id="terrainCanvas" style={{zIndex: "10"}} />
        <canvas id="towerCanvas" style={{zIndex: "20"}} />
        <canvas id="enemyCanvas" style={{zIndex: "30"}} />
        <canvas id="uiCanvas" style={{zIndex: "40"}} />
      </div>
    </div>
  }
}

export default App;
