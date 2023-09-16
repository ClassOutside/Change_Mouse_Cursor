import * as THREE from 'three';

export const setBackground = ( scene ) => {
   const backgroundColor = new THREE.Color(0x90e3fc);
   scene.background = backgroundColor;
} 