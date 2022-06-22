const canvas= document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(c)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Boudary{
    static width = 40
    static height = 40
    constructor({position}){//here we {}use because we dont need to memories the order of arrg
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw(){
        c.fillStyle ='blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

    }
}

class Player{
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x,this.position.y, this.radius, 0, 2 * Math.PI)

        c.fillStyle='yellow'
        c.fill()
        c.closePath()
    }
    update(){
     this.draw()
     this.position.x +=this.velocity.x
     this.position.y +=this.velocity.y   

    }
}
// this.position.x , this.position.y

const boundaries = []
const player = new Player({
    position : {
        x:Boudary.width+Boudary.width/2,
        y:Boudary.height+Boudary.height/2
    },
    velocity:{
        x:0,
        y:0
    }
})
const keys ={
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
     d:{
        pressed:false
    }
}
const map =[//this represent map of the game
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-']

]

map.forEach((row,i) => {
    row.forEach((Symbol,j)=>{
        console.log(Symbol)
        switch(Symbol){
            case '-':
                boundaries.push(
                    new Boudary({
                        position:{
                        x:Boudary.width*j,
                        y:Boudary.height*i
                    }
                })
                )
                break
        }
    })
})

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    boundaries.forEach((boundary)=>{
    boundary.draw()
    })
    player.update()

    player.velocity.y = 0

    if(keys.w.pressed){
        player.velocity.y = -5
    }
    else if(keys.a.pressed){
        player.velocity.x = -5
    }
    else if(keys.s.pressed){
        player.velocity.y = 5
    }
    else if(keys.d.pressed){
        player.velocity.x = 5
    }
}
animate()


addEventListener('keydown', ({ key }) => {
    switch(key){
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break   
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        
    }
    
})
addEventListener('keyup', ({ key }) => {
    switch(key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break   
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        
    }
    
})