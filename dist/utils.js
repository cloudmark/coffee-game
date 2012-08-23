(function() {
  // Preprocessed using Coffee-Stirrer v1.0 ;

  Array.prototype.remove = function(v) { this.splice(this.indexOf(v) == -1 ? this.length : this.indexOf(v), 1); };

  var ColourUtils;

  ColourUtils = (function() {

    function ColourUtils() {}

    ColourUtils.prototype.getRandomColour = function() {
      return Math.round(0xffffff * Math.random()).toString(16);
    };

    return ColourUtils;

  })();

}).call(this);
