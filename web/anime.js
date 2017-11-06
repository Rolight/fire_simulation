// 下面是一些可以拿来调的参数
cloudModelConfig.Enx = 10;          //X的熵
cloudModelConfig.Eny = 10;                                                            //Y的熵
cloudModelConfig.Hex = 0.1;                                                    //X的超熵
cloudModelConfig.Hey = 0.1;                                                    //Y的超熵
var cameraPosX = 200;                                                             //摄像机位置
var cameraPosY = 20;                                                             //摄像机位置
var cameraPosZ = 200;                                                             //摄像机位置
//模拟代码
var pointPollSize = 3000;
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
// 材质贴图
var spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.15,
});

var particleCount = pointPollSize;

// 生成云模型中的点
var points = generatePoints(
    particleCount,
    cloudModelConfig.Enx,
    cloudModelConfig.Eny,
    cloudModelConfig.Hex,
    cloudModelConfig.Hey
);

// 按确定度从大到小排序，保证先出现的中间位置的火苗
points.sort(function (a, b) {
  return -a.u + b.u;
});

function animate() {
    if (group.children.length < particleCount) {
        for (var i = 1; i <= 15; i++) {
            var p = group.children.length;
            var particle = new THREE.Sprite(spriteMaterial);
            particle.position.x = points[p].position.x;
            particle.position.y = points[p].position.y;
            particle.position.z = points[p].position.z;
            particle.scale.set(6, 15, 6);
            group.add(particle);
        }
    }
    updatePoints(points, group);
    // group.rotation.y += 0.01;
    // 更新屏幕绘制
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

function setCameraPos(x, y, z) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(0, 0, 0);
}

function eehh(ex, ey, hx, hy) {
    if (cloudModelConfig.Enx === ex &&
        cloudModelConfig.Eny === ey &&
        cloudModelConfig.Hex === hx &&
        cloudModelConfig.hey === hy) {
        return;
    }
    cloudModelConfig.Enx = ex;
    cloudModelConfig.Eny = ey;
    cloudModelConfig.Hex = hx;
    cloudModelConfig.Hey = hy;
    // 清除已经生成的所有粒子
    group.children = [];
}
