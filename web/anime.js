// 下面是一些可以拿来调的参数
cloudModelConfig.Enx = 10;          //X的熵
cloudModelConfig.Eny = 10;                                                            //Y的熵
cloudModelConfig.Hex = 0.1;                                                    //X的超熵
cloudModelConfig.Hey = 0.1;                                                    //Y的超熵
cloudModelConfig.EnxD = 0.1;
cloudModelConfig.HexD = 0.1;
cloudModelConfig.EnxR = 0.5;
cloudModelConfig.HexR = 0.1;


var cameraPosX = 200;                                                             //摄像机位置
var cameraPosY = 20;                                                             //摄像机位置
var cameraPosZ = 200;                                                             //摄像机位置
// 粒子池大小
var pointPollSize = 2000;
//创建场景
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
//初始化摄像机
width = window.innerWidth;
height = window.innerHeight;
// 地平线高度
skyline = 60

var camera = new THREE.PerspectiveCamera( 25, width / height, 0.1, 1e7 );

camera.position.x = cameraPosX;
camera.position.y = cameraPosY;
camera.position.z = cameraPosZ;
camera.lookAt(0, skyline, 0);

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
    cloudModelConfig
);

// 按确定度从大到小排序，保证先出现的中间位置的火苗
points.sort(function (a, b) {
  return -a.u + b.u;
});

function animate() {
    if (group.children.length < particleCount) {
        for (var i = 1; i <= 15 && group.children.length < particleCount; i++) {
            var p = group.children.length;
            var particle = new THREE.Sprite(spriteMaterial);
            particle.position.x = points[p].position.x;
            particle.position.y = points[p].position.y + skyline;
            particle.position.z = points[p].position.z;
            particle.scale.set(6, 10, 6);
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
    camera.position.y = y;
    camera.position.z = 200;
    camera.position.x = 200;
    group.rotation.y = z;
    camera.lookAt(0, skyline, 0);
}

function eehh(configs) {
    var names = ['Enx', 'Eny', 'Hex', 'Hey', 'EnxD', 'HexD', 'EnxR', 'HexR'];
    // 如果没有发生更改 就不清空
    var changed = false;
    for (var i = 0; i < names.length; i++) {
        if(configs[i] != cloudModelConfig[names[i]]) {
            changed = true;
        }
        cloudModelConfig[names[i]] = configs[i];
    }
    // 如果发生更改，清除已经生成的所有粒子
    if (changed) {
        group.children = [];
    }
}

function setParticleCount(value) {
    particleCount = parseInt(value)
    if (!particleCount) {
        particleCount = 2000
    }
    group.children = [];
    points = generatePoints(
        particleCount,
        cloudModelConfig
    )
    console.log("particleCount set to" + value)
}
