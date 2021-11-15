const canvas = document.getElementById('cn');
ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500;
const {width , height} = canvas; 
class Charactere{
    constructor(x,y,b_delta_y){
        this.x = x
        this.y = y
        this.b_delta_y = b_delta_y
        this.r = 0.5*this.b_delta_y;
        this.theta_droite_afous = -45
        this.theta_gauche_afous = 45
        this.theta_droite_rejlin = -20
        this.theta_gauche_rejlin = 20
        this.toulAfous = this.b_delta_y
        this.toulRejlin = 1.5*this.b_delta_y

         // (x,(y+b_delta_y) - toulRejlin*Math.sin(-theta_gauche_rejlin))
         const last_part = Math.sqrt(
                Math.pow(this.x-this.x,2)
                +Math.pow( (this.y+this.b_delta_y)-this.toulRejlin*Math.sin(-this.theta_gauche_rejlin)-(this.y +this.b_delta_y) ,2)
                );
        this.khchiba_height = 2*this.r + this.b_delta_y*2 +last_part;
    }
    set_b_delta_y(b_delta_y){
        this.b_delta_y = b_delta_y
        this.r = 0.5*this.b_delta_y;
        this.toulAfous = this.b_delta_y
        this.toulRejlin = 1.5*this.b_delta_y

         // (x,(y+b_delta_y) - toulRejlin*Math.sin(-theta_gauche_rejlin))
         const last_part = Math.sqrt(
            Math.pow(this.x-this.x,2)
            +Math.pow( (this.y+this.b_delta_y)-this.toulRejlin*Math.sin(-this.theta_gauche_rejlin)-(this.y +this.b_delta_y) ,2)
            );
    this.khchiba_height = 2*this.r + this.b_delta_y*2 +last_part;
    }

    draw(){
      
        const {x,y,b_delta_y,r,theta_droite_afous , theta_gauche_afous,theta_droite_rejlin,theta_gauche_rejlin,toulRejlin,toulAfous} = this;
        //5chiba corp
        ctx.beginPath()
            ctx.moveTo(x,y-b_delta_y)
            ctx.lineTo(x,y+b_delta_y)
            ctx.strokeStyle = 'black'
            ctx.stroke()
        ctx.closePath()
        //khchibq head
        ctx.beginPath()
            ctx.arc(x,y-b_delta_y-r,r,0,2*Math.PI)
            ctx.strokeStyle = 'black'
            ctx.stroke()
        ctx.closePath()
        //khchiba main droite
        ctx.beginPath()
            ctx.moveTo(x,(2*y-b_delta_y)/2)
            ctx.lineTo(x + toulAfous*Math.cos(theta_droite_afous),(2*y-b_delta_y)/2 - toulAfous*Math.sin(theta_droite_afous))
            ctx.strokeStyle = 'black'
            ctx.stroke()
        ctx.closePath()
        //khchiba main gauche
        ctx.beginPath()
            ctx.moveTo(x,(2*y-b_delta_y)/2)
            ctx.lineTo(x - toulAfous*Math.cos(theta_gauche_afous),(2*y-b_delta_y)/2 - toulAfous*Math.sin(-theta_gauche_afous))
            ctx.strokeStyle = 'black'
            ctx.stroke()
        ctx.closePath()
        //khchiba pied droite
        ctx.beginPath()
            ctx.moveTo(x,(y+b_delta_y))
            ctx.lineTo(x + toulRejlin*Math.cos(theta_droite_rejlin),(y+b_delta_y) - toulRejlin*Math.sin(theta_droite_rejlin))
            ctx.strokeStyle = 'black'
            ctx.stroke()
        ctx.closePath()
        //khchiba pied gauche
        ctx.beginPath()
            ctx.moveTo(x,(y+b_delta_y))
            ctx.lineTo(x - toulRejlin*Math.cos(theta_gauche_rejlin),(y+b_delta_y) - toulRejlin*Math.sin(-theta_gauche_rejlin))
            ctx.strokeStyle = 'black'
            ctx.stroke()
        ctx.closePath()
       
        
    }
}

const khchiba = new Charactere(width/2,height/2,20);

let characters = [];
const N = 30;
for(let i = 0 ;i<N ;i++){
    characters.push(new Charactere((320+width*(i))/N,height-75,Math.random()*15+5))
}
characters = characters.sort((a,b)=>{return a.b_delta_y-b.b_delta_y})
 characters.forEach((el,index)=>{
    el.x = (320+width*(index))/N;
    el.y = height - el.khchiba_height/2;
})
function animate(){
     requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);
   
    for(let i = 0 ;i<N ;i++){
        characters[i].draw();
    }
    
}
animate();