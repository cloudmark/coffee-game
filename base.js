(function() {
  // Preprocessed using Coffee-Stirrer v1.0 ;

  Array.prototype.remove = function(v) { this.splice(this.indexOf(v) == -1 ? this.length : this.indexOf(v), 1); };

  var ColourUtils, GameEngine, GameObject, GameState, RectangleObject, TopBar,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ColourUtils = (function() {

    function ColourUtils() {}

    ColourUtils.prototype.getRandomColour = function() {
      return Math.round(0xffffff * Math.random()).toString(16);
    };

    return ColourUtils;

  })();

  GameObject = (function() {

    function GameObject(name, x, y) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.click = __bind(this.click, this);

      this.draw = __bind(this.draw, this);

      this.tick = __bind(this.tick, this);

    }

    GameObject.prototype.tick = function(time, state) {};

    GameObject.prototype.draw = function(context, state) {};

    GameObject.prototype.click = function(x, y, state) {};

    return GameObject;

  })();

  TopBar = (function(_super) {

    __extends(TopBar, _super);

    function TopBar() {
      this.draw = __bind(this.draw, this);

      this.tick = __bind(this.tick, this);
      TopBar.__super__.constructor.call(this, "Top Bar", 5, 15);
    }

    TopBar.prototype.tick = function(time) {
      this.time = time;
    };

    TopBar.prototype.draw = function(context, state) {
      var message, str_percentage, str_time;
      TopBar.__super__.draw.call(this, context);
      context.fillStyle = "white";
      context.font = "12pt Arial";
      str_time = (this.time / 1000).toFixed(2);
      str_percentage = ((state.killed / state.total) * 100).toFixed(2);
      message = "Time: " + str_time + " Kill: " + state.killed + " Total: " + state.total;
      return context.fillText(message, this.x, this.y);
    };

    return TopBar;

  })(GameObject);

  RectangleObject = (function(_super) {

    __extends(RectangleObject, _super);

    function RectangleObject(color, x, y) {
      this.color = color;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      this.click = __bind(this.click, this);

      this.draw = __bind(this.draw, this);

      this.tick = __bind(this.tick, this);

      RectangleObject.__super__.constructor.call(this, "Rectangle Object", x, y);
      this.reverseX = 1;
      this.reverseY = 1;
    }

    RectangleObject.prototype.tick = function(time) {
      RectangleObject.__super__.tick.call(this, time);
      if (this.x <= 0 || (this.x >= (640 - 10))) {
        this.reverseX *= -1;
        if (this.x < 10) {
          this.x = 10;
        }
        if (this.x > 640 - 10) {
          this.x = 640 - 10;
        }
      }
      if (this.y <= 0 || (this.y >= (480 - 10))) {
        this.reverseY *= -1;
        if (this.y < 10) {
          this.y = 10;
        }
        if (this.y > 480 - 10) {
          this.y = 480 - 10;
        }
      }
      this.x = this.x + (this.reverseX * 10.);
      return this.y = this.y + (this.reverseY * 10.);
    };

    RectangleObject.prototype.draw = function(context, state) {
      RectangleObject.__super__.draw.call(this, context);
      context.fillStyle = this.color;
      return context.fillRect(this.x, this.y, 10, 10);
    };

    RectangleObject.prototype.click = function(x, y, state) {
      if ((x >= this.x - 10) && (x <= this.x + 20) && (y >= this.y - 10) && (y <= this.y + 20)) {
        state.killed += 1;
        return this.removeGameObject();
      }
    };

    return RectangleObject;

  })(GameObject);

  GameState = (function() {

    function GameState() {
      this.killed = 0;
      this.total = 0;
    }

    return GameState;

  })();

  GameEngine = (function() {

    function GameEngine(canvas) {
      this.canvas = canvas;
      this.tick = __bind(this.tick, this);

      this.stop = __bind(this.stop, this);

      this.start = __bind(this.start, this);

      this.removeGameObject = __bind(this.removeGameObject, this);

      this.addGameObject = __bind(this.addGameObject, this);

      this.canvasClick = __bind(this.canvasClick, this);

      this.context = canvas.getContext("2d");
      this.state = new GameState();
      this.gameObjects = [];
      this.time = 0;
      this.TICK = 150;
      this.canvas.addEventListener("click", this.canvasClick, false);
    }

    GameEngine.prototype.canvasClick = function(event) {
      var obj, _i, _len, _ref, _results;
      console.log(event);
      _ref = this.gameObjects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(obj.click(event.x, event.y, this.state));
      }
      return _results;
    };

    GameEngine.prototype.addGameObject = function(gameObject) {
      var _this = this;
      this.gameObjects.push(gameObject);
      return gameObject.removeGameObject = (function() {
        _this.removeGameObject(gameObject);
        return true;
      });
    };

    GameEngine.prototype.removeGameObject = function(gameObject) {
      return this.gameObjects.remove(gameObject);
    };

    GameEngine.prototype.start = function() {
      return this.timer = window.setInterval(this.tick, this.TICK);
    };

    GameEngine.prototype.stop = function() {
      return window.clearInterval(this.timer);
    };

    GameEngine.prototype.tick = function() {
      var obj, _i, _j, _len, _len1, _ref, _ref1;
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, 640, 480);
      this.time = this.time + this.TICK;
      _ref = this.gameObjects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        obj.tick(this.time, this.state);
      }
      _ref1 = this.gameObjects;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        obj = _ref1[_j];
        obj.draw(this.context, this.state);
      }
      if (this.state.killed === this.state.total) {
        this.stop();
        return alert("You have won!");
      }
    };

    return GameEngine;

  })();

}).call(this);
