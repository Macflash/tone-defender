import React, { Component } from 'react';
import * as Tone from 'tone';
import Terrain from './layers/terrain';
import Towers from './layers/towers';
import Ui from './layers/ui';
import Shooter from './towers/shooter';
import Pulser from './towers/pulser';
import Ticker from './utils/ticker';
import Base from './towers/base';
import Enemies from './layers/enemies';
import Walker from './enemies/walker';

class App extends Component {
  tHeight = 8;
  tWidth = 8;
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      bpm: 120,
    };
  }

  handleUiClick = (x, y) => {
    if(this.enemies.path.getCell(x,y)){
      return;
    }

    var cell = this.towers.towers.getCell(x, y);
    if (cell) { // cell has a tower
      if (cell instanceof Pulser) {
        this.towers.towers.setCell(x, y, new Shooter(0, this.tileSize));
      }
      if (cell instanceof Shooter) { // rotate and delete shooter turrets
        if (cell.direction >= 3) {
          this.towers.towers.setCell(x, y, undefined);
        }
        else {
          cell.direction++;
        }

        // otherwise no-op, don't change other towers
      }
    } else { // Cell is empty
      this.towers.towers.setCell(x, y, new Pulser(0, this.tileSize));
    }

    this.reSize();
    this.towers.reDraw();
  }

  componentDidMount() {
    // Init Canvas components
    this.terrain = new Terrain("terrainCanvas", this.tWidth, this.tHeight);
    this.towers = new Towers("towerCanvas", this.tWidth, this.tHeight);
    this.enemies = new Enemies("enemyCanvas", this.tWidth, this.tHeight);
    this.ui = new Ui("uiCanvas", this.tWidth, this.tHeight, this.handleUiClick);

    this.reSize();

    this.enemies.enemies.setCell(1, 1, [new Walker(this.tWidth, "pulse")]);

    this.enemies.path.setCell(1, 1, { x: 0, y: 1 });
    this.enemies.path.setCell(1, 2, { x: 0, y: 1 });
    this.enemies.path.setCell(1, 3, { x: 0, y: 1 });
    this.enemies.path.setCell(1, 4, { x: 0, y: 1 });
    this.enemies.path.setCell(1, 5, { x: 1, y: 0 });
    this.enemies.path.setCell(2, 5, { x: 1, y: 0 });
    this.enemies.path.setCell(3, 5, { x: 1, y: 0 });
    this.enemies.path.setCell(4, 5, { x: 1, y: 0 });
    this.enemies.path.setCell(5, 5, { x: 1, y: 0 });
    this.enemies.path.setCell(6, 5, { x: 1, y: 0 });

    this.towers.towers.setCell(7, 5, new Base(this.tWidth, "pulse"));

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
    if (this.quarter.tick()) {
      this.pulseColumn.tick();
      this.terrain.columnPulse(time, this.pulseColumn.current);
      this.towers.columnPulse(time, this.pulseColumn.current);
      this.enemies.columnPulse(time, this.pulseColumn.current);
    }

    // handle eighth note events
    if (this.eighth.tick()) {
      this.enemies.moveEnemies();
      this.enemies.reDraw();
    }

    this.towers.moveProjectiles();

    // check for collisions?
    this.towers.checkForTowerProjectileCollisions(time);

    this.towers.reDraw();

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
    this.tileSize = Math.floor(Math.min(newWidth / this.tWidth, newHeight / this.tHeight));

    this.setState({
      vpWidth: this.tileSize * this.tWidth,
      vpHeight: this.tileSize * this.tHeight,
    }, () => {
      this.terrain.reSize(this.tileSize);
      this.towers.reSize(this.tileSize);
      this.enemies.reSize(this.tileSize);
      this.ui.reSize(this.tileSize);
      this.reDraw();
    });

  }

  reDraw() {
    if (!this.terrain) { return; }
    this.terrain.reDraw(this.pulseColumn.current);
    this.towers.reDraw(this.pulseColumn.current);
    this.enemies.reDraw(this.pulseColumn.current);
  }

  render() {
    // TODO: center the canvases in the middle, after resizes
    return <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ position: "relative", flex: "none", height: this.state.vpHeight, padding: "5px" }}>
        <canvas id="terrainCanvas" style={{ zIndex: "10" }} />
        <canvas id="enemyCanvas" style={{ zIndex: "20" }} />
        <canvas id="towerCanvas" style={{ zIndex: "30" }} />
        <canvas id="uiCanvas" style={{ zIndex: "40" }} />
      </div>
      <div style={{ color: "white", padding: "5px", height: "10vw", flex: "none", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div onClick={this.slowDown}
          disabled={this.state.bpm < 60}
          style={{
            cursor: "pointer",
            margin: "0 10vw",
            width: 0, height: 0,
            borderBottom: "3vw solid transparent",
            borderRight: "4vw solid grey",
            borderTop: "3vw solid transparent",
          }}></div>

        {this.state.running
          ? <div onClick={this.stop} style={{ backgroundColor: "red", width: "8vw", height: "8vw" }}></div>
          : <div onClick={this.start} style={{
            cursor: "pointer",
            width: 0, height: 0,
            borderTop: "5vw solid transparent",
            borderLeft: "8vw solid green",
            borderBottom: "5vw solid transparent",
          }}></div>
        }

        <div onClick={this.speedUp}
          disabled={this.state.bpm > 160}
          style={{
            cursor: "pointer",
            margin: "0 10vw",
            width: 0, height: 0,
            borderTop: "3vw solid transparent",
            borderLeft: "4vw solid grey",
            borderBottom: "3vw solid transparent",
          }}></div>

      </div>
    </div>
  }
}

export default App;
