(function() {
  // Preprocessed using Coffee-Stirrer v1.0 ;

  var GameEngine, GameObject, GameState,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
