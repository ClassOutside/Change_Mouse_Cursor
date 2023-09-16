import * as THREE from 'three';
import { LoadGLTFByPath } from '../helpers/ModelHelper.js'
import { setupRenderer } from '../helpers/RendererHelper.js'
import { getFirstCameraInScene, updateCameraAspect } from '../helpers/CameraHelper.js'
import { checkRayIntersections, getMouseVector2 } from '../helpers/RayCastHelper.js'
import { setBackground } from '../helpers/BackgroundHelper.js'

const scenePath = './src/models/scene.gltf'

export async function setupScene(canvas) {

	const scene = new THREE.Scene();
	const renderer = setupRenderer();
	let mousePointer = new THREE.Vector2();
	const raycaster = new THREE.Raycaster();
	let intersections = [];
	let camera;

	await LoadGLTFByPath(scene, scenePath)
		.then(() => {
			camera = getFirstCameraInScene(scene);
			updateCameraAspect(camera);
		})
		.catch((error) => {
			console.error('Error loading JSON scene:', error);
	});

	scene.add(camera);
	setBackground(scene);

	document.addEventListener('mousemove', onMouseMove, false);

	function onMouseMove(event) {
		mousePointer = getMouseVector2(event, window);

		intersections = checkRayIntersections(mousePointer, camera, raycaster, scene);
	}

	function animate() {
		requestAnimationFrame(animate);

		document.body.style.cursor = (intersections.length > 0) ? 'pointer' : 'default';

		renderer.render(scene, camera);
	}

	animate();
};
