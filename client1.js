// Generated by CoffeeScript 1.6.3
(function() {
  var Athom, BALL_R, Bar, Fmt235, Fmt442, Fmt523, Foo, GOAL_WIDTH, HALF_GOAL_WIDTH, MAX_DASH_FORCE, MAX_KICK_FORCE, OP_GOAL_POS, PENALTY_AREA_LENGTH, PENALTY_AREA_WIDTH, PITCH_HALF_LENGTH, PITCH_HALF_WIDTH, PITCH_LENGTH, PLAYER_R, Vector2d, in_my_penalty, is_goalie, mY_GOAL_POS, multiply, player_near_ball, root;

  Vector2d = {};

  Vector2d.distance = function(a, b) {
    return Vector2d.len(Vector2d.subtract(a, b));
  };

  Vector2d.subtract = function(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  };

  Vector2d.add = function(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  };

  Vector2d.multiply = multiply = function(a, s) {
    if (typeof s === 'number') {
      return [a[0] * s, a[1] * s];
    }
    return [a[0] * s[0], a[1] * s[1]];
  };

  Vector2d.divide = function(a, s) {
    if (typeof s === 'number') {
      return [a[0] / s, a[1] / s];
    }
    throw new Error('only divide by scalar supported');
  };

  Vector2d.len = function(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  };

  Vector2d.unit = function(v) {
    var len;
    len = Vector2d.len(v);
    if (len) {
      return [v[0] / len, v[1] / len];
    }
    return [0, 0];
  };

  Vector2d.rotate = function(v, angle) {
    angle = math.normaliseRadians(angle);
    return [v[0] * Math.cos(angle) - v[1] * Math.sin(angle), v[0] * Math.sin(angle) + v[1] * Math.cos(angle)];
  };

  Vector2d.dot = function(v1, v2) {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
  };

  Vector2d.angle = function(v1, v2) {
    var perpDot;
    perpDot = v1[0] * v2[1] - v1[1] * v2[0];
    return Math.atan2(perpDot, Vector2d.dot(v1, v2));
  };

  Vector2d.truncate = function(v, maxLength) {
    if (Vector2d.len(v) > maxLength) {
      return multiply(Vector2d.unit(v), maxLength);
    }
    return v;
  };

  Vector2d.vector = function(angle) {
    return [Math.cos(angle), Math.sin(angle)];
  };

  Math.normaliseDegrees = function(degrees) {
    degrees = degrees % 360;
    if (degrees < 0) {
      degrees += 360;
    }
    return degrees;
  };

  Math.normaliseRadians = function(radians) {
    radians = radians % (2 * Math.PI);
    if (radians < -Math.PI) {
      radians += 2 * Math.PI;
    }
    if (radians > Math.PI) {
      radians -= 2 * Math.PI;
    }
    return radians;
  };

  Math.degrees = function(radians) {
    return radians * (180 / Math.PI);
  };

  Math.radians = function(degrees) {
    return degrees * (Math.PI / 180);
  };

  Math.sign = function(number) {
    return number / Math.abs(number);
  };

  Fmt523 = (function() {
    function Fmt523() {
      this.wing1 = 80;
      this.wing2 = 60;
      this.wing3 = 60;
      this.ratio = {
        gk: 0,
        b: 0.3,
        m: 0.6,
        f: 1.0
      };
      this.p = [
        {
          x: -500,
          y: 0,
          ratio: this.ratio.gk
        }, {
          x: 0,
          y: -this.wing1,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: 0,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: this.wing1,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: -this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: -2 * this.wing3,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: -this.wing3,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: 0,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: this.wing3,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: 2 * this.wing3,
          ratio: this.ratio.b
        }
      ];
    }

    return Fmt523;

  })();

  Fmt235 = (function() {
    function Fmt235() {
      this.wing1 = 60;
      this.wing2 = 80;
      this.wing3 = 100;
      this.ratio = {
        gk: 0,
        b: 0.4,
        m: 0.75,
        f: 1.0
      };
      this.p = [
        {
          x: -500,
          y: 0,
          ratio: this.ratio.gk
        }, {
          x: 0,
          y: this.wing3,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: -this.wing3,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: -this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: 0,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: -2 * this.wing1,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: -this.wing1,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: 0,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: this.wing1,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: 2 * this.wing1,
          ratio: this.ratio.f
        }
      ];
    }

    return Fmt235;

  })();

  Fmt442 = (function() {
    function Fmt442() {
      this.wing2 = 200;
      this.wing1 = 60;
      this.center = 20;
      this.ratio = {
        gk: 0,
        b: 0.4,
        m: 0.75,
        f: 1.0
      };
      this.p = [
        {
          x: -500,
          y: 0,
          ratio: this.ratio.gk
        }, {
          x: 0,
          y: this.wing2,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: -this.wing2,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: this.wing1,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: -this.wing1,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: -this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: this.wing1,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: -this.wing1,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: this.center,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: -this.center,
          ratio: this.ratio.f + 0.1
        }
      ];
    }

    return Fmt442;

  })();

  PITCH_LENGTH = 1050;

  PITCH_HALF_LENGTH = 525;

  PITCH_HALF_WIDTH = 340;

  BALL_R = 2.5;

  PLAYER_R = 7;

  MAX_DASH_FORCE = 6;

  MAX_KICK_FORCE = 2.4;

  GOAL_WIDTH = 140.2;

  HALF_GOAL_WIDTH = 70.1;

  PENALTY_AREA_LENGTH = 165;

  PENALTY_AREA_WIDTH = 403.2;

  mY_GOAL_POS = [-PITCH_HALF_LENGTH, 0];

  OP_GOAL_POS = [PITCH_HALF_LENGTH, 0];

  is_goalie = function(teamnum) {
    return teamnum === 0;
  };

  in_my_penalty = function(pos) {
    return (pos[0] < -PITCH_LENGTH / 2 + PENALTY_AREA_LENGTH) && (Math.abs(pos[1]) < PENALTY_AREA_WIDTH / 2);
  };

  player_near_ball = function(teammates, ball) {
    var dis, i, min, num, player, _i, _len;
    min = PITCH_LENGTH;
    num = -1;
    i = 0;
    for (_i = 0, _len = teammates.length; _i < _len; _i++) {
      player = teammates[_i];
      dis = Vector2d.distance(player, ball);
      if (dis <= min) {
        min = dis;
        num = i;
      }
      i += 1;
    }
    return num;
  };

  Foo = (function() {
    function Foo(num, side) {
      this.teamname = 'Foo';
      this.fill_color = 'red';
      this.teamnum = num;
      this.side = side;
      this.fmt = new Fmt442();
      this.eps = Math.PI / 6;
    }

    Foo.prototype.getfmtpos = function(bp) {
      var pos;
      pos = this.fmt.p[this.teamnum];
      if (this.teamnum !== 0) {
        pos.x = (PITCH_HALF_LENGTH + bp[0]) * pos.ratio - PITCH_HALF_LENGTH;
      }
      return [pos.x, pos.y];
    };

    Foo.prototype.think = function(wm) {
      this.wm = wm;
      if (this.side === 'left') {
        this.teammates = this.wm.leftplayers;
      } else {
        this.teammates = this.wm.rightplayers;
      }
      this.mypos = this.teammates[this.teamnum];
      this.mydir = this.wm.mydir;
      switch (this.wm.gamestate) {
        case 'before_kickoff':
          return {
            jump: this.getfmtpos(this.wm.ball, this.teamnum)
          };
        case 'game_over':
          return {};
        case 'play_on':
          return this.playon();
        case 'goalkick_left':
          if (this.side === 'left') {
            return this.goalkick();
          } else {
            return this.playon();
          }
          break;
        case 'goalkick_right':
          if (this.side === 'right') {
            return this.goalkick();
          } else {
            return this.playon();
          }
          break;
        default:
          return this.playon();
      }
    };

    Foo.prototype.playon = function() {
      if (is_goalie(this.teamnum)) {
        return this.goalie();
      }
      return this.play();
    };

    Foo.prototype.goalkick = function() {
      return this.play();
    };

    Foo.prototype.goalie = function() {
      var ret;
      if (Vector2d.distance(this.mypos, this.wm.ball) < HALF_GOAL_WIDTH && in_my_penalty(this.wm.ball)) {
        ret = this.goto(this.wm.ball);
        ret.suck = 0;
        return ret;
      } else {
        return this.goto(this.getfmtpos(this.wm.ball, this.teamnum));
      }
    };

    Foo.prototype.play = function() {
      if (player_near_ball(this.teammates, this.wm.ball) === this.teamnum) {
        return this.go_and_kick(this.wm.ball);
      } else {
        return this.goto(this.getfmtpos(this.wm.ball, this.teamnum));
      }
    };

    Foo.prototype.goto = function(pos) {
      var angle, delta, me2pos;
      if (Vector2d.distance(pos, this.mypos) < 0.1) {
        return {};
      }
      me2pos = Vector2d.subtract(pos, this.mypos);
      angle = Math.atan2(me2pos[1], me2pos[0]);
      delta = Math.normaliseRadians(angle - this.mydir);
      if (Math.abs(delta) < this.eps) {
        return {
          dash: MAX_DASH_FORCE
        };
      } else {
        return {
          turn: delta
        };
      }
    };

    Foo.prototype.go_and_kick = function(ball) {
      var angleb2g, anglem2b, ball2goal, delta1, delta2, dis, goal2ball, gopos, me2ball, unit;
      goal2ball = Vector2d.subtract(ball, OP_GOAL_POS);
      unit = Vector2d.unit(goal2ball);
      gopos = Vector2d.add(Vector2d.multiply(unit, BALL_R + PLAYER_R + 2), ball);
      ball2goal = Vector2d.subtract(OP_GOAL_POS, ball);
      angleb2g = Math.atan2(ball2goal[1], ball2goal[0]);
      me2ball = Vector2d.subtract(ball, this.mypos);
      anglem2b = Math.atan2(me2ball[1], me2ball[0]);
      delta1 = Math.normaliseRadians(angleb2g - anglem2b);
      dis = Vector2d.distance(ball, this.mypos);
      if (Math.abs(delta1) < this.eps && dis < BALL_R + PLAYER_R + 3) {
        delta2 = Math.normaliseRadians(anglem2b - this.mydir);
        if (Math.abs(delta2) < this.eps) {
          return {
            kick: MAX_KICK_FORCE
          };
        } else {
          return {
            turn: delta2
          };
        }
      } else {
        return this.goto(gopos);
      }
    };

    return Foo;

  })();

  Bar = (function() {
    function Bar(num, side) {
      this.teamname = 'Bar';
      this.fill_color = 'lightblue';
      this.teamnum = num;
      this.side = side;
      this.fmt = new Fmt442();
      this.eps = Math.PI / 11;
    }

    Bar.prototype.getfmtpos = function(bp) {
      var pos;
      pos = this.fmt.p[this.teamnum];
      if (this.teamnum !== 0) {
        pos.x = (PITCH_HALF_LENGTH + bp[0]) * pos.ratio - PITCH_HALF_LENGTH;
      }
      return [pos.x, pos.y];
    };

    Bar.prototype.think = function(wm) {
      this.wm = wm;
      if (this.side === 'left') {
        this.teammates = this.wm.leftplayers;
      } else {
        this.teammates = this.wm.rightplayers;
      }
      this.mypos = this.teammates[this.teamnum];
      this.mydir = this.wm.mydir;
      switch (this.wm.gamestate) {
        case 'before_kickoff':
          return {
            jump: this.getfmtpos(this.wm.ball, this.teamnum)
          };
        case 'game_over':
          return {};
        case 'play_on':
          return this.playon();
        case 'goalkick_left':
          if (this.side === 'left') {
            return this.goalkick();
          } else {
            return this.playon();
          }
          break;
        case 'goalkick_right':
          if (this.side === 'right') {
            return this.goalkick();
          } else {
            return this.playon();
          }
          break;
        default:
          return this.playon();
      }
    };

    Bar.prototype.playon = function() {
      if (is_goalie(this.teamnum)) {
        return this.goalie();
      }
      return this.play();
    };

    Bar.prototype.goalkick = function() {
      return this.play();
    };

    Bar.prototype.goalie = function() {
      var ret;
      if (Vector2d.distance(this.mypos, this.wm.ball) < HALF_GOAL_WIDTH && in_my_penalty(this.wm.ball)) {
        ret = this.goto(this.wm.ball);
        ret.suck = 0;
        return ret;
      } else {
        return this.goto(this.getfmtpos(this.wm.ball, this.teamnum));
      }
    };

    Bar.prototype.play = function() {
      if (player_near_ball(this.teammates, this.wm.ball) === this.teamnum) {
        return this.go_and_kick(this.wm.ball);
      } else {
        return this.goto(this.getfmtpos(this.wm.ball, this.teamnum));
      }
    };

    Bar.prototype.goto = function(pos) {
      var angle, delta, me2pos;
      if (Vector2d.distance(pos, this.mypos) < 0.1) {
        return {};
      }
      me2pos = Vector2d.subtract(pos, this.mypos);
      angle = Math.atan2(me2pos[1], me2pos[0]);
      delta = Math.normaliseRadians(angle - this.mydir);
      if (Math.abs(delta) < this.eps) {
        return {
          dash: MAX_DASH_FORCE
        };
      } else {
        return {
          turn: delta
        };
      }
    };

    Bar.prototype.go_and_kick = function(ball) {
      var angleb2g, anglem2b, ball2goal, delta1, delta2, dis, goal2ball, gopos, me2ball, unit;
      goal2ball = Vector2d.subtract(ball, OP_GOAL_POS);
      unit = Vector2d.unit(goal2ball);
      gopos = Vector2d.add(Vector2d.multiply(unit, BALL_R + PLAYER_R + 2), ball);
      ball2goal = Vector2d.subtract(OP_GOAL_POS, ball);
      angleb2g = Math.atan2(ball2goal[1], ball2goal[0]);
      me2ball = Vector2d.subtract(ball, this.mypos);
      anglem2b = Math.atan2(me2ball[1], me2ball[0]);
      delta1 = Math.normaliseRadians(angleb2g - anglem2b);
      dis = Vector2d.distance(ball, this.mypos);
      if (Math.abs(delta1) < this.eps && dis < BALL_R + PLAYER_R + 3) {
        delta2 = Math.normaliseRadians(anglem2b - this.mydir);
        if (Math.abs(delta2) < this.eps) {
          return {
            kick: MAX_KICK_FORCE
          };
        } else {
          return {
            turn: delta2
          };
        }
      } else {
        return this.goto(gopos);
      }
    };

    return Bar;

  })();

  Athom = (function() {
    function Athom(num, side) {
      this.teamname = 'Athom';
      this.fill_color = 'white';
      this.teamnum = num;
      this.side = side;
      this.fmt = new Fmt523();
      this.eps = Math.PI / 6;
    }

    Athom.prototype.getfmtpos = function(bp) {
      var pos;
      pos = this.fmt.p[this.teamnum];
      if (this.teamnum !== 0) {
        pos.x = (PITCH_HALF_LENGTH + bp[0]) * pos.ratio - PITCH_HALF_LENGTH;
      }
      return [pos.x, pos.y];
    };

    Athom.prototype.think = function(wm) {
      this.wm = wm;
      if (this.side === 'left') {
        this.teammates = this.wm.leftplayers;
      } else {
        this.teammates = this.wm.rightplayers;
      }
      this.mypos = this.teammates[this.teamnum];
      this.mydir = this.wm.mydir;
      switch (this.wm.gamestate) {
        case 'before_kickoff':
          return {
            jump: this.getfmtpos(this.wm.ball, this.teamnum)
          };
        case 'game_over':
          return {};
        case 'play_on':
          return this.playon();
        case 'goalkick_left':
          if (this.side === 'left') {
            return this.goalkick();
          } else {
            return this.playon();
          }
          break;
        case 'goalkick_right':
          if (this.side === 'right') {
            return this.goalkick();
          } else {
            return this.playon();
          }
          break;
        default:
          return this.playon();
      }
    };

    Athom.prototype.playon = function() {
      if (is_goalie(this.teamnum)) {
        return this.goalie();
      }
      return this.play();
    };

    Athom.prototype.goalkick = function() {
      return this.play();
    };

    Athom.prototype.goalie = function() {
      var ret;
      if (Vector2d.distance(this.mypos, this.wm.ball) < HALF_GOAL_WIDTH && in_my_penalty(this.wm.ball)) {
        ret = this.goto(this.wm.ball);
        ret.suck = 0;
        return ret;
      } else {
        return this.goto(this.getfmtpos(this.wm.ball, this.teamnum));
      }
    };

    Athom.prototype.play = function() {
      if (player_near_ball(this.teammates, this.wm.ball) === this.teamnum) {
        return this.go_and_kick(this.wm.ball);
      } else {
        return this.goto(this.getfmtpos(this.wm.ball, this.teamnum));
      }
    };

    Athom.prototype.goto = function(pos) {
      var angle, delta, me2pos;
      if (Vector2d.distance(pos, this.mypos) < 0.1) {
        return {};
      }
      me2pos = Vector2d.subtract(pos, this.mypos);
      angle = Math.atan2(me2pos[1], me2pos[0]);
      delta = Math.normaliseRadians(angle - this.mydir);
      if (Math.abs(delta) < this.eps) {
        return {
          dash: MAX_DASH_FORCE
        };
      } else {
        return {
          turn: delta
        };
      }
    };

    Athom.prototype.passable_player_pos = function(ball) {
      var dis, i, min, num, player, the_player, _i, _len, _ref;
      min = 100000;
      the_player = this.teammates[0];
      num = -1;
      i = 0;
      _ref = this.teammates;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        dis = Vector2d.distance(player, OP_GOAL_POS);
        if (dis <= min) {
          the_player = player;
          min = dis;
          num = i;
        }
        i += 1;
      }
      if (num === this.teamnum) {
        return ball;
      }
      return the_player;
    };

    Athom.prototype.go_and_kick = function(ball) {
      var angleb2g, angleb2p, anglem2b, b2gdis, b2pdis, ball2goal, ball2pass, delta2, delta_m2g, delta_m2p, goal2ball, gopos, m2bdis, me2ball, pass_pos, unit;
      goal2ball = Vector2d.subtract(ball, OP_GOAL_POS);
      unit = Vector2d.unit(goal2ball);
      gopos = Vector2d.add(Vector2d.multiply(unit, BALL_R + PLAYER_R + 2), ball);
      ball2goal = Vector2d.subtract(OP_GOAL_POS, ball);
      angleb2g = Math.atan2(ball2goal[1], ball2goal[0]);
      me2ball = Vector2d.subtract(ball, this.mypos);
      anglem2b = Math.atan2(me2ball[1], me2ball[0]);
      delta_m2g = Math.normaliseRadians(angleb2g - anglem2b);
      m2bdis = Vector2d.distance(ball, this.mypos);
      b2gdis = Vector2d.distance(OP_GOAL_POS, ball);
      pass_pos = this.passable_player_pos(ball);
      ball2pass = Vector2d.subtract(pass_pos, ball);
      angleb2p = Math.atan2(ball2pass[1], ball2pass[0]);
      delta_m2p = Math.normaliseRadians(angleb2p - anglem2b);
      b2pdis = Vector2d.distance(pass_pos, ball);
      if (Math.abs(delta_m2g) < this.eps && m2bdis < BALL_R + PLAYER_R + 3) {
        delta2 = Math.normaliseRadians(anglem2b - this.mydir);
        if (Math.abs(delta2) < this.eps) {
          if (b2gdis < 180) {
            return {
              kick: 30
            };
          } else {
            return {
              kick: 1.4
            };
          }
        } else {
          return {
            turn: delta2
          };
        }
      } else if (Math.abs(delta_m2p) < this.eps / 2 && m2bdis < BALL_R + PLAYER_R + 3 && b2gdis < 500 && b2pdis > 30) {
        delta2 = Math.normaliseRadians(anglem2b - this.mydir);
        if (Math.abs(delta2) < this.eps / 2) {
          return {
            kick: 2
          };
        } else {
          return {
            turn: delta2
          };
        }
      } else {
        return this.goto(gopos);
      }
    };

    return Athom;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.client1 = {};

  root.client1.Foo = Foo;

  root.client1.Bar = Bar;

  root.client1.Athom = Athom;

}).call(this);
