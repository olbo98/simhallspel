function Barn(img) {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;
    this.img = img;
    this.vx = 0;
    this.vy = 0;

};

//Ger alla barn slumpmässiga x och y värden mellan 1000 och 300
Barn.prototype.spawn = function () {

    this.x = Math.random() * (1000 - 300) + 300;
    this.y = Math.random() * (800 - 200) + 200;


};
//Målar bilden som barnen skall ha
Barn.prototype.paint = function (ctx) {

    ctx.drawImage(this.img, this.x, this.y, 100, 100);

};
//Ger barnen slumpmässiga hastigheter i x och y led mellan 10 och -10
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

            //Målar barnen och lägger till hastigheten till x-värdet
        function paint(){
            
            ctx.clearRect(0, 0, 1440, 896);
            
            for(i = 0; i < kid.length; i++){
                
                kid[i].x = kid[i].x + kid[i].vx;
                kid[i].y = kid[i].y + kid[i].vy;
                
                kid[i].paint(ctx);
                
            };
            
        };
            
            //ger nya koordinater till barnen
        function spawn(){
            
            for(i = 0; i < kid.length; i++){
                
                kid[i].spawn();
                
            };
            
        };
            //Gör så att varje barn börjar röra sig
            function move(){
                
                for(i = 0; i < kid.length; i++){
                    
                        
                    kid[i].move();
                    
                };
                
            };
    
            
            
        function onMouseDown(event){
            
            var coordinatesX = event.clientX;
            var coordinatesY = event.clientY;
            
            //Ser om man klickar på det smutsiga barnet
            if((coordinatesX > kid[0].x) && (coordinatesX < (kid[0].x + 100)) && (coordinatesY > kid[0].y) && (coordinatesY < (kid[0].y + 100))){
                
                smutsigClick.play();
                
                //window.clearInterval(update);
                
                window.clearInterval(PAC)
                
                ctx.clearRect(0, 0, 1440, 896);
                
                points ++
                
                //Återställer spelet när du vinner
                if(points == 20){
                    
                    sekunder = 10;
                    
                    kid = [new Barn(smutsig), new Barn(ren), new Barn(ren), new Barn(ren), new Barn(ren)];
                    //Pausar spelet
                    window.clearInterval(game);
                    window.clearInterval(PAC);
                    
                    ctx.clearRect(0, 0, 1440, 896);
                    ctx2.clearRect(0, 0, 1440, 896);
                    
                    tid.innerHTML = "";
                    timesUp.innerHTML = "DU HAR VUNNIT!";
                    tillbaka.innerHTML = "Till menyn";
                    poang.innerHTML = "POÄNG: " + points;
                    
                    poang.style.top = 460;
                    poang.style.left = 580;
                    poang.style.fontSize = 70;
                    
                }else{
                
                poang.innerHTML = "POÄNG: " + points
                
                sekunder = sekunder + 5;
                
                round();
                    
                };
                
            };
            
        };

            function rentBarnClick(event){
                
                var coordinatesX = event.clientX;
                var coordinatesY = event.clientY;
                
                for(i = 1; i < kid.length; i++){
                    
                    if((coordinatesX > kid[i].x) && (coordinatesX < kid[i].x + 100) && (coordinatesY > kid[i].y) && (coordinatesY < kid[i].y + 100)){
                        
                        textFadeOut("-5", event);
                        sekunder = sekunder - 5;
                        
                    };
                    
                };
                
            };
            
            
            function mouseDownDiv(event){
                    
                    menuClick.play();
                
                    simmhallSound.loop = true;
                    simmhallSound.play();
                    
                    startKnapp.innerHTML = "";
                    
                    instruktioner.innerHTML = "";
                
                    document.getElementById("nastaRunda").innerHTML = "";
                
                    poang.innerHTML = "POÄNG: " + points;
                
                    tid.innerHTML = "Tid: " + sekunder;
                    
                    move();
                    
                    game = window.setInterval(update, 500);
                    
                    //ökar antal med ett
                    antal++;
                    
                    ctx.clearRect(0, 0, 1440, 896);
                    
                    document.getElementById("renaBarnAntal").innerHTML = "";
                    
                    //Kallar på spawn och paint
                    spawn();
                    paint();
                    
                    if(points > 4){
                    
                    //Detta gör så att barnen får updaterade positioner var 20:e millisekund 
                    PAC = window.setInterval(paintAndCollision, 20);
                    
                    };
                    
                };
                
            
            
            //visar hur många barn som är rena efter varje runda
            function round(){
                //Skapar ett nytt barn i arrayen
                kid.push(new Barn(ren))
                
                ctx.clearRect(0, 0, 1440, 896);
                ctx.drawImage(ren, 490, 425, 200, 200);
                document.getElementById("renaBarnAntal").innerHTML = ": " + antal + "st"
                rundor++
                
                hideKids();
                
                window.clearInterval(game);
                
                tid.innerHTML = "Tid: " + sekunder;
                
                document.getElementById("nastaRunda").innerHTML = "Nästa runda"
                
            };
            //Gör så att varje barn håller sig inanför polområdet
            function collision(){
                
                for(i = 0; i < kid.length; i++){
                    
                    kid[i].collision();
                     
                };
                
            };
            
            function paintAndCollision(){
                
                paint();
                collision();
                
            };
            //Timer som räknar ner
            function timer(){
                
                sekunder--
                tid.innerHTML = "Tid: " + sekunder
                
            };
            
            //Återställer spelet när tiden är slut
            function gameOver(){
                
                if(sekunder <= 0){
                    //Pausar ljudet
                    simmhallSound.pause()
                    
                    antal = 4;
                    
                    sekunder = 10;
                    
                    kid = [new Barn(smutsig), new Barn(ren), new Barn(ren), new Barn(ren), new Barn(ren)];
                    //Stoppar intervaller
                    window.clearInterval(game);
                    window.clearInterval(PAC);
                    window.clearInterval(opacitetInterval);
                    //Suddar canvas1 och canvas2
                    ctx.clearRect(0, 0, 1440, 896);
                    ctx2.clearRect(0, 0, 1440, 896);
                    
                    tid.innerHTML = "";
                    timesUp.innerHTML = "Tiden är ute!";
                    tillbaka.innerHTML = "Till menyn";
                    //Flyttar poang taggens position
                    poang.style.top = 460;
                    poang.style.left = 580;
                    poang.style.fontSize = 70;
                    
                };
                
            };
            
            function update(){
                
                timer();
                gameOver();
                
            };

            function textFadeOut(text, event){
                
                var opacitet = 1.0;//Full opacitet
                var coordinatesX = event.clientX;//x-koordinaterna för muspekaren
                var coordinatesY = event.clientY;//y-koordinaterna för muspekaren
                //Skapar ett interval där vi skapar funktionen när vi skapar intervallet
                opacitetInterval = setInterval(function(){
                    
                    //suddar vid ett område runt texten som vi skapar nedan
                    ctx2.clearRect(coordinatesX, coordinatesY - 100, 100, 200);
                    
                    //Minskar opaciteten på texten samtidigt som den flyttas uppåt
                    ctx2.fillStyle = "rgba(255, 0, 0," + opacitet + ")";
                    ctx2.font = "50px Arial";
                    //Skapar text vid muspekaren
                    ctx2.fillText(text, coordinatesX, coordinatesY);
                    
                    opacitet = opacitet - 0.05;//Sänker opaciteten
                    coordinatesY = coordinatesY - 1;//Flyttar text uppåt
                    
                    //Om opaciteten är noll, tag bort intervallet
                    if(opacitet < 0){
                        
                        ctx2.clearRect(0, 0, 1440, 896);
                        window.clearInterval(opacitetInterval);
                    
                    };
                    
                }, 50);
                
            };
            
            //Flyttar barnen utanför canvas så att man inte kan klicka på dem
            function hideKids(){
                
                for(i = 0; i < kid.length; i++){
                    
                    kid[i].x = -100;
                    
                };
                
            };
            
            function toStart(){
                //Spelar click ljudet
                menuClick.play();
                
                points = 0;
                
                tillbaka.innerHTML = "";
                timesUp.innerHTML = "";
                poang.innerHTML = "";
                startKnapp.innerHTML = "START";
                instruktioner.innerHTML = "INSTRUKTIONER"
                
                instruktionSmutsig.innerHTML = ""
                instruktionSmutsig2.innerHTML = ""
                instruktionSmutsig3.innerHTML = ""
                
                instruktionRen.innerHTML = "";
                instruktionRen2.innerHTML = "";
                instruktionRen3.innerHTML = "";
                
                ctx.clearRect(0, 0, 1440, 896);
                ctx.drawImage(soapUp, 270, -100, 800, 600);
                
                tillbaka.style.left = 550;
                tillbaka.style.top = 680;
                
                poang.style.top = 50;
                poang.style.left = 644;
                poang.style.fontSize = 40;
                
            };

            function instructions(){
                
                menuClick.play();
                
                hideKids();
                
                startKnapp.innerHTML = "";
                instruktioner.innerHTML = "";
                tillbaka.innerHTML = "Till menyn";
                
                instruktionSmutsig.innerHTML = "Klicka på det smutsiga barnet för"
                instruktionSmutsig2.innerHTML = "att få poäng. Du vinner när du har"
                instruktionSmutsig3.innerHTML = "fått 20 poäng"
                
                instruktionRen.innerHTML = "Klickar du på de rena barnen";
                instruktionRen2.innerHTML = "så förlorar du tid. När tiden";
                instruktionRen3.innerHTML = "är slut så har du förlorat";
                
                //Återställer tillbaka taggens position
                tillbaka.style.left = 540;
                tillbaka.style.top = 730;
                
                ctx.drawImage(pinboard, 200, 10, 1000, 700);
                ctx.drawImage(smutsig, 270, 90, 300, 300);
                ctx.drawImage(ren, 270, 320, 300, 300);
                
            };

/*function duschInitiate(event){
    
    ctxDusch.drawImage();
    ctxDusch.drawImage();
    
    var coordinatesX = event.clientX;
    var coordinatesY = event.clientY;
    
    var time = getMilliseconds();
    
    var positionMouse =;
    var newPositionMouse =;
    
    window.setInterval(function(){
        
        
        
    }, 20);
    
};*/