import React, { Component } from 'react';
import * as Tone from 'tone';
import Layer from './layers/layer';
import Terrain from './layers/terrain';
import Towers from './layers/towers';
import Ui from './layers/ui';
import Shooter from './towers/shooter';
import Ticker from './utils/ticker';

class App extends Component {
  tHeight = 8;
  tWidth = 8;
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      bpm: 90,
    };
  }

  handleUiClick = (x, y) => {
    if (this.towers.towerGrid.getCell(x, y)) {
      this.towers.towerGrid.setCell(x, y, undefined);
    } else {
      this.towers.towerGrid.setCell(x, y, new Shooter());
    }
    this.reSize();
    this.towers.reDraw();
  }

  componentDidMount() {
    // Init Canvas components
    this.terrain = new Terrain("terrainCanvas", this.tWidth, this.tHeight);
    this.towers = new Towers("towerCanvas", this.tWidth, this.tHeight);
    this.enemy = new Layer("enemyCanvas", this.tWidth, this.tHeight);
    this.ui = new Ui("uiCanvas", this.tWidth, this.tHeight, this.handleUiClick);

    this.reSize();
    window.addEventListener('resize', () => { this.reSize() }, false);

    // Init transport
    this.setTempoFromState();
    Tone.Transport.start()

    //create a synth and connect it to the master output (your speakers)
    this.pulseColumn = new Ticker(this.tWidth);
    this.quarter = new Ticker(4);
    this.eighth = new Ticker(2);
    this.loop = new Tone.Loop(this.onLoop, "16n");
  }

  setTempoFromState = () => {
    Tone.Transport.bpm.value = this.state.bpm;
  }

  speedUp = () => {
    this.setState(state => {
      return { ...state, bpm: state.bpm + 20 };
    }, this.setTempoFromState);
  }

  slowDown = () => {
    this.setState(state => {
      return { ...state, bpm: state.bpm - 20 };
    }, this.setTempoFromState);
  }

  /**
   * 
   * @param {number} time 
   */
  onLoop = (time) => {
    // handle quarter note events
    if(this.quarter.tick()){
      this.pulseColumn.tick();
      this.terrain.columnPulse(time, this.pulseColumn.current);
      this.towers.columnPulse(time, this.pulseColumn.current);
    }

    // handle eighth note events
    if(this.eighth.tick()){

    }

    // handle 16 note events
    // CHECK FOR COLLISIONS??

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
    const newWidth = window.innerWidth - 10;
    const newHeight = window.innerHeight - 100;
    const tileSize = Math.floor(Math.min(newWidth / this.tWidth, newHeight / this.tHeight));

    this.setState({
      vpWidth: tileSize * this.tWidth,
      vpHeight: tileSize * this.tHeight,
    }, () => {
      this.terrain.reSize(tileSize);
      this.towers.reSize(tileSize);
      this.enemy.reSize(tileSize);
      this.ui.reSize(tileSize);
      this.reDraw();
    });

  }

  reDraw() {
    if (!this.terrain) { return; }
    this.terrain.reDraw(this.pulseColumn.current);
    this.towers.reDraw(this.pulseColumn.current);
  }

  render() {
    // TODO: center the canvases in the middle, after resizes
    return <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ position: "relative", flex: "none", height: this.state.vpHeight, padding: "5px" }}>
        <canvas id="terrainCanvas" style={{ zIndex: "10" }} />
        <canvas id="towerCanvas" style={{ zIndex: "20" }} />
        <canvas id="enemyCanvas" style={{ zIndex: "30" }} />
        <canvas id="uiCanvas" style={{ zIndex: "40" }} />
      </div>
      <div style={{ color: "white", padding: "5px", flex: "none", display: "flex", justifyContent: "center" }}>
        <button onClick={this.slowDown} disabled={this.state.bpm < 60}>-</button>

        {this.state.running
          ? <button onClick={this.stop}>Stop</button>
          : <button onClick={this.start}>Start</button>
        }

        <button onClick={this.speedUp} disabled={this.state.bpm > 160}>+</button>
      </div>
    </div>
  }
}

export default App;
