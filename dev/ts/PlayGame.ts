///<reference path="../lib/phaser.d.ts"/>

module RedVsBlack {    

    export class PlayGame extends Phaser.State {
        static STATE_IDLE = 0;
        static STATE_INIT = 1;
        
        card_space: Phaser.Sprite[];
        
        tefuda_area: Phaser.Sprite[][];
        
        card : Phaser.Sprite[][];
        cardlabel : Phaser.Text[][];
        
        state: number;
        
        
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
                break;
            case  PlayGame.STATE_IDLE:
                break;
            default:
                break;    
            } 
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