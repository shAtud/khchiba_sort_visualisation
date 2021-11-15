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
        this.theta_droite_rejlin = -45
        this.theta_gauche_rejlin = 45
        this.toulAfous = this.b_delta_y
        this.toulRejlin = 1.5*this.b_delta_y
    }
    set_b_delta_y(b_delta_y){
        this.b_delta_y = b_delta_y
        this.r = 0.5*this.b_delta_y;
        this.toulAfous = this.b_delta_y
        this.toulRejlin = 1.5*this.b_delta_y
    }

    draw(){
        this.x+=1;
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
        //khchiba main gauche
        ctx.beginPath()
            ctx.moveTo(x,(y+b_delta_y))
            ctx.lineTo(x - toulRejlin*Math.cos(theta_gauche_rejlin),(y+b_delta_y) - toulRejlin*Math.sin(-theta_gauche_rejlin))
            ctx.strokeStyle = 'black'
            ctx.stroke()
        ctx.closePath()
        
    }
}

const khchiba = new Charactere(width/2,height/2,20);
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);
    khchiba.draw();
    
}
animate();