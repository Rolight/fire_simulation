function flame_fluid( Enx, Eny, Hex, Hey, speed )
    curPoints = [];
    curSpeeds = [];
    curRemainLifes = [];
    loops = 2000;
    F(loops) = struct('cdata',[],'colormap',[]);
    for k = 1:loops
        [points, speeds, remain_lifes] = generate_points(Enx, Eny, Hex, Hey, floor(5000 * rand));
        curPoints = [curPoints; points];
        curSpeeds = [curSpeeds; speeds];
        curRemainLifes = [curRemainLifes; remain_lifes];
        [curPoints, curSpeeds, curRemainLifes] = update_point(curPoints, curSpeeds, curRemainLifes);
        curx = curPoints(:, 1);
        cury = curPoints(:, 2);
        curz = curPoints(:, 3);
        % scatter3(curx, cury, curz, 5, 'red', 'filled');
        draw(curPoints);
        drawnow limitrate;
        F(k) = getframe;
    end
end
