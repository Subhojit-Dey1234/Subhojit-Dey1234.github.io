const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
	x: null,
	y: null,
	radius: 200,
};

canvas.addEventListener("mousemove", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

const numberOfParticles = 1000;

ctx.fillStyle = "white";
ctx.font = "10px Verdana";
ctx.fillText("SD", 20, 20);
let imageData = ctx.getImageData(0, 0, 1000, 1000);

let particlesArray;

class Particles {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 4;
		this.baseX = this.x;
		this.baseY = this.y;
		this.density = Math.random() * 30 + 1;
		this.color = "white"
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}

	update() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		let forceDirectionX = dx / distance;
		let forceDirectionY = dy / distance;

		let maxDistance = mouse.radius;
		let force = (maxDistance - distance) / maxDistance;
		let forceX = force * forceDirectionX * this.density;
		let forceY = force * forceDirectionY * this.density;

		if (distance < mouse.radius) {
			this.x -= forceX;
			this.y -= forceY;
			this.color = "yellow"
		} else {
			this.color = "white"
			if (this.x != this.baseX) {
				let dx = this.x - this.baseX;
				this.x -= dx / 10;
			}
			if (this.y != this.baseY) {
				let dy = this.y - this.baseY;
				this.y -= dy / 10;
			}
		}
	}
}

function init() {
	particlesArray = [];
	for(let i = 0;i<numberOfParticles;i++){
	    let x = Math.random() * canvas.width
	    let y = Math.random() * canvas.height
	    particlesArray.push(new Particles(x,y))
	}

	// for (let y = 0; y < textCoordinates.height; y++) {
	// 	for (let x = 0; x < textCoordinates.width; x++) {
	// 		if (
	// 			textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
	// 		) {
	// 			let positionX = x;
	// 			let positionY = y;

	// 			particlesArray.push(new Particles(positionX * 25, positionY * 25));
	// 		}
	// 	}
	// }
}

init();

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let particle of particlesArray) {
		particle.draw();
		particle.update();
	}
    connect()
	requestAnimationFrame(animate);
}

animate();


function connect(){
    for(let a = 0 ; a < particlesArray.length ; a++){
        for(let b = a; b < particlesArray.length ; b ++ ){
            let dx = particlesArray[a].x - particlesArray[b].x
            let dy = particlesArray[a].y - particlesArray[b].y

            let distance = Math.sqrt(dx*dx + dy*dy)

            if(distance < 40){
                ctx.strokeStyle = "white"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particlesArray[a].x,particlesArray[a].y)
                ctx.lineTo(particlesArray[b].x,particlesArray[b].y)
                ctx.stroke()
            }
        }
    }
}

