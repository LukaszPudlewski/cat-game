
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1200
canvas.height = 600

const gravity = 0.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 300
        }

        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 174.5
        this.height = 150

        this.image = catR
        this.frames = 0
        this.sprites = {
            stand: {
                right: catR,
                left: catL
            },
            run: {
                right: catR,
                left: catL
            }

        }
        this.currentSprite = this.sprites.stand.right
        
    }


    draw() {
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (keys.right.pressed || keys.left.pressed) {
        c.drawImage(
            this.currentSprite, 
            0,
            174.5 * this.frames,
            178.5,
            174.25,
            this.position.x, 
            this.position.y + 5, 
            this.width, 
            this.height)
        } else {
            c.drawImage(
                this.currentSprite, 
                0,
                0,
                178.5,
                174.25,
                this.position.x, 
                this.position.y + 5, 
                this.width, 
                this.height)
        }
    }

    update() {      
        this.position.x += this.velocity.x;
        this.frames++
        if (this.frames > 3) {
            this.frames = 0
        }
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

class Deco {
    constructor({x, y, cloud}) {
        this.position = {
            x: x,
            y: y
        }
        this.image = cloud
        this.width = cloud.width
        this.height = cloud.height
        
    }

    draw() {
        //c.fillStyle = 'blue'
        //c.fillRect(this.position.x , this.position.y , this.width , this.height)
        c.drawImage(this.image, this.position.x, this.position.y, 400, 200)
    } 
}

class Gold {
    constructor({x,y,goldImage}) {
        this.position = {
            x: x,
            y: y
        }
        this.image = goldImage
        this.width = 128.5
        this.height = 98
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 128.5, 98)
    }

    hide() {
        this.position.y = 1000
    }
}

class Lava {
    constructor({x,y,lavaImage}) {
        this.position = {
            x: x,
            y: y
        }
        this.image = lavaImage
        this.width = 337
        this.height = 104
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 337, 104)
    }
}

let score = 0


const image = new Image()
image.src = 'platformSmallTall.png'

const cloud = new Image(400, 200)
cloud.src = '378-3787960_1000-x-1000-28-0-cloud-sprite-png-removebg-preview.png'

const catR = new Image()
catR.src = 'catR.png'

const catL = new Image()
catL.src = 'catL.png'

const goldImage = new Image()
goldImage.src = 'gold.png'

const lavaImage = new Image()
lavaImage.src = 'lava.png'

const player = new Player()

const platforms = [new Platform({x:200, y:300, image}), 
new Platform({x:400, y:500, image}), new Platform({x:-1, y:550, image}),
new Platform({x:600, y:180, image}), new Platform({x:1200, y:500, image}),
new Platform({x:1500, y:100, image}), new Platform({x:1900, y:400, image}),
new Platform({x:2100, y:550, image}), new Platform({x:2500, y:280, image}),
new Platform({x:2900, y:350, image}), new Platform({x:3600, y:550, image})]

const deco = [new Deco({x: 600, y: 30, cloud}), new Deco({x: 2000, y: 30, cloud})]

const gold = [new Gold({x: 100, y: 100, goldImage}), new Gold({x: 400, y: 200, goldImage}),
    new Gold({x: 1000, y: 300, goldImage}), new Gold({x: 1200, y: 100, goldImage}),
    new Gold({x: 1500, y: 200, goldImage}), new Gold({x: 1900, y: 90, goldImage}),
    new Gold({x: -300, y: 100, goldImage}), new Gold({x: 350, y: 350, goldImage})]

const lava = [new Lava({x:0, y: 530, lavaImage}), new Lava({x:-337, y: 530, lavaImage}),
    new Lava({x:337, y: 530, lavaImage}), new Lava({x:674, y: 530, lavaImage}),
    new Lava({x:1011, y: 530, lavaImage}), new Lava({x:1348, y: 530, lavaImage}),
    new Lava({x:1685, y: 530, lavaImage}), new Lava({x:2022, y: 530, lavaImage}),
    new Lava({x:2359, y: 530, lavaImage}), new Lava({x:2696, y: 530, lavaImage}),
    new Lava({x:3033, y: 530, lavaImage}), new Lava({x:3370, y: 530, lavaImage}),
    new Lava({x:3707, y: 530, lavaImage}), new Lava({x:4044, y: 530, lavaImage}),
    new Lava({x:-674, y: 530, lavaImage}),]
    
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
    
    
    deco.forEach(deco => {
        deco.draw()
    })
    platforms.forEach((platform) => {
        platform.draw()        
    })
    lava.forEach(lava => {
        lava.draw()
    })
    gold.forEach(gold => {
        gold.draw()
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
            deco.forEach((deco) => {
                deco.position.x -= 4
            })
            gold.forEach((gold) => {
                gold.position.x -= 5
            })
            lava.forEach((lava) => {
                lava.position.x -= 5
            })
            
        } else if (keys.left.pressed) {
            platforms.forEach((platform) => {
                platform.position.x += 5
                scrollOffset -=5
            })
            deco.forEach((deco) => {
                deco.position.x += 4
            })
            gold.forEach((gold) => {
                gold.position.x += 5
            })
            lava.forEach((lava) => {
                lava.position.x += 5
            })
        }

        if (scrollOffset > 35500) {
            document.getElementById("alert").style.display = "block"
            document.getElementById("can1").style.display = "none"
        }

        if (player.position.y > canvas.height && scrollOffset < 35500) {
            document.getElementById("alertL").style.display = "block"
            document.getElementById("can1").style.display = "none"
        }
    }
    platforms.forEach((platform) => {
    if (player.position.y <= platform.position.y + platform.height &&
        player.position.x + player.width - 50 >= platform.position.x &&
        player.position.x + 50 < platform.position.x + platform.width &&
        player.position.y >= platform.position.y) {
        player.velocity.y = 10
    }
})
    platforms.forEach((platform) => {
    if (player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width - 50 >= platform.position.x &&
        player.position.x + 50 < platform.position.x + platform.width) {
        player.velocity.y = 0
    } 
})
    gold.forEach((gold) => {
        if (player.position.y + player.height >= gold.position.y &&
            player.position.x + player.width  - 60 >= gold.position.x &&
            player.position.x + 60 <= gold.position.x + gold.width &&
            player.position.y  + 20 <= gold.position.y + gold.height
             ) {                 
                 gold.hide()
                 score++
                 document.getElementById("score").textContent = "Score: " + score                                   
             }
    })
}

animate();

addEventListener('keydown', ({keyCode}) => {
    

    switch(keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            break

        case 40:
            console.log('down')
            break

        case 39:
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            break

        case 38:
            console.log('up')
            if (player.position.y - 40 > canvas.height) {
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