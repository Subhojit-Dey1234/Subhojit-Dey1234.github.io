console.log("Three JS");
const image = document.querySelector("img");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.z = 5;

const loader = new THREE.ImageLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const plane = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
const imageTexture = new THREE.TextureLoader().load(image.src);
const uniforms = {
	uTexture: {
		value: imageTexture,
	},
	uOffset: {
		value: new THREE.Vector2(0.0, 0.0),
	},
	uAlpha: {
		value: 1,
	},
};

// const material = new THREE.ShaderMaterial({
// 	uniforms: uniforms,
// 	transparent: true,
// 	side: THREE.DoubleSide,
// });

const textureLoader = new THREE.TextureLoader().load(image.src)
// const material = new THREE.MeshStandardMaterial({
// 	map : textureLoader
// })

const material = new THREE.TextureLoader();

// load a resource
material.load(
	// resource URL
	image.src,

	// onLoad callback
	function ( texture ) {
		console.log(texture)
		// in this example we create the material when the texture is loaded
		const material = new THREE.MeshBasicMaterial( {
			map: texture
		 } );


		return material
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.error( 'An error happened.', err );
	}
);

const mesh = new THREE.Mesh(plane, material);
mesh.position.set(new THREE.Vector2(0, 0).x, new THREE.Vector2(0, 0).y, 0);
mesh.scale.set(new THREE.Vector2(0, 0).x, new THREE.Vector2(0, 0).y, 1);
scene.add(mesh);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
