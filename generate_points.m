function [points, speeds, remain_lifes] = generate_points(Enx, Eny, Hex, Hey, n)
    % points [x y z]
    % features [speedx speedy speedz]
    % remain_lifes
    [x, y, z] = cloud3d(0, 0, Enx, Eny, Hex, Hey, n);
    points = [x y z];
    points = points * 100;
    % z = -z;
    speedx = zeros(n, 1);
    speedy = zeros(n, 1);
    % speedz = ones(n, 1) * 2;
    speedz = normrnd(4, 1, n, 1);
    speeds = [speedx speedy speedz];
    remain_lifes = z * 30 + rand * 100;
end
