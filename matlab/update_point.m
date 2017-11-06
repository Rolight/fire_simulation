function [ points, speeds, remain_lifes ] = update_point(oldPoints, oldSpeeds, oldRemainLifes)
    remain_lifes = oldRemainLifes - oldPoints(:, 3);
    speeds = oldSpeeds(remain_lifes > 0, :);
    points = (oldPoints + oldSpeeds);
    points = points(remain_lifes > 0, :);
    remain_lifes = remain_lifes(remain_lifes > 0, :);
end
