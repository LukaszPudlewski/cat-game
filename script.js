
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1200
canvas.height = 600

const gravity = 0.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 500
        }

        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {      
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;        
        this.draw();
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity;
        
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }
        this.image = image
        this.width = image.width
        this.height = 20
        
    }

    draw() {
        //c.fillStyle = 'blue'
        //c.fillRect(this.position.x , this.position.y , this.width , this.height)
        c.drawImage(this.image, this.position.x, this.position.y)
    } 
}



const image = new Image()
image.src = 'platformSmallTall.png'

const player = new Player()
const platforms = [new Platform({x:200, y:300, image}), 
new Platform({x:400, y:500, image}), new Platform({x:-1, y:580, image}),
new Platform({x:600, y:180, image}), new Platform({x:1200, y:500, image}),
new Platform({x:1500, y:100, image}), new Platform({x:1900, y:400, image}),
new Platform({x:2100, y:580, image}), new Platform({x:2500, y:280, image}),
new Platform({x:2900, y:350, image}), new Platform({x:3600, y:550, image})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
let scrollOffset = 0


const animate = () => {
    requestAnimationFrame(animate)
    c.fillStyle = 'salmon' 
    c.fillRect(0, 0, canvas.width, canvas.height)
        platforms.forEach((platform) => {
        platform.draw()        
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            platforms.forEach((platform) => {
                platform.position.x -= 5
                scrollOffset +=5
                console.log(scrollOffset)
            })
            
        } else if (keys.left.pressed) {
            platforms.forEach((platform) => {
                platform.position.x += 5
                scrollOffset -=5
                
            })
            
        }

        if (scrollOffset > 36000) {
            document.getElementById("alert").style.display = "block"
            document.getElementById("can1").style.display = "none"
        }

        if (player.position.y > canvas.height && scrollOffset < 36000) {
            document.getElementById("alertL").style.display = "block"
            document.getElementById("can1").style.display = "none"
        }
    }
    platforms.forEach((platform) => {
    if (player.position.y <= platform.position.y + platform.height &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x < platform.position.x + platform.width &&
        player.position.y >= platform.position.y) {
        player.velocity.y = 10
    }
})
    platforms.forEach((platform) => {
    if (player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x &&
        player.position.x < platform.position.x + platform.width) {
        player.velocity.y = 0
    } 
})
}

animate();

addEventListener('keydown', ({keyCode}) => {
    

    switch(keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = true
            break

        case 40:
            console.log('down')
            break

        case 39:
            console.log('right')
            keys.right.pressed = true
            break

        case 38:
            console.log('up')
            if (player.position.y + player.height >= canvas.height) {
                    player.velocity.y -= 20
                }
                platforms.forEach((platform) => {
            if (player.position.y + player.height <= platform.position.y &&
                player.position.y + player.height + gravity >= platform.position.y
                && player.position.x + player.width >= platform.position.x &&
                player.position.x < platform.position.x + platform.width) {
                        player.velocity.y -= 20
                    }
                })
            break


    }
})

addEventListener('keyup', ({keyCode}) => {


    switch(keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = false
            break

        case 40:
            console.log('down')
            break

        case 39:
            console.log('right')
            keys.right.pressed = false
            break

        case 38:
            console.log('up')
            break


    }
})