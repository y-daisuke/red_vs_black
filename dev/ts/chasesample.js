var KUMA = "http://enchantjs.com/assets/images/chara1.gif";

/*     Vector     */
// Vector Object
function Vector(x,y){
    this.x = x;
    this.y = y;
}
Vector.prototype.length = function(){
    return Math.sqrt(Vector.dot(this,this));
};
// Vector Methods
Vector.init = function(v){
    return new Vector(v.x,v.y);
};
Vector.add = function(v0,v1){
    return new Vector(v0.x+v1.x, v0.y+v1.y);
};
Vector.sub = function(v0,v1){
    return new Vector(v0.x-v1.x, v0.y-v1.y);
};
Vector.dot = function(v0,v1){
    return (v0.x*v1.x)+(v0.y*v1.y);
};
Vector.scalarTimes = function(a,v){
    return new Vector(a * v.x, a * v.y);
};
/******************/

// enchant.js initialization
enchant();
var game = new Game(320,320);
game.preload(KUMA);

// Class definitions
// User Class
// User can operate this object
var User = Class.create(Sprite,{
    initialize: function(){
        Sprite.call(this, 32, 32);
        this.image = game.assets[KUMA];
        this.frame = 0;
        this.x = game.width - 32;
        this.y = game.height - 32;
        
        // speed
        this.speed = 5;
        
        this.onenterframe = function() {
            var input = game.input;
            if (input.left)  { this.x -= this.speed; }
            if (input.right) { this.x += this.speed; }
            if (input.up)    { this.y -= this.speed; }
            if (input.down)  { this.y += this.speed; }
        };
    }
});

// Predator Class
// This object chases user.
var Predator = Class.create(Sprite,{
    initialize: function(target){
        Sprite.call(this, 32, 32);        
        this.image = game.assets[KUMA];
        this.frame = 5;
        this.x = 0;
        this.y = game.height - 32;
        
        // speed
        this.speed = 5;
        
        this.mode = undefined;
        this.target = target;
        this.prev_target = Vector.init(target);
        
        this.onenterframe = function() {
            var delta;
            if(this.mode=="chase"){
                /*        chase mode           */
                // movement phase
                delta = Vector.sub(target,this);
                this.x += this.speed * delta.x / delta.length();
                this.y += this.speed * delta.y / delta.length();
            }
            if(this.mode=="intercept"){
                /*        intercept mode           */
                // prediction phase
                var target_speed = Vector.sub(this.target,this.prev_target);
                var distance = Vector.sub(target,this);
                var time = distance.length() / this.speed;
                var predict = Vector.add(target,Vector.scalarTimes(time,target_speed));
                
                // movement phase
                delta = Vector.sub(predict,this);
                this.x += this.speed * delta.x / delta.length();
                this.y += this.speed * delta.y / delta.length();
                
                this.prev_target = Vector.init(target);
            }
        };
    }
});

var user,predator;
game.onload = function(){
    game.rootScene.backgroundColor = "#FFF";
    
    user = new User();
    game.rootScene.addChild(user);
    
    predator = new Predator(user);
    game.rootScene.addChild(predator);
};
game.start();

document.querySelector(".js-chase").addEventListener("click",function(){
    predator.mode = "chase";
});
document.querySelector(".js-intercept").addEventListener("click",function(){
    predator.mode = "intercept";
});
document.querySelector(".js-reset").addEventListener("click",function(){
    predator.mode = undefined;
    // reset
    user.x = game.width - 32;
    user.y = game.height - 32;
    predator.x = 0;
    predator.y = game.height - 32;
});