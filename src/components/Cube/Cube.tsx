import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useStore } from '../../store/store';
import { observer } from 'mobx-react';
import SingleDay from '../SingleDay/SingleDay';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createRoot } from 'react-dom/client';
import domtoimage from 'dom-to-image';

import getDayOfWeek from '../../utils/dateUtils';
import getRandomColor from '../../utils/getRandomColor';

import './Cube.css'
import ReactDOM from 'react-dom';

function Cube() {
  const cubeRef = useRef<THREE.Mesh>();
  const store = useStore();
  const mountRef = useRef(null);
  let mouseDown = false;
  let lastMouseX: number = 0;
  let lastMouseY: number = 0;
  const cubeRotation = useMemo(() => new THREE.Euler(0, 0, 0, 'XYZ'), []);

  const handleMouseDown = useCallback((event: { clientX: number; clientY: number; }) => {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseDown = false;
  }, []);

  const handleMouseMove = useCallback((event: { clientX: number; clientY: number; }) => {
    if (!mouseDown || !cubeRef.current) {
      return;
    }
    const newMouseX = event.clientX;
    const newMouseY = event.clientY;

    const deltaX = newMouseX - lastMouseX;
    const deltaY = newMouseY - lastMouseY;

    cubeRotation.y += deltaX * 0.01;
    cubeRotation.x += deltaY * 0.01;

    cubeRef.current.rotation.copy(cubeRotation);

    lastMouseX = newMouseX;
    lastMouseY = newMouseY;
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown, false);
    window.addEventListener('mouseup', handleMouseUp, false);
    window.addEventListener('mousemove', handleMouseMove, false);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown, false);
      window.removeEventListener('mouseup', handleMouseUp, false);
      window.removeEventListener('mousemove', handleMouseMove, false);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);

  async function getTextureFromComponent(component: React.ReactElement) {
    const node = document.createElement('div');
    document.body.appendChild(node);

    // const root = createRoot(node!); // its not works for safari
    // root.render(component);

    ReactDOM.render(<React.StrictMode>{component}</React.StrictMode>, node); // only old way is correctly works


    await new Promise(requestAnimationFrame);
    const dataUrl = await domtoimage.toPng(node, { width: 300, height: 300, style: { backgroundColor: getRandomColor() } });
    node.remove();

    return dataUrl;
  }

  useEffect(() => {
    store.fetchWeatherData();
  }, [store]);

  useEffect(() => {
    if (store.weatherData) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const materialPromises = store.weatherData.daily.map((day, index) => {
        return getTextureFromComponent(
          <SingleDay
            day={day}
            dayOfWeek={getDayOfWeek(day.dt)}
            name={store.weatherData ? store.weatherData.name : ''}
          />)
          .then(textureUrl => {
            const texture = new THREE.TextureLoader().load(textureUrl, function (texture) {
              texture.minFilter = THREE.LinearFilter;
              texture.magFilter = THREE.LinearFilter;
            });
            return new THREE.MeshBasicMaterial({ map: texture });
          });
      });

      if (mountRef.current) {
        const parentElement = (mountRef.current as HTMLElement).parentNode as HTMLElement;
        const width = parentElement.offsetWidth - 2;
        const height = parentElement.offsetHeight - 2;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        (mountRef.current as HTMLElement).appendChild(renderer.domElement);
      }

      Promise.all(materialPromises).then(materials => {
        const cube = new THREE.Mesh(geometry, materials);
        const controls = new OrbitControls(camera, renderer.domElement);
        const animate = function () {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };

        controls.enableZoom = true;
        cubeRef.current = cube;
        scene.add(cube);
        cubeRotation.y = 1;
        cubeRotation.x = 1;
        cubeRef.current.rotation.copy(cubeRotation);
        camera.position.z = 10;
        camera.position.x = 0;
        camera.position.y = 0;
        animate();
      });
    }
  }, [store, store.weatherData, cubeRotation]);

  return (
    <>
      {store.weatherData ? <div className="cube">
        <div ref={mountRef}></div>
      </div>
        :
        <p>Cube is loading...</p>}
    </>
  )
}

export default observer(Cube);