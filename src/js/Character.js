var marvel = window.marvel || {};
marvel.model = marvel.model || {};
marvel.model.Character = (function() {

  function Character(id, name) {
    this.id = id;
    this.name = name;
  }

  Character.prototype.getId = function () {
    return this.id;
  };

  Character.prototype.getName = function () {
    return this.name;
  };

  return Character;

})();
