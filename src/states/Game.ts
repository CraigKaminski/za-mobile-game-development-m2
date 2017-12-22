export class Game extends Phaser.State {
  private chicken: Phaser.Sprite;
  private horse: Phaser.Sprite;
  private pig: Phaser.Sprite;
  private sheep: Phaser.Sprite;

  public preload() {
    this.game.load.image('background', 'images/background.png');
    this.game.load.image('chicken', 'images/chicken.png');
    this.game.load.image('horse', 'images/horse.png');
    this.game.load.image('pig', 'images/pig.png');
    this.game.load.image('sheep', 'images/sheep3.png');
  }

  public create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.add.sprite(0, 0, 'background');

    this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
    this.chicken.anchor.setTo(0.5, 0.5);
    this.chicken.scale.setTo(2, 1);

    this.horse = this.game.add.sprite(120, 10, 'horse');
    this.horse.scale.setTo(0.5);

    this.pig = this.game.add.sprite(500, 300, 'pig');
    this.pig.anchor.setTo(0.5);
    this.pig.scale.setTo(-1, 1);

    this.sheep = this.game.add.sprite(100, 250, 'sheep');
    this.sheep.scale.setTo(0.5);
    this.sheep.anchor.setTo(0.5);
    this.sheep.angle = 90;
  }

  public update() {
    this.sheep.angle += 0.5;
  }
}
