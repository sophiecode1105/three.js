import * as THREE from 'three';
import gsap from 'gsap';

const example = () => {
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGL1Renderer({ canvas, antialias: true }); //canvas라는 값을 canvas로 가져오는것, antialias 성능저하 떨어지고 부드럽게해줌
  renderer.setSize(window.innerWidth, window.innerHeight); //브라우저 창크기로 맞춘것
  console.log('pixelratio', window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //고밀도 이미지로 보이게해준다.
  // renderer.setClearAlpha(0.5); //투명 반투명

  //Scene

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('pink', 3, 7); //안개의 범위
  //씬에 빽그라운드를 줘보자.
  // scene.background = new THREE.Color('blue');

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, //시야각 field of view
    window.innerWidth / window.innerHeight, //aspec 종횡비
    0.1, // near
    1000 //far
  );
  //카메라와 object가 같은위치면 보이지않으니 뒤로 약간 빼주는 작업을 해야한다.

  camera.position.y = 2;
  camera.position.z = 5; //5정도 거리로 뒤로 빼주는것 + 방향으로
  scene.add(camera);

  //Orthgraphic Camera(직교 카메라)
  // const camera = new THREE.OrthographicCamera(
  //   -(window.innerWidth / window.innerHeight), //left
  //   window.innerWidth / window.innerHeight, //right
  //   1, //top
  //   -1, //bottom
  //   0.1, //near
  //   1000 //far
  // );
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;
  // camera.lookAt(0, 0, 0); //원점을 바라보게
  // camera.zoom = 0.5; //각도 바꾸려면 z건드는것이 아니고 zoom
  // camera.updateProjectionMatrix();
  // scene.add(camera);

  //mesh

  const light = new THREE.DirectionalLight(0xffffff, 1); //빛의 강도조절
  light.position.x = 1;
  light.position.z = 3;
  light.position.z = 10;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1); //직육면체  geometry 박스를 하나만든다
  const material = new THREE.MeshStandardMaterial({
    // color: oxff0000
    // color: '#ff0000'
    color: 'red',
  });

  let oldTime = Date.now();
  const clock = new THREE.Clock();
  const draw = () => {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;
    //각도는 radian을 사용한다.
    //360도는 2파이
    //mesh.rotation.y += 0.1;
    // mesh.rotation.y += 0.1;

    //얘는 1도씩 돌리는거

    // const time = clock.getElapsedTime();
    // const delta = clock.getDelta();

    renderer.render(scene, camera);

    window.requestAnimationFrame(draw);
    //renderer.setAnimationLoop(draw) => vr/ar 할때 써야한다.
  };

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh); //씬에 올려주기

  //그리기
  //렌더러가 렌더를 해줘야지 우리눈에보인다.

  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
    z: 3,
  });

  const setSize = () => {
    //CAMERA
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    console.log('size check');
  };

  //이벤트
  window.addEventListener('resize', setSize);
  draw();
};

export default example;
