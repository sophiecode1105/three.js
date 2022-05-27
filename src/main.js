import * as THREE from 'three';
import { Scene } from 'three';

//동적으로 캔버스 조립하기
// const renderer = new THREE.WebGL1Renderer();
// //브라우저창사이즈로 사이즈를 지정해준다.
// renderer.setSize(window.innerWidth, window.innerHeight);
// //렌더러가 생성이된다면 렌더러가 가진 dom엘리먼트가있다. 렌더러가 가진 캔버스다.
// console.log(renderer.domElement);
// document.body.appendChild(renderer.domElement);

const canvas = document.getElementById('#three-canvas');
const renderer = new THREE.WebGL1Renderer({ canvas }); //canvas라는 값을 canvas로 가져오는것
renderer.setSize(window.innerWidth, window.innerHeight);

//Scene

const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
  75, //시야각 field of view
  window.innerWidth / window.innerHeight, //aspec
  0.1, // near
  1000 //far
);
scene.add(carmera);
