// 下面是一些可以拿来调的参数
var pointPollSize = 5000;     //屏幕上所有粒子的数量
cloudModelConfig.Enx = 10;          //X的熵
cloudModelConfig.Eny = 10;                                                            //Y的熵
cloudModelConfig.Hex = 10;                                                    //X的超熵
cloudModelConfig.Hey = 10;                                                    //Y的超熵
var cameraPosX = 200;                                                             //摄像机位置
var cameraPosY = 200;                                                             //摄像机位置
var cameraPosZ = 200;                                                             //摄像机位置
//模拟代码
//创建场景
var scene = new THREE.Scene();
//初始化摄像机
width = window.innerWidth;
height = window.innerHeight;
var camera = new THREE.PerspectiveCamera( 25, width / height, 0.1, 1e7 );
camera.position.x = cameraPosX;
camera.position.y = cameraPosY;
camera.position.z = cameraPosZ;
camera.lookAt(0, 0, 0);
//初始化渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );
// 初始化粒子群
var group = new THREE.Group();
scene.add(group);
// 导入纹理 因为CORS的限制需要在本地起服务器
var texture = new THREE.TextureLoader().load( 'Fire.png' );
var spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.15,
});
var particleCount = pointPollSize;
var points = generatePoints(
    particleCount,
    cloudModelConfig.Enx,
    cloudModelConfig.Eny,
    cloudModelConfig.Hex,
    cloudModelConfig.Hey
);
// 依次创建单个粒子
for(var p = 0; p < particleCount; p++) {
    var particle = new THREE.Sprite(spriteMaterial);
    particle.position.x = points[p].position.x;
    particle.position.y = points[p].position.y;
    particle.position.z = points[p].position.z;
    particle.scale.set(6, 6, 6);
    group.add(particle);
}
function animate() {
    updatePoints(points, group);
    group.rotation.y += 0.01;
    // 更新屏幕绘制
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

function c(x, y, z) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(0, 0, 0);
}

function eehh(ex, ey, hx, hy) {
    cloudModelConfig.Enx = ex;
    cloudModelConfig.Eny = ey;
    cloudModelConfig.Hex = hx;
    cloudModelConfig.Hey = hy;
}
