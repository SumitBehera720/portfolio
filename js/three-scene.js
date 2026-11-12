// Interactive 3D WebGL Canvas for Hero 3D Stage (Three.js)
(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') {
    console.warn('Three.js or target canvas not found.');
    return;
  }

  let scene, camera, renderer;
  let particles, particleGeo, particleMat;
  let coreGroup, torusKnot, outerIcosa, orbitRing1, orbitRing2;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let currentMode = 'iridescent';
  let clock = new THREE.Clock();

  function getContainerSize() {
    const parent = canvas.parentElement;
    return {
      width: parent ? parent.clientWidth : 380,
      height: parent ? parent.clientHeight : 290
    };
  }

  function init() {
    const { width, height } = getContainerSize();

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera centered on the stage
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    // 3. Renderer with transparent background
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x6366f1, 1.6);
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0ea5e9, 1.3);
    dirLight2.position.set(-15, -10, 10);
    scene.add(dirLight2);

    // 5. Build 3D Objects
    createParticleField();
    createCoreMesh();

    // 6. Listeners
    window.addEventListener('resize', onWindowResize, false);
    
    // Mouse tracking on stage parent or window
    const stage = canvas.parentElement;
    if (stage) {
      stage.addEventListener('mousemove', onStageMouseMove, false);
      stage.addEventListener('mouseleave', () => {
        mouse.targetX = 0;
        mouse.targetY = 0;
      });
    }

    setupModeButtons();

    // 7. Loop
    animate();
  }

  function createParticleField() {
    const count = 900;
    particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cIndigo = new THREE.Color(0x4f46e5);
    const cSky = new THREE.Color(0x0284c7);
    const cViolet = new THREE.Color(0x7c3aed);

    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.9;

      positions[i * 3] = r * Math.cos(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);

      let pColor = Math.random() < 0.5 ? cIndigo : (Math.random() < 0.8 ? cSky : cViolet);
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });

    particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
  }

  function createCoreMesh() {
    coreGroup = new THREE.Group();

    // 1. Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(4.2, 1.2, 100, 20, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x6366f1,
      emissiveIntensity: 0.2,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true
    });
    torusKnot = new THREE.Mesh(knotGeo, knotMat);
    coreGroup.add(torusKnot);

    // 2. Outer Icosahedron
    const icosaGeo = new THREE.IcosahedronGeometry(7.5, 1);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    outerIcosa = new THREE.Mesh(icosaGeo, icosaMat);
    coreGroup.add(outerIcosa);

    // 3. Orbit Rings
    const ringGeo1 = new THREE.RingGeometry(8.5, 8.65, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    coreGroup.add(orbitRing1);

    const ringGeo2 = new THREE.RingGeometry(9.8, 9.95, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = -Math.PI / 4;
    coreGroup.add(orbitRing2);

    scene.add(coreGroup);
  }

  function setupModeButtons() {
    const btns = document.querySelectorAll('.scene-mode-btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        switchMode(mode);
      });
    });
  }

  function switchMode(mode) {
    currentMode = mode;
    if (mode === 'iridescent' || mode === 'cyber') {
      coreGroup.visible = true;
      torusKnot.material.wireframe = true;
      outerIcosa.visible = true;
      particles.visible = true;
      particleMat.size = 0.16;
    } else if (mode === 'galaxy') {
      coreGroup.visible = false;
      particles.visible = true;
      particleMat.size = 0.28;
    } else if (mode === 'solid') {
      coreGroup.visible = true;
      torusKnot.material.wireframe = false;
      outerIcosa.visible = true;
      particles.visible = true;
      particleMat.size = 0.14;
    }
  }

  function onStageMouseMove(e) {
    const rect = canvas.parentElement.getBoundingClientRect();
    mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function onWindowResize() {
    const { width, height } = getContainerSize();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    if (coreGroup && coreGroup.visible) {
      torusKnot.rotation.x = elapsedTime * 0.35 + mouse.y * 0.6;
      torusKnot.rotation.y = elapsedTime * 0.5 + mouse.x * 0.6;

      outerIcosa.rotation.x = -elapsedTime * 0.15;
      outerIcosa.rotation.y = elapsedTime * 0.2;

      orbitRing1.rotation.z = elapsedTime * 0.4;
      orbitRing2.rotation.z = -elapsedTime * 0.3;

      coreGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.6;
    }

    if (particles) {
      particles.rotation.y = elapsedTime * 0.04 + mouse.x * 0.15;
      particles.rotation.x = mouse.y * 0.1;
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ThreeSceneController = {
    setMode: switchMode
  };
})();
