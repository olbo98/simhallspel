function Barn(img) {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;
    this.img = img;
    this.vx = 0;
    this.vy = 0;

};

//Ger alla barn slumpmässiga x och y värden
Barn.prototype.spawn = function () {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;


};
//Målar bilden som barnen skall ha
Barn.prototype.paint = function (ctx) {

    ctx.drawImage(this.img, this.x, this.y, 100, 100);

};
//Ger barnen slumpmässiga hastigheter i x och y led
Barn.prototype.move = function(){
    
    this.vx = Math.random() * (10 + 10) - 10;
    this.vy = Math.random() * (10 + 10) - 10;
    
};
//Gör så att barnen inte åker utanför polen
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
            
            var coordinatesX = event.clientX;
            var coordinatesY = event.clientY;
            
            //koordinater för klickruta
            if((coordinatesX > kid[0].x) && (coordinatesX < (kid[0].x + 100)) && (coordinatesY > kid[0].y) && (coordinatesY < (kid[0].y + 100))){
                
                window.clearInterval(update);
                
                window.clearInterval(PAC)
                
                ctx.clearRect(0, 0, 1440, 896);
                
                points ++
                
                document.getElementById("poang").innerHTML = "POÄNG: " + points
                
                sekunder = sekunder + 5;
                
                round();
                
            }
            
        }

            function rentBarnClick(event){
                
                var coordinatesX = event.clientX;
                var coordinatesY = event.clientY;
                
                for(i = 1; i < kid.length; i++){
                    
                    if((coordinatesX > kid[i].x) && (coordinatesX < kid[i].x + 100) && (coordinatesY > kid[i].y) && (coordinatesY < kid[i].y + 100)){
                        
                        sekunder = sekunder - 3;
                        
                        
                        
                    }
                    
                }
                
            }
            
            
            function mouseDownDiv(event){
                    
                    document.getElementById("startKnapp").innerHTML = "";
                
                    document.getElementById("nastaRunda").innerHTML = "";
                
                    document.getElementById("poang").innerHTML = "POÄNG: " + points;
                
                    document.getElementById("tid").innerHTML = "Tid: " + sekunder;
                    
                    tryck = 1;
                    
                    //Lägger in ett nytt barn i kid arrayen
                    kid.push(new Barn(img, 1))
                    
                    move();
                    
                    game = window.setInterval(update, 500);
                    
                    //ökar antal med ett
                    antal++;
                    
                    ctx.clearRect(0, 0, 1440, 896);
                    
                    document.getElementById("renaBarnAntal").innerHTML = "";
                    
                    //Kallar på spawn och paint
                    spawn();
                    paint();
                    
                    if(rundor > 4){
                    
                    PAC = window.setInterval(paintAndCollision, 20);
                    
                    }
                    
                }
                
            
            
            //visar hur många barn som är rena efter varje runda
            function round(){
    
                ctx.clearRect(0, 0, 1440, 896);
                ctx.drawImage(img, 600, 400, 200, 200);
                document.getElementById("renaBarnAntal").innerHTML = ": " + antal + "st"
                rundor++
                
                tryck = 0;
                
                window.clearInterval(game);
                
                document.getElementById("tid").innerHTML = "Tid: " + sekunder;
                
                document.getElementById("nastaRunda").innerHTML = "Nästa runda"
                
            }
            //
            function collision(){
                
                for(i = 0; i < kid.length; i++){
                    
                    kid[i].collision();
                     
                }
                
            }
            
            function paintAndCollision(){
                
                paint();
                collision();
                
            }
            //Timer
            function timer(){
                
                sekunder--
                var tid = document.getElementById("tid");
                tid.innerHTML = "Tid: " + sekunder
                
            }
            
            //Återställer spelet när tiden är slut
            function gameOver(){
                
                if(sekunder <= 0){
                    
                    tryck = 0;
                    sekunder = 10;
                    
                    kid = [new Barn(img2), new Barn(img), new Barn(img), new Barn(img), new Barn(img)];
                    window.clearInterval(game);
                    window.clearInterval(PAC);
                    
                    var tid = document.getElementById("tid");
                    tid.innerHTML = "Tid: 0"
                    ctx.clearRect(0, 0, 1440, 896);
                    
                }
                
            }
            
            function update(){
                
                timer();
                gameOver();
                
            }