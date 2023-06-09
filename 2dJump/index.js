import platform from './img/platform.png'




const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');



// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = 800;

const gravity = 0.5;
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.width = 30;
        this.height = 30;

    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // gravity - player stops at bottom of screen
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }


    }

}

class Platform {
    constructor({x,y}) {
        this.position = {
            x,
            y
        };
        this.width = 200;
        this.height = 20;
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}





const player = new Player();

const platforms = [new Platform({x:200, y:100}), new Platform({x:500, y:200})];
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    }
};

// measure how far left player has traveled to the left
let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();


    platforms.forEach(platform => {
        platform.draw();
    });



    // Player Movement Conditions 
    // once player gets to middle of screen then start moving world to the left or right if player goes to left of screen
    // this will give the appearance that the player is moving through the world 
    if (keys.right.pressed &&
        player.position.x < canvas.width / 2) {
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 10) { //if player is 10 units from the left stop player and move world right
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0; //
        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5;
            });
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5;
            });
        }
    }

    //  platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        }
    });

    if(scrollOffset > 2000){
        console.log("You Win")
    }
}

animate();

// Player Movement Keypress Listener
window.addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode);

    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true;
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = true;
            break;
        case 87:
            console.log('up');
            player.velocity.y -= 5;
            break;
    }
});

window.addEventListener('keyup', ({ keyCode }) => {
    // console.log(keyCode);

    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = false;
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = false;
            break;
        case 87:
            console.log('up');
            player.velocity.y -= 5;
            break;
    }
});