export class Game extends Phaser.State {
  private animals: Phaser.Group;
  private animalText: Phaser.Text;
  private currentAnimal: Phaser.Sprite;
  private isMoving: boolean;
  // private chicken: Phaser.Sprite;
  // private horse: Phaser.Sprite;
  private leftArrow: Phaser.Sprite;
  // private pig: Phaser.Sprite;
  private rightArrow: Phaser.Sprite;
  // private sheep: Phaser.Sprite;

  public preload() {
    this.game.load.image('arrow', 'images/arrow.png');
    this.game.load.image('background', 'images/background.png');
    // this.game.load.image('chicken', 'images/chicken.png');
    // this.game.load.image('horse', 'images/horse.png');
    // this.game.load.image('pig', 'images/pig.png');
    // this.game.load.image('sheep', 'images/sheep3.png');

    this.game.load.spritesheet('chicken', 'images/chicken_spritesheet.png', 131, 200, 3);
    this.game.load.spritesheet('horse', 'images/horse_spritesheet.png', 212, 200, 3);
    this.game.load.spritesheet('pig', 'images/pig_spritesheet.png', 297, 200, 3);
    this.game.load.spritesheet('sheep', 'images/sheep_spritesheet.png', 244, 200, 3);

    this.game.load.audio('chickenSound', ['audio/chicken.ogg', 'audio/chicken.mp3']);
    this.game.load.audio('horseSound', ['audio/horse.ogg', 'audio/horse.mp3']);
    this.game.load.audio('pigSound', ['audio/pig.ogg', 'audio/pig.mp3']);
    this.game.load.audio('sheepSound', ['audio/sheep.ogg', 'audio/sheep.mp3']);
  }

  public create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.add.sprite(0, 0, 'background');

    this.animals = this.game.add.group();
    ['chicken', 'horse', 'pig', 'sheep'].forEach((animal) => {
      const animalSprite: Phaser.Sprite = this.animals.create(1000, this.game.world.centerY, animal, 0);
      animalSprite.anchor.setTo(0.5);
      animalSprite.data = {
        sound: this.game.add.audio(animal + 'Sound'),
        text: animal.toUpperCase(),
      };
      animalSprite.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
      animalSprite.inputEnabled = true;
      animalSprite.input.pixelPerfectClick = true;
      animalSprite.events.onInputDown.add(this.animateAnimal, this);
    });

    this.currentAnimal = this.animals.next();
    this.currentAnimal.x = this.game.world.centerX;

    this.showText(this.currentAnimal);

    // this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
    // this.chicken.anchor.setTo(0.5, 0.5);
    // this.chicken.scale.setTo(2, 1);

    // this.horse = this.game.add.sprite(120, 10, 'horse');
    // this.horse.scale.setTo(0.5);

    // this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');
    // this.pig.anchor.setTo(0.5);
    // this.pig.scale.setTo(-1, 1);
    // this.pig.inputEnabled = true;
    // this.pig.input.pixelPerfectClick = true;
    // this.pig.events.onInputDown.add(this.animateAnimal, this);

    // this.sheep = this.game.add.sprite(100, 250, 'sheep');
    // this.sheep.scale.setTo(0.5);
    // this.sheep.anchor.setTo(0.5);
    // this.sheep.angle = 90;

    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.data = { direction: -1 };
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.data = { direction: 1 };
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
  }

  public update() {
    // this.sheep.angle += 0.5;
  }

  private animateAnimal(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {
    // console.log('animate animal ' + sprite.data.text);
    sprite.play('animate');
    sprite.data.sound.play();
  }

  private showText(animal: Phaser.Sprite) {
    if (!this.animalText) {
      const style: Phaser.PhaserTextStyle = {
        font: 'bold 30pt Arial',
        fill: '#D0171B',
        align: 'center',
      };
      this.animalText = this.game.add.text(this.game.world.centerX, this.game.height * 0.85, '', style);
      this.animalText.anchor.setTo(0.5);
    }

    this.animalText.setText(animal.data.text);
    this.animalText.visible = true;
  }

  private switchAnimal(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {
    // console.log('switch animal ' + sprite.data.direction);
    if (this.isMoving) {
      return;
    }

    this.isMoving = true;
    this.animalText.visible = false;

    const currentAnimalMovement: Phaser.Tween = this.game.add.tween(this.currentAnimal);
    let newAnimal: Phaser.Sprite;
    let newAnimalMovement: Phaser.Tween;

    if (sprite.data.direction === 1) {
      currentAnimalMovement.to({ x: -this.currentAnimal.width / 2 });
      newAnimal = this.animals.next();
      newAnimal.x = this.game.world.width + newAnimal.width / 2;
    } else {
      currentAnimalMovement.to({ x: this.game.world.width + this.currentAnimal.width / 2 });
      newAnimal = this.animals.previous();
      newAnimal.x = -newAnimal.width / 2;
    }

    currentAnimalMovement.onComplete.add(() => {
      this.isMoving = false;
      this.showText(newAnimal);
    });

    newAnimalMovement = this.game.add.tween(newAnimal);
    newAnimalMovement.to({ x: this.game.world.centerX });
    this.currentAnimal = newAnimal;
    currentAnimalMovement.start();
    newAnimalMovement.start();
  }
}
