function Barn(img) {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;
    this.img = img;
    this.ren = 1;
    this.vx = 0;
    this.vy = 0;

}


Barn.prototype.spawn = function () {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;


}

Barn.prototype.paint = function (ctx) {

    ctx.drawImage(this.img, this.x, this.y, 100, 100);

}

Barn.prototype.move = function(){
    
    this.x = this.x + this.vx;
    this.y = this.y + this.vy
    
}