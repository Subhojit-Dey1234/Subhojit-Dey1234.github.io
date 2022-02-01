let camera, scene, renderer;
let mesh;

let size = 34 * 34;
const data = new Float32Array(3 * size);

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		1,
		1000,
	);
	camera.position.z = 400;

	scene = new THREE.Scene();

	for (let i = 0; i < size; i++) {
		const stride = i * 3;
		let r = Math.random() * 255;
		let r1 = Math.random() * 255;

		data[stride] = r; // red, and also X
		data[stride + 1] = r1; // green, and also Y
		data[stride + 2] = 0; // blue
	}

	let texture = new THREE.TextureLoader().load("3.jpg");
	let textureData = new THREE.DataTexture(
		data,
		50,
		50,
		THREE.RGBFormat,
		THREE.FloatType,
	);

    texture.needsUpdate = true

	const geometry = new THREE.PlaneGeometry(1920 / 2, 1080 / 2, 200);
	const material = new THREE.MeshBasicMaterial({ map: texture });

	const shaderMat = new THREE.ShaderMaterial({
		side: THREE.DoubleSide,
		uniforms: {
			time: {
				value: 0,
			},
			resolution: {
				value: new THREE.Vector2(),
			},
			uTexture: {
				value: new THREE.Texture("3.jpg"),
			},
			uDataTexture: {
				value: textureData,
			},
		},
		vertexShader: document.getElementById("vertex-shader").textContent,
		fragmentShader: document.getElementById("fragment").textContent,
	});

    shaderMat.magfilter = THREE.NearestFilter

	shaderMat.uniforms.uDataTexture.value = textureData;
	shaderMat.uniforms.uDataTexture.value.needsUpdate = true;

	mesh = new THREE.Mesh(geometry, shaderMat);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//

	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
