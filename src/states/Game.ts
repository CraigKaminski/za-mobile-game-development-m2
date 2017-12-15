export class Game extends Phaser.State {
  public preload() {
    this.game.load.image('background', 'images/background.png');
  }

  public create() {
    const logo = this.game.add.sprite(0, 0, 'background');
    // logo.anchor.setTo(0.5, 0.5);
  }
}
