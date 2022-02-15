const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = //innerWidth;
800
canvas.height = //innerHeight;
600

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
        else this.velocity.y = 0
    }
}

class Platform {
    constructor() {
        this.position = {
            x: 200,
            y: 300
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x , this.position.y , this.width , this.height)
    } 
}

const player = new Player()
const platform = new Platform()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
    }

    if (player.position.y <= platform.position.y + platform.height &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x < platform.position.x + platform.width &&
        player.position.y >= platform.position.y) {
        player.velocity.y = 10
    }

    if (player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x &&
        player.position.x < platform.position.x + platform.width) {
        player.velocity.y = 0
    } 

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

            if (player.position.y + player.height <= platform.position.y &&
                player.position.y + player.height + gravity >= platform.position.y
                && player.position.x + player.width >= platform.position.x &&
                player.position.x < platform.position.x + platform.width) {
                        player.velocity.y -= 20
                    }
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