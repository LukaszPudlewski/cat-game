const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y:100
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

const player = new Player();
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
    player.update();

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
    }
}

animate();

addEventListener('keydown', ({keyCode}) => {
    //console.log(keyCode);

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
            player.velocity.y -= 10
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