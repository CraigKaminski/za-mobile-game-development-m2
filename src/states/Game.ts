export class Game extends Phaser.State {
  public preload() {
    this.game.load.image('background', 'images/background.png');
    this.game.load.image('chicken', 'images/chicken.png');
    this.game.load.image('horse', 'images/horse.png');
    this.game.load.image('pig', 'images/pig.png');
    this.game.load.image('sheep', 'images/sheep3.png');
  }

  public create() {
    const logo = this.game.add.sprite(0, 0, 'background');
    const chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
    chicken.anchor.setTo(0.5, 0.5);
  }
}
