
class Foo
        constructor:(fmt) ->
                @fmt = fmt

        getfmtpos:(bp, teamnum) ->
                pos = @fmt.p[teamnum]
                pos.x = (PITCH_HALF_LENGTH+bp[0]) * pos.ratio-PITCH_HALF_LENGTH if teamnum != 0
                return [pos.x, pos.y]

        think:(wm) ->
                if wm.gamestate is "before_kickoff"
                        return {jump:@getfmtpos(wm.ball, wm.myteamnum)}
                else
                        if wm.mycolor is 'red'
                                teammates = wm.redplayers
                        else #if wm.mycolor is 'blue'
                                teammates = wm.blueplayers
                        @mypos = teammates[wm.myteamnum]
                        #console.log(wm.ball)
                        @mydir = wm.mydir
                       
                        if player_near_ball(teammates, wm.ball) is wm.myteamnum
                                @go_and_kick(wm.ball)
                        else
                                @goto(@getfmtpos(wm.ball, wm.myteamnum))

        goto: (pos) ->
                return if Vector2d.distance(pos, @mypos) < 2
                me2pos = Vector2d.subtract(pos, @mypos)
                angle = Math.atan2(me2pos[1], me2pos[0])
                delta = Math.normaliseRadians(angle-@mydir)
                if Math.abs(delta) < Math.PI/6
                        return {dash:MAX_DASH_FORCE}
                else
                        return {turn:delta}
                
                


        go_and_kick:(ball) ->
                goal2ball = Vector2d.subtract(ball, OP_GOAL_POS)
                unit = Vector2d.unit(goal2ball)
                gopos = Vector2d.add(Vector2d.multiply(unit, BALL_R + PLAYER_R + 3), ball)
                
                ball2goal = Vector2d.subtract(OP_GOAL_POS, ball)
                angleb2g = Math.atan2(ball2goal[1], ball2goal[0])
                me2ball = Vector2d.subtract(ball, @mypos)
                anglem2b = Math.atan2(me2ball[1], me2ball[0])

                delta1 = Math.normaliseRadians(angleb2g-anglem2b)
                dis = Vector2d.distance(ball, @mypos)

                if Math.abs(delta1) < Math.PI/12 and dis < 20
                        delta2 = Math.normaliseRadians(anglem2b-@mydir)
                        if Math.abs(delta2) < Math.PI/12
                                return {kick:MAX_KICK_FORCE}
                        else
                                return {turn:delta2}
                else
                        @goto(gopos)

                

