///<reference path="../lib/phaser.d.ts"/>

module RedVsBlack {    
    class Card {
        static MARK_SPADE = 0;
        static MARK_DIA = 1;
        static MARK_HART = 2;
        static MARK_CLUB = 3;

        static NUM_CARD_MAX = 13;
        static NUM_MARK_MAX = 4;
        static NUM_SPECIAL_CARD_MAX = 4;

        mark:number;
        num:number;
        
        constructor(mark:number,num:number){
            this.mark = mark;
            this.num = num;
        }

        public isBlack():boolean{
            var ret = false;
            if ( this.mark == Card.MARK_SPADE || this.mark == Card.MARK_CLUB )
            {
                ret = true;    
            }
            return ret;
        }
        public static index(mark:number,num:number):number {
            var ret = 0;
            ret = (mark * Card.NUM_CARD_MAX) + (num - 1)
            
            return ret;
        }
        
    }
    
    export class PlayGame extends Phaser.State {
        static STATE_IDLE = 0;
        static STATE_INIT = 1;
        
        
        
        card_space: Phaser.Sprite[];
        
        tefuda_area: Phaser.Sprite[][];
        
        card : Phaser.Sprite[][];
        cardlabel : Phaser.Text[][];
        
        state: number;

        allcards : Card[];
        players_cards : Card[][];
        player1_card_count:number;
        player2_card_count:number;
        
        create() {
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
            
            this.card_space[0] = this.add.sprite(this.world.centerX - 100, 
                this.world.centerY, 'card_space');
            this.card_space[1] = this.add.sprite(this.world.centerX + 100, 
                this.world.centerY, 'card_space');
            this.card_space[0].anchor.setTo(0.5, 0.5);
            this.card_space[1].anchor.setTo(0.5, 0.5);

            var y1 = this.world.centerY + 200;
            var y2 = this.world.centerY - 200;
            var x1 = this.world.centerX - (100*2);
            for ( var i=0;i<4;i++){
                this.tefuda_area[0][i] = this.add.sprite(x1, y1, 'card1');
                this.tefuda_area[1][i] = this.add.sprite(x1, y2, 'card1');
                this.tefuda_area[0][i].anchor.setTo(0.5, 0.5);
                this.tefuda_area[1][i].anchor.setTo(0.5, 0.5);
                x1 += 100;                
            }            
            
            for ( var i=0;i<6;i++){
                this.card[0][i] = this.add.sprite(-100, -100, 'card1');
                this.card[1][i] = this.add.sprite(-100, -100, 'card1');
                this.card[0][i].anchor.setTo(0.5, 0.5);
                this.card[1][i].anchor.setTo(0.5, 0.5);
                this.cardlabel[0][i] = this.add.text(0,0,"123",{});
                this.cardlabel[1][i] = this.add.text(0,0,"123",{});
                this.cardlabel[0][i].anchor.setTo(0.5,0.5);
                this.cardlabel[1][i].anchor.setTo(0.5,0.5);
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
        }
        
        ondragend(sprite:Phaser.Sprite,point:Phaser.Point){
            if ( this.containsAll( this.card_space[0],sprite)){
                this.add.tween(sprite).to(
                    {x: this.card_space[0].position.x, 
                    y: this.card_space[0].position.y }, 
                    100, Phaser.Easing.Linear.None, true);
                
            } else {
                //this.add.tween(sprite).to(
                //    {x: this.tefuda_area.position.x, 
                //    y: this.tefuda_area.position.y }, 
                //    400, Phaser.Easing.Back.Out, true);
                                
            }
        }
        update(){
            switch( this.state) {
            case  PlayGame.STATE_INIT:
                this.shuffleAndDeals();
                break;
            case  PlayGame.STATE_IDLE:
                break;
            default:
                break;    
            } 
        }
        
        shuffleAndDeals(){
            this.initCard();
            this.dealsCard();
            this.openCardAll();            
        }
        
        initCard(){
            //this.allcards = new Array((PlayGame.NUM_CARD_MAX*PlayGame.NUM_MARK_MAX)+(PlayGame.NUM_SPECIAL_CARD_MAX));
            this.allcards = new Array((Card.NUM_CARD_MAX*Card.NUM_MARK_MAX));
            var cnt =0;
            for ( var i=0;i<Card.NUM_CARD_MAX;i++) {
                cnt = Card.index(Card.MARK_SPADE,i+1);
                this.allcards[cnt] = new Card(i+1,Card.MARK_SPADE);

                cnt = Card.index(Card.MARK_CLUB,i+1);
                this.allcards[cnt] = new Card(i+1,Card.MARK_CLUB);

                cnt = Card.index(Card.MARK_DIA,i+1);
                this.allcards[cnt] = new Card(i+1,Card.MARK_DIA);

                cnt = Card.index(Card.MARK_HART,i+1);
                this.allcards[cnt] = new Card(i+1,Card.MARK_HART);
            }
            
        }

        shuffle(array:Card[]):Card[] {
            var n = array.length;
            var retarray = array.concat();
            var t:Card;
            var i:number;

            while (n) {
                i = Math.floor(Math.random() * n--);
                t = retarray[n];
                retarray[n] = retarray[i];
                retarray[i] = t;
            }

            return retarray;
        }
        
        dealsCard(){
            var max = this.allcards.length;
            
            this.players_cards = new Array(2);
            this.players_cards[0] = new Array(max);
            this.players_cards[1] = new Array(max);

            this.player1_card_count = 0;
            this.player2_card_count = 0;

            var cards = this.shuffle(this.allcards);
            
            for ( var i=0;i<max;i++){
                if (( i % 2) == 0 ){
                    this.players_cards[0][this.player1_card_count] = cards[i];
                    this.player1_card_count++;            
                } else {
                    this.players_cards[1][this.player2_card_count] = cards[i];
                    this.player2_card_count++;            
                }
            }
        }
        
        openCardAll(){
            var 
        }        

        contains(sprite:Phaser.Sprite,x:number,y:number):boolean {
            var ret = false;
            
            var x1 = sprite.position.x;
            var y1 = sprite.position.y;
            var x2 = sprite.position.x + sprite.width;
            var y2 = sprite.position.y + sprite.height;
            if ( x >= x1 && x <=x2 && y >= y1 && y <= y2  ){
                ret = true;
            }            
            return ret;
        }

        containsAll(s1:Phaser.Sprite,s2:Phaser.Sprite):boolean {
            var ret = false;
            
            
            if ( s2.top >= s1.top && s2.bottom <= s1.bottom 
                 && s2.left >= s1.left && s2.right <= s1.right ){
                ret = true;
            }            
            return ret;
        }
        
        checkOverrap(sprite1:Phaser.Sprite,sprite2:Phaser.Sprite) : boolean {
            var ret = false;
            
            var x1 = sprite1.position.x;
            var y1 = sprite1.position.y;
            var x2 = sprite2.position.x;
            var y2 = sprite2.position.y;
            if ( x2 >= (x1-10) && (x1+10) >= x2 && y2 >= (y1-10) && (y1+10) >= y2  ){
                ret = true;
            }            
            return ret;
        }

        render(){
            this.game.debug.text(this.time.suggestedFps.toString(), 32, 32);

        }
    }

}