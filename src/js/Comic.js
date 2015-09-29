var marvel = window.marvel || {};
marvel.model = marvel.model || {};
marvel.model.Comic = (function() {

  function Comic(id, title, characters)
  {
    this.id = id;
    this.title = title;
    this.characters = characters;
  }

  Comic.prototype.getId = function() {
    return this.id;
  };

  Comic.prototype.getTitle = function() {
    return this.title;
  };

  Comic.prototype.getCharacters = function() {
    return this.characters;
  };

  return Comic;

})();