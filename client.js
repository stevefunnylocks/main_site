//import * as THREE from '/build/three.module.js';

//import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import * as THREE from './build/three.module.js';
import { OrbitControls } from './controls/OrbitControls.js';
import Stats from './libs/stats.module.js';
// global variables
let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

// scene setup
scene = new THREE.Scene();

// camera setup
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

// renderer setup
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// orbit control setup
const controls = new OrbitControls(camera, renderer.domElement);

// earth geometry
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

// Materials 희상추가
//const earthMaterials = new THREE.MeshstandardMaterial({
  //  wireframe : true
//})


// earth material
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
    bumpScale: 0.3
});

// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// cloud Geometry
const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

// cloud metarial
const cloudMetarial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent: true,
});

// cloud mesh
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
scene.add(cloudMesh);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
    map : THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

// point light
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// point light helper
const Helper = new THREE.PointLightHelper(pointLight);
scene.add(Helper);

// handling resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

//희사 추가 (22.11.21)

        const Atmosphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1, 64, 64),
            new THREE.ShaderMaterial({
                vertexShader : MY_ATMOSPHERE_VERTEX_SHADER,
                fragmentShader : MY_ATMOSPHERE_FRAGMENT_SHADER,
                blending : THREE.AdditiveBlending,
                side : THREE.BackSide
            })
        )

        Atmosphere.scale.set(1.1,1.1,1.1);

        // #endregion

        // #region add pin Mesh.

        // 1. fox_news Mesh settings.
        const fox_mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.015 ,64, 64),
            new THREE.MeshBasicMaterial({ color : 0xff0000 }),
        );
        this._foxmesh = fox_mesh;
        // 2. nittere_news Mesh settings.
        const nittere_mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.015 ,64, 64),
            new THREE.MeshBasicMaterial({ color : 0xffff00 })
        );
        this._nitteremesh = nittere_mesh;
        // 3. mbc Mesh settings.
        const mbc_mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.015 ,64, 64),
            new THREE.MeshBasicMaterial({ color : 0xffffff })
        );
        this._mbcmesh = mbc_mesh;
        // 4. cctv Mesh settings.
        const cctv_mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.015 ,64, 64),
            new THREE.MeshBasicMaterial({ color : 0x00ff00 })
        );
        this._cctv_mesh = cctv_mesh;
        // 5. bbc Mesh settings.
        const bbc_mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.015 ,64, 64),
            new THREE.MeshBasicMaterial({ color : 0x00ffff })
        );
        this._bbc_mesh = bbc_mesh;
        // location Cylindrical coordinates function.

        function convertLatLngToCartesian(p)
        {
            const lat = (p.lat) * Math.PI / 180;
            const lng = (p.lng) * Math.PI / 180;
            
            const x = Math.cos(lng) * Math.sin(lat);
            const y = Math.sin(lng) * Math.sin(lat);
            const z = Math.cos(lat);

            return { x,y,z }
        }

        // world wide news latitute lists.

        const fox_news_location = { lat : 40.730610, lng : 73.935242 }; // USA fox news.
        const nittere_news_location = { lat :  121.952832, lng : 136.939478 }; // japan nittere news.
        const mbc_news_location = { lat :  128.952832, lng : 127.939478 }; // korea mbc news.
        const cctv_news_location = { lat :  132.952832, lng : 117.939478 }; // china cctv news.
        const bbc_news_location = { lat : 89.430610, lng : 51.935242 }; // uk bbc news.

        // get [ fox news ] space world matrix position.
        const fox_new_pos = convertLatLngToCartesian(fox_news_location);
        // get [ nittere news ] space world matrix position.
        const nittere_pos = convertLatLngToCartesian(nittere_news_location);
        // get [ mbc news ] space world matrix position.
        const mbc_pos = convertLatLngToCartesian(mbc_news_location);
        // get [ cctv news ] space world matrix position.
        const cctv_pos = convertLatLngToCartesian(cctv_news_location);
        // get [ cctv news ] space world matrix position.
        const bbc_pos = convertLatLngToCartesian(bbc_news_location);

        // set [ fox news ] space world matrix position.
        fox_mesh.position.set(fox_new_pos.x, fox_new_pos.y, fox_new_pos.z);
        // set [ nittere news ] space world matrix position.
        nittere_mesh.position.set(nittere_pos.x, nittere_pos.y, nittere_pos.z);
        // set [ mbc news ] space world matrix position.
        mbc_mesh.position.set(mbc_pos.x, mbc_pos.y, mbc_pos.z);
        // set [ cctv news ] space world matrix position.
        cctv_mesh.position.set(cctv_pos.x, cctv_pos.y, cctv_pos.z);
        // set [ bbc news ] space world matrix position.
        bbc_mesh.position.set(bbc_pos.x, bbc_pos.y, bbc_pos.z);


        this._scene.add(fox_mesh);
        this._scene.add(nittere_mesh);
        this._scene.add(mbc_mesh);
        this._scene.add(cctv_mesh);
        this._scene.add(bbc_mesh);

        // #endregion

        // #region grouping earth meshes.



        const group = new THREE.Group;
        group.add(sphere);
        group.add(Atmosphere);

        // located place mesh add settings.
        group.add(fox_mesh);
        group.add(nittere_mesh);
        group.add(mbc_mesh);
        group.add(cctv_mesh);
        group.add(bbc_mesh);

        this._scene.add(group);
        this.earth_group = group;
        
        // #endregion

    }

    // THREE.js Raycast Interaction. python 함수와 함꼐 연결해야할 파트 !!!!!!
    _setupRaycaster(){
        const pointer = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        function onPointerMove( event ) {

            // calculate pointer position in normalized device coordinates
            // (-1 to +1) for both components
        
            pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        }

        window.addEventListener('mousemove', (e) => onPointerMove(e));

        // mouse click.
        let currentMesh = null;
        const mouseClick = () =>{
            if(this._currentMesh)
            {
                switch (this._currentMesh.object)
                {
                    case this._bbc_mesh:
                        show_news('EK');
                        break;
                    
                    case this._foxmesh:
                        show_news('America');
                        break;
                    
                    case this._cctv_mesh:
                        show_news('China');
                        break;

                    case this._mbcmesh:
                        show_news('Korea');
                        break;

                    case this._nitteremesh:
                        show_news('Japan');
                        break;
                    
                    default:
                        console.log('올바른 국가를 선택해 주세요.');
                        break;
                }
            }
        }
        window.addEventListener('click', () => mouseClick());

        const mesh_collections = [this._foxmesh, this._nitteremesh, this._mbcmesh, this._cctv_mesh, this._bbc_mesh]

        this._raycaster = raycaster;
        this._pointer = pointer;
        this._mesh_collections = mesh_collections;
        this._currentMesh = currentMesh;

    }



/// 희상 - 끝


// current fps
const stats = Stats();
document.body.appendChild(stats.dom);

// spinning animation
const animate = () => {
    requestAnimationFrame(animate);
    starMesh.rotation.y -= 0.002;
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.001;
    controls.update();
    //render();
    renderer.render(scene, camera);
    stats.update();
};

// rendering
const render = () => {
    renderer.render(scene, camera);
}

animate();
