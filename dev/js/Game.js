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
