// tslint:disable:ordered-imports
import 'p2';
import 'pixi';
import 'phaser';
// tslint:enable:ordered-imports

import { Game } from './states/Game';

const game = new Phaser.Game(640, 360, Phaser.AUTO, '', null);
game.state.add('Game', Game);
game.state.start('Game');
