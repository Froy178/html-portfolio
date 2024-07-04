 
 //game mood body
 const gameBodyElem = document.getElementById("game-mood-body")
 const homeBodyElem = document.getElementById("home-body")
 

 // all for buttons
 const turnerButtonElem = document.querySelector(".js-turn-off-animation")
 const homeButtonElem = document.querySelector(".js-home-button")

 // all for canvas
 let canvas = document.getElementById("canvas1")
 let ctx = canvas.getContext("2d");

 let particleArray = [];
 let hue = 0;

 canvas.width= window.innerWidth;
 canvas.height = window.innerHeight;

 const mouse = {
   x : undefined,
   y : undefined
 }

 window.addEventListener("resize",function(){
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

 });

 

 

 

 const mouseMove = function(event){
     mouse.x = event.x;
     mouse.y = event.y;
     
     for(let i = 0;i<5;i++)
     {
       particleArray.push(new Particle())
     }  }

 //1
 canvas.addEventListener("mousemove",()=>{mouseMove(event)} )

 turnerButtonElem.addEventListener("click",()=>{
   if(turnerButtonElem.innerText === "OFF")
   {
     turnerButtonElem.innerText = "ON"

     canvas.style = "z-index:0;" ;
     gameBodyElem.style = "z-index : 1";
     
   }
   else if(turnerButtonElem.innerText === "ON")
   {
     turnerButtonElem.innerText = "OFF";

     canvas.style = "z-index:1;" ;
     gameBodyElem.style = "z-index : 0";
     
   }
  });

homeButtonElem.addEventListener("click",()=>{
  if(homeButtonElem.innerText === "Home")
   {
     homeButtonElem.innerText = "ON"

     canvas.style = "z-index:0;" ;
     homeBodyElem.style = "z-index : 1";
     
   }
   else if(homeButtonElem.innerText === "ON")
   {
     homeButtonElem.innerText = "Home";

     canvas.style = "z-index:1;" ;
     homeBodyElem.style = "z-index : 0";
   }
});


 class Particle 
 {
   constructor()
   {
     this.x = mouse.x;
     this.y = mouse.y;

     this.size = Math.random() * 10+1;
     this.speedX = Math.random() * 3-1.5;
     this.speedY = Math.random() * 3 - 1.5;

     this.color = "hsl("+hue+",100%,50%)";
   }

   update()
   {
     if(this.size >0.2) this.size -=0.1;
     
     this.x += this.speedX;
     this.y += this.speedY;
   }

   draw()
   {
     ctx.beginPath();
     ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
     ctx.fillStyle = this.color;
     ctx.fill();
   }
 }

 function handleParticle()
 {
   for(let i = 0;i<particleArray.length;i++)
   {
     particleArray[i].update();
     particleArray[i].draw();

     for(let j = i; j<particleArray.length;j++)
     {
       const dx = particleArray[i].x - particleArray[j].x;
       const dy = particleArray[i].y - particleArray[j].y;
       const distance = Math.sqrt(dx*dx + dy*dy);
       
       if(distance<100)
       {
         ctx.beginPath();
         ctx.strokeStyle = particleArray[i].color;
         ctx.lineWidth = 0.5;
         ctx.moveTo(particleArray[i].x, particleArray[i].y);
         ctx.lineTo(particleArray[j].x, particleArray[j].y);

         ctx.stroke()
         ctx.closePath();

       }

     }

     if(particleArray[i].size <=0.3)
     {
       particleArray.splice(i,1);
       
       i--;
     }

   }
 }



 function animate()
 {
     ctx.clearRect(0,0,canvas.width,canvas.height);
     hue += 5;
     

     handleParticle();
     requestAnimationFrame(animate);
 };
 

 animate();
