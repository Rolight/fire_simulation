cloudModelConfig = {
  Ex: 0,
  Ey: 0,
  Enx: 10,
  Eny: 10,
  Hex: 0.1,
  Hey: 0.1,
  EnxD: 0.1,
  HexD: 0.1,
  EnxR: 5,
  HexR: 0.1
};

// 正态分布随机数生成
// 来源：http://www.cnblogs.com/zztt/p/4025207.html
function normrnd(mean, std_dev){
    return mean + (randomNormalDistribution() * std_dev);
}

function randomNormalDistribution(){
    var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do{
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    }
    while ( w == 0.0 || w >= 1.0);
    c = Math.sqrt((-2 * Math.log(w)) / w);
    return u * c;
}

// 一维高斯云生成
function cloud1d(Ex, Enx, Hex, n) {
    var ret = [];
    for(var i = 1; i <= n; i++) {
        var Ennx = normrnd(Enx, Hex);
        var x = normrnd(Ex, Ennx);
        var ex = (x - Ex) * (x - Ex) / (2 * Ennx * Ennx);
        var u = Math.exp(-ex);
        ret.push([x, u]);
    }
    return ret;
}

// 二维高斯云生成
function cloud2d(Ex, Ey, Enx, Eny, Hex, Hey, n) {
  var ret = [];
  for (var i = 1; i <= n; i++) {
    var Ennx = normrnd(Enx, Hex);
    var Enny = normrnd(Eny, Hey);
    var x = normrnd(Ex, Ennx);
    var y = normrnd(Ey, Enny);
    var ex = ((x - Ex) * (x - Ex)) / (2 * Ennx * Ennx);
    var ey = ((y - Ey) * (y - Ey)) / (2 * Enny * Enny);
    var expValue = -(ex + ey);
    var u = Math.exp(expValue);
    ret.push([x, y, u]);
  }
  return ret;
}

// 生成新粒子并且初始化属性
function generatePoints(n, cloudModelConfig) {
  var Enx = cloudModelConfig.Enx;
  var Eny = cloudModelConfig.Eny;
  var Hex = cloudModelConfig.Hex;
  var Hey = cloudModelConfig.Hey;
  var EnxD = cloudModelConfig.EnxD;
  var HexD = cloudModelConfig.HexD;
  var EnxR = cloudModelConfig.EnxR;
  var HexR = cloudModelConfig.HexR;
  // 生成高斯云
  var cloud2dModel = cloud2d(0, 0, Enx, Eny, Hex, Hey, n);
  var cloud1dModel = cloud1d(0.5, EnxD, HexD, n);
  var cloud1dLifeModel = cloud1d(0, EnxR, HexR, n);
  var points = [];
  for (var i = 0; i < n; i++) {
    curPoint = {
      //位置 x z为横纵坐标，y为高度
      position : {
        x: cloud2dModel[i][0],
        z: cloud2dModel[i][1],
        y: 0,
      },
      //确定度
      u: cloud2dModel[i][2],
      //速度
      speed: {
        x: 0,
        z: 0,
        // 粒子上升速度和确定度挂钩
        // 粒子上升速度的随机干扰由1维正向云生成
        // u = 0.5, sigma = 0.1
        // y: cloud2dModel[i][2] * Math.abs(cloud1dModel[i][1])
        y: cloud2dModel[i][2] * normrnd(0.5, 0.1)
      },
      // 寿命
      // 寿命的随机干扰由1维正向云生成
      remain_life: 150 * normrnd(5, 5)
      // remain_life: 150 * (cloud1dLifeModel[i][1] + 5)
    };
    points.push(curPoint);
  }
  return points;
}

// 更新粒子属性
function updatePoints(points, particleSystem) {
  var p = particleSystem.children;
  var n = p.length;
  for (var i = 0; i < n; i++) {
    curPoint = points[i];
    // 判断粒子是否死亡
    // 越高 寿命减少的越快
    curPoint.remain_life -= curPoint.position.y;
    if (curPoint.remain_life <= 0) {
      // 如果死亡 生成新粒子
      points[i] = generatePoints(
        1, window.cloudModelConfig.Enx, window.cloudModelConfig.Eny,
        window.cloudModelConfig.Hex, window.cloudModelConfig.Hey
      )[0];
    }
    else {
      // 计算粒子运动
      curPoint.position.x += curPoint.speed.x + normrnd(0, 0.2);
      curPoint.position.y += curPoint.speed.y;
      curPoint.position.z += curPoint.speed.z + normrnd(0, 0.2);
    }
    // 将位置信息更新到Sprite
    p[i].position.x = curPoint.position.x;
    p[i].position.y = curPoint.position.y;
    p[i].position.z = curPoint.position.z;
  }
}
