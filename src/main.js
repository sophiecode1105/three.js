import * as THREE from 'three';

//동적으로 캔버스 조립하기
// const renderer = new THREE.WebGL1Renderer();
// //브라우저창사이즈로 사이즈를 지정해준다.
// renderer.setSize(window.innerWidth, window.innerHeight);
// //렌더러가 생성이된다면 렌더러가 가진 dom엘리먼트가있다. 렌더러가 가진 캔버스다.
// console.log(renderer.domElement);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGL1Renderer({ canvas, antialias: true }); //canvas라는 값을 canvas로 가져오는것
renderer.setSize(window.innerWidth, window.innerHeight);

//Scene

const scene = new THREE.Scene();

//Camera
// const camera = new THREE.PerspectiveCamera(
//   75, //시야각 field of view
//   window.innerWidth / window.innerHeight, //aspec
//   0.1, // near
//   1000 //far
// );
// //카메라와 object가 같은위치면 보이지않으니 뒤로 약간 빼주는 작업을 해야한다.
// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5; //5정도 거리로 뒤로 빼주는것 + 방향으로
// scene.add(camera);

//Orthgraphic Camera(직교 카메라)
const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight), //left
  window.innerWidth / window.innerHeight, //right
  1, //top
  -1, //bottom
  0.1, //near
  1000 //far
);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(0, 0, 0); //원점을 바라보게
camera.zoom = 0.5;
camera.updateProjectionMatrix();
scene.add(camera);

//mesh

const geometry = new THREE.BoxGeometry(1, 1, 1); //직육면체geometry 박스를 하나만든다
const material = new THREE.MeshBasicMaterial({
  // color: oxff0000
  // color: '#ff0000'
  color: 'red',
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); //씬에 올려주기

//그리기
//렌더러가 렌더를 해줘야지 우리눈에보인다.

renderer.render(scene, camera);
