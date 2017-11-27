function draw( points )
    [n, m] = size(points);
    cs = zeros(n, 1);
    % for i = 1:n
    %    dis = points - points(i, :);
    %    cs(i) = abs(sum(sum(dis .^ 2, 2) < 200 * 200) - points(i, 3) .^ (1.5));
    % end
    % points = points(cs > 20, :);
    % cs = cs(cs > 20, :);
    % tsp = cs / max(cs);
    % colors = vals2colormap(cs, 'hot');
    % scatter3sph(points(:, 1), points(:, 2), points(:, 3), 'color', colors, 'transp', tsp);
    % avg = sum(points(:, 3)) / n;
    cs = sum(abs(points), 2) .* points(:, 3);
    scatter3(points(:, 1), points(:, 2), points(:, 3), 100, sqrt(cs), '*');
    set(gca,'XLim',[-5000 5000],'YLim',[-5000 5000],'ZLim',[0 50])
    colormap(hot);
    set(gca,'Color',[0, 0, 0]);
end
