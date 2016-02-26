function Barn(img) {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;
    this.img = img;
    this.vx = 0;
    this.vy = 0;

};


Barn.prototype.spawn = function () {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;


};

Barn.prototype.paint = function (ctx) {

    ctx.drawImage(this.img, this.x, this.y, 100, 100);

};

Barn.prototype.move = function(){
    
    this.vx = Math.random() * (10 + 10) - 10;
    this.vy = Math.random() * (10 + 10) - 10;
    
};

Barn.prototype.collision = function(){
    
    if(this.x > 1000){
        
        this.x = 999;
        this.vx = this.vx * (-1);
        
    } else if(this.x < 300){
        
        this.x = 301;
        this.vx = this.vx * (-1);
        
    } else if(this.y > 800){
        
        this.y = 799;
        this.vy = this.vy * (-1);
        
    } else if(this.y < 200){
        
        this.y = 201;
        this.vy = this.vy * (-1);
        
    }
    
    
};

            //Målar barnen
        function paint(){
            
            ctx.clearRect(0, 0, 1440, 896);
            
            for(i = 0; i < kid.length; i++){
                
                kid[i].x = kid[i].x + kid[i].vx;
                kid[i].y = kid[i].y + kid[i].vy;
                
                kid[i].paint(ctx);
                
            }
            
        }
            
            //ger nya koordinater till barnen
        function spawn(){
            
            for(i = 0; i < kid.length; i++){
                
                kid[i].spawn();
                
            }
            
        }
            
            function move(){
                
                for(i = 0; i < kid.length; i++){
                    
                    //dis ting took liek a whol lessön
                    kid[i].move();
                    
                }
                
            }
    
            
            //Ser om man klickar på det smutsiga barnet
        function onMouseDown(event){
            //koordinaterna för muspekaren
            var coordinatesX = event.clientX;
            var coordinatesY = event.clientY;
            
            //koordinater för klickruta
            if((coordinatesX > kid[4].x) && (coordinatesX < (kid[4].x + 100)) && (coordinatesY > kid[4].y) && (coordinatesY < (kid[4].y + 100))){
                
                window.clearInterval(update);
                
                window.clearInterval(PAC)
                
                ctx.clearRect(0, 0, 1440, 896);
                
                points ++
                
                document.getElementById("text").innerHTML = "POÄNG: " + points
                
                sekunder = sekunder + 5;
                
                round();
                
            }
            
        }
            
            function keyDown(event){
                //När man trycker på enter
                if ((event.keyCode == 13) && (tryck == 0)){
                    
                    tryck = 1;
                    
                    //Lägger in ett nytt barn i kid arrayen
                    kid.push(new Barn(img, 1))
                    
                    move();
                    
                    game = window.setInterval(update, 1000);
                    
                    //ökar antal med ett
                    antal++;
                    
                    ctx.clearRect(0, 0, 1440, 896);
                    
                    document.getElementById("text2").innerHTML = "";
                    
                    //Kallar på spawn och paint
                    spawn();
                    paint();
                    
                    
                }
                
                if(rundor > 4){
                    
                    PAC = window.setInterval(paintAndCollision, 20);
                    
                }
                
                
            }
            
            //visar hur många barn som är rena efter varje runda
            function round(){
    
                ctx.clearRect(0, 0, 1440, 896);
                ctx.drawImage(img, 600, 400, 200, 200);
                document.getElementById("text2").innerHTML = ": " + antal + "st"
                rundor++
                
                tryck = 0;
                
                window.clearInterval(game);
                
                textChange();
                
            }
            
            function collision(){
                
                for(i = 0; i < kid.length; i++){
                    
                    kid[i].collision();
                    
                }
                
            }
            
            function paintAndCollision(){
                
                paint();
                collision();
                
            }
            
            function timer(){
                
                sekunder--
                var tid = document.getElementById("tid");
                tid.innerHTML = "Tid: " + sekunder
                
            }

            function textChange(){
                
                var tid = document.getElementById("tid");
                tid.innerHTML = "Tid: " + sekunder
                
            }
            
            function gameOver(){
                
                if(sekunder == 0){
                    
                    window.clearInterval(game);
                    ctx.clearRect(0, 0, 1440, 896);
                    
                }
                
            }
            
            function update(){
                
                timer();
                gameOver();
                
            }