function draw( points )
    [n, m] = size(points);
    cs = zeros(n, 1);
    % for i = 1:n
        % dis = points - points(i, :);
        % cs(i) = sum(sum(dis .^ 2, 2) < 500 * 500) / points(i, 3);
    % end
    % scatter3(points(:, 1), points(:, 2), points(:, 3), 10, cs, 'filled');
    % avg = sum(points(:, 3)) / n;
    % scatter3(points(:, 1), points(:, 2), points(:, 3), 10, points(:, 3), 'filled');
    X = [points(:, 1) points(:, 2)];
    Y = [points(:, 2) points(:, 3)];
    Z = [points(:, 3) points(:, 1)];
    surf(X, Y, Z);
    colormap(hot);
    set(gca,'Color',[0, 0, 0]);
end

