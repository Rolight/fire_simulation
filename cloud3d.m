function [ x, y, z ] = cloud3d( Ex, Ey, Enx, Eny, Hex, Hey, n )
% 生成二维高斯云
    Ennx = normrnd(Enx, Hex, n, 1);
    Enny = normrnd(Eny, Hey, n, 1);
    x = normrnd(Ex, Ennx);
    y = normrnd(Ey, Enny);
    ex = ((x - Ex) .^ 2) ./ (2 * Ennx .* Ennx);
    ey = ((y - Ey) .^ 2) ./ (2 * Enny .* Enny);
    expValue = -(ex + ey);
    z = exp(expValue);
end

