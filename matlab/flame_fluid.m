function [F] = flame_fluid( Enx, Eny, Hex, Hey, speed )
    curPoints = [];
    curSpeeds = [];
    curRemainLifes = [];
    loops = 1000;
    maxPoints = 5000;
    F(loops) = struct('cdata',[],'colormap',[]);
    for k = 1:loops
        if size(curPoints, 1) <= maxPoints
            [points, speeds, remain_lifes] = generate_points(Enx, Eny, Hex, Hey, 5000);
            curPoints = [curPoints; points];
            curSpeeds = [curSpeeds; speeds];
            curRemainLifes = [curRemainLifes; remain_lifes];
        end
        [curPoints, curSpeeds, curRemainLifes] = update_point(curPoints, curSpeeds, curRemainLifes);
        curx = curPoints(:, 1);
        cury = curPoints(:, 2);
        curz = curPoints(:, 3);
        % scatter3(curx, cury, curz, 5, 'red', 'filled');
        draw(curPoints);
        drawnow 
        F(k) = getframe;
    end
    save('moive.mat', 'F');
end
