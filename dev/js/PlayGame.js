///<reference path="../lib/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedVsBlack;
(function (RedVsBlack) {
    var Card = (function () {
        function Card(mark, num) {
            this.mark = mark;
            this.num = num;
        }
        Card.prototype.isBlack = function () {
            var ret = false;
            if (this.mark == Card.MARK_SPADE || this.mark == Card.MARK_CLUB) {
                ret = true;
            }
            return ret;
        };
        Card.index = function (mark, num) {
            var ret = 0;
            ret = (mark * Card.NUM_CARD_MAX) + (num - 1);
            return ret;
        };
        Card.MARK_SPADE = 0;
        Card.MARK_DIA = 1;
        Card.MARK_HART = 2;
        Card.MARK_CLUB = 3;
        Card.NUM_CARD_MAX = 13;
        Card.NUM_MARK_MAX = 4;
        Card.NUM_SPECIAL_CARD_MAX = 4;
        return Card;
    }());
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
                    this.shuffleAndDeals();
                    break;
                case PlayGame.STATE_IDLE:
                    break;
                default:
                    break;
            }
        };
        PlayGame.prototype.shuffleAndDeals = function () {
            this.initCard();
            this.dealsCard();
            this.openCardAll();
        };
        PlayGame.prototype.initCard = function () {
            //this.allcards = new Array((PlayGame.NUM_CARD_MAX*PlayGame.NUM_MARK_MAX)+(PlayGame.NUM_SPECIAL_CARD_MAX));
            this.allcards = new Array((Card.NUM_CARD_MAX * Card.NUM_MARK_MAX));
            var cnt = 0;
            for (var i = 0; i < Card.NUM_CARD_MAX; i++) {
                cnt = Card.index(Card.MARK_SPADE, i + 1);
                this.allcards[cnt] = new Card(i + 1, Card.MARK_SPADE);
                cnt = Card.index(Card.MARK_CLUB, i + 1);
                this.allcards[cnt] = new Card(i + 1, Card.MARK_CLUB);
                cnt = Card.index(Card.MARK_DIA, i + 1);
                this.allcards[cnt] = new Card(i + 1, Card.MARK_DIA);
                cnt = Card.index(Card.MARK_HART, i + 1);
                this.allcards[cnt] = new Card(i + 1, Card.MARK_HART);
            }
        };
        PlayGame.prototype.shuffle = function (array) {
            var n = array.length;
            var retarray = array.concat();
            var t;
            var i;
            while (n) {
                i = Math.floor(Math.random() * n--);
                t = retarray[n];
                retarray[n] = retarray[i];
                retarray[i] = t;
            }
            return retarray;
        };
        PlayGame.prototype.dealsCard = function () {
            var max = this.allcards.length;
            this.players_cards = new Array(2);
            this.players_cards[0] = new Array(max);
            this.players_cards[1] = new Array(max);
            this.player1_card_count = 0;
            this.player2_card_count = 0;
            var cards = this.shuffle(this.allcards);
            for (var i = 0; i < max; i++) {
                if ((i % 2) == 0) {
                    this.players_cards[0][this.player1_card_count] = cards[i];
                    this.player1_card_count++;
                }
                else {
                    this.players_cards[1][this.player2_card_count] = cards[i];
                    this.player2_card_count++;
                }
            }
        };
        PlayGame.prototype.openCardAll = function () {
            var ;
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
