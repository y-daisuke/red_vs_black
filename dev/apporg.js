///<reference path="../lib/phaser.d.ts"/>
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('card1', 'asset/image/card1.png');
        this.game.load.image('card_space', 'asset/image/card_space.png');
    };
    SimpleGame.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.desiredFps = 60;
        this.card_space1 = this.game.add.sprite(this.game.world.centerX - 100, this.game.world.centerY, 'card_space');
        this.card_space2 = this.game.add.sprite(this.game.world.centerX + 100, this.game.world.centerY, 'card_space');
        this.tefuda_area = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 200, 'card1');
        this.card1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 200, 'card1');
        this.card_space1.anchor.setTo(0.5, 0.5);
        this.card_space2.anchor.setTo(0.5, 0.5);
        this.tefuda_area.anchor.setTo(0.5, 0.5);
        this.card1.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.card1, Phaser.Physics.ARCADE);
        this.CARD_STATE_IDLE = 0;
        this.CARD_STATE_SELECTED = 1;
        this.CARD_STATE_BACK = 2;
        this.card_state = this.CARD_STATE_IDLE;
    };
    SimpleGame.prototype.update = function () {
        switch (this.card_state) {
            case this.CARD_STATE_IDLE:
                if (this.game.input.mousePointer.isDown) {
                    if (Phaser.Rectangle.contains(this.card1.body, this.game.input.x, this.game.input.y)) {
                        this.card_state = this.CARD_STATE_SELECTED;
                    }
                }
                break;
            case this.CARD_STATE_SELECTED:
                if (this.game.input.mousePointer.isDown) {
                    this.game.physics.arcade.moveToPointer(this.card1, 400);
                }
                else {
                    this.game.physics.arcade.moveToXY(this.card1, this.tefuda_area.position.x, this.tefuda_area.position.y, 1000);
                    this.card_state = this.CARD_STATE_BACK;
                }
                break;
            case this.CARD_STATE_BACK:
                if (this.tefuda_area.position.equals(this.card1.position)) {
                    this.card1.body.velocity.setTo(0, 0);
                    this.card_state = this.CARD_STATE_IDLE;
                }
                break;
            default:
                break;
        }
    };
    SimpleGame.prototype.render = function () {
        //this.game.debug.text('isTouch:' + this.is_card_selected , 20, 20);
        //this.game.debug.pointer(this.game.input.mousePointer);   
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
