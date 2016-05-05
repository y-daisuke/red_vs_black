///<reference path="../lib/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedVsBlack;
(function (RedVsBlack) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/image/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.scale.pageAlignHorizontally = true;
            }
            else {
                //  Same goes for mobile settings.
                //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 480;
                this.scale.minHeight = 260;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 768;
                //this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    RedVsBlack.Boot = Boot;
})(RedVsBlack || (RedVsBlack = {}));

///<reference path="../lib/phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="PlayGame.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedVsBlack;
(function (RedVsBlack) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', RedVsBlack.Boot, false);
            this.state.add('Preloader', RedVsBlack.Preloader, false);
            this.state.add('MainMenu', RedVsBlack.MainMenu, false);
            this.state.add('PlayGame', RedVsBlack.PlayGame, false);
            this.state.start('Boot');
        }
        return Game;
    }(Phaser.Game));
    RedVsBlack.Game = Game;
})(RedVsBlack || (RedVsBlack = {}));

///<reference path="../lib/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedVsBlack;
(function (RedVsBlack) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('PlayGame', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    RedVsBlack.MainMenu = MainMenu;
})(RedVsBlack || (RedVsBlack = {}));

///<reference path="../lib/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedVsBlack;
(function (RedVsBlack) {
    var PlayGame = (function (_super) {
        __extends(PlayGame, _super);
        function PlayGame() {
            _super.apply(this, arguments);
        }
        PlayGame.prototype.create = function () {
            //this.physics.startSystem(Phaser.Physics.ARCADE);
            this.time.desiredFps = 60;
            this.card_space = new Array(2);
            this.tefuda_area = new Array(2);
            this.tefuda_area[0] = new Array(4);
            this.tefuda_area[1] = new Array(4);
            this.card = new Array(2);
            this.card[0] = new Array(6);
            this.card[1] = new Array(6);
            this.cardlabel = new Array(2);
            this.cardlabel[0] = new Array(6);
            this.cardlabel[1] = new Array(6);
            this.card_space[0] = this.add.sprite(this.world.centerX - 100, this.world.centerY, 'card_space');
            this.card_space[1] = this.add.sprite(this.world.centerX + 100, this.world.centerY, 'card_space');
            this.card_space[0].anchor.setTo(0.5, 0.5);
            this.card_space[1].anchor.setTo(0.5, 0.5);
            var y1 = this.world.centerY + 200;
            var y2 = this.world.centerY - 200;
            var x1 = this.world.centerX - (100 * 2);
            for (var i = 0; i < 4; i++) {
                this.tefuda_area[0][i] = this.add.sprite(x1, y1, 'card1');
                this.tefuda_area[1][i] = this.add.sprite(x1, y2, 'card1');
                this.tefuda_area[0][i].anchor.setTo(0.5, 0.5);
                this.tefuda_area[1][i].anchor.setTo(0.5, 0.5);
                x1 += 100;
            }
            for (var i = 0; i < 6; i++) {
                this.card[0][i] = this.add.sprite(-100, -100, 'card1');
                this.card[1][i] = this.add.sprite(-100, -100, 'card1');
                this.card[0][i].anchor.setTo(0.5, 0.5);
                this.card[1][i].anchor.setTo(0.5, 0.5);
                this.cardlabel[0][i] = this.add.text(0, 0, "123", {});
                this.cardlabel[1][i] = this.add.text(0, 0, "123", {});
                this.cardlabel[0][i].anchor.setTo(0.5, 0.5);
                this.cardlabel[1][i].anchor.setTo(0.5, 0.5);
                this.card[0][i].addChild(this.cardlabel[0][i]);
                this.card[1][i].addChild(this.cardlabel[1][i]);
                this.card[0][i].inputEnabled = true;
                this.card[1][i].inputEnabled = true;
                this.card[0][i].input.enableDrag();
                this.card[1][i].input.enableDrag();
                this.card[0][i].events.onDragStop.add(this.ondragend, this);
                this.card[1][i].events.onDragStop.add(this.ondragend, this);
            }
            this.state = PlayGame.STATE_INIT;
        };
        PlayGame.prototype.ondragend = function (sprite, point) {
            if (this.containsAll(this.card_space[0], sprite)) {
                this.add.tween(sprite).to({ x: this.card_space[0].position.x,
                    y: this.card_space[0].position.y }, 100, Phaser.Easing.Linear.None, true);
            }
            else {
            }
        };
        PlayGame.prototype.update = function () {
            switch (this.state) {
                case PlayGame.STATE_INIT:
                    break;
                case PlayGame.STATE_IDLE:
                    break;
                default:
                    break;
            }
        };
        PlayGame.prototype.contains = function (sprite, x, y) {
            var ret = false;
            var x1 = sprite.position.x;
            var y1 = sprite.position.y;
            var x2 = sprite.position.x + sprite.width;
            var y2 = sprite.position.y + sprite.height;
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                ret = true;
            }
            return ret;
        };
        PlayGame.prototype.containsAll = function (s1, s2) {
            var ret = false;
            if (s2.top >= s1.top && s2.bottom <= s1.bottom
                && s2.left >= s1.left && s2.right <= s1.right) {
                ret = true;
            }
            return ret;
        };
        PlayGame.prototype.checkOverrap = function (sprite1, sprite2) {
            var ret = false;
            var x1 = sprite1.position.x;
            var y1 = sprite1.position.y;
            var x2 = sprite2.position.x;
            var y2 = sprite2.position.y;
            if (x2 >= (x1 - 10) && (x1 + 10) >= x2 && y2 >= (y1 - 10) && (y1 + 10) >= y2) {
                ret = true;
            }
            return ret;
        };
        PlayGame.prototype.render = function () {
            this.game.debug.text(this.time.suggestedFps.toString(), 32, 32);
        };
        PlayGame.STATE_IDLE = 0;
        PlayGame.STATE_INIT = 1;
        return PlayGame;
    }(Phaser.State));
    RedVsBlack.PlayGame = PlayGame;
})(RedVsBlack || (RedVsBlack = {}));

///<reference path="../lib/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedVsBlack;
(function (RedVsBlack) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('titlepage', 'assets/image/titlepage.png');
            this.load.image('logo', 'assets/image/logo.png');
            this.load.image('main', 'assets/image/main.png');
            this.load.image('card1', 'assets/image/card1.png');
            this.load.image('card_space', 'assets/image/card_space.png');
            //this.load.audio('music', 'assets/title.mp3', true);
            //this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            //this.load.image('level1', 'assets/level1.png');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    RedVsBlack.Preloader = Preloader;
})(RedVsBlack || (RedVsBlack = {}));

///<reference path="Game.ts"/>
window.onload = function () {
    var game = new RedVsBlack.Game();
};
