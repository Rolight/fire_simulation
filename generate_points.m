function [points, speeds, remain_lifes] = generate_points(Enx, Eny, Hex, Hey, n)
    % points [x y z]
    % features [speedx speedy speedz]
    % remain_lifes
    [x, y, u] = cloud3d(0, 0, Enx, Eny, Hex, Hey, n);
    points = [x y zeros(n, 1)];
    points = points * 100;
    % z = -z;
    speedx = zeros(n, 1);
    speedy = zeros(n, 1);
    % speedz = ones(n, 1) * 2;
    % speedz = normrnd(4, 1, n, 1);
    speedz = u .* normrnd(0.5, 0.1, n, 1);
    speeds = [speedx speedy speedz];
    remain_lifes = 100 .* normrnd(5, 5, n, 1);
end
