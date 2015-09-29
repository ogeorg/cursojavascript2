var marvel = window.marvel || {};
marvel.model = marvel.model || {};
marvel.model.Comic = (function () {
  'use strict';

  function Comic(id, title, characters) {
    this._data = {
      id: id,
      title: title,
      characters: characters
    };
  }

  Comic.prototype.getId = function () {
    if (!this._data.id)
      throw Error("Missing id property on data for Comic instance");
    return this._data.id;
  };

  Comic.prototype.getTitle = function () {
    if (!this._data.title)
      throw Error("Missing title property on data for Comic instance");
    return this._data.title;
  };

  Comic.prototype.getCharacters = function () {
    if (!this._data.characters)
      throw Error("Missing characters property on data for Comic instance");
    return this._data.characters;
  };

  Comic.prototype.equals = function (other) {
    return other instanceof Comic && this._data.id === other._data.id;
  };

  Comic.fromJson = function (json) {
    return new Comic(json.id, json.title, json.characters);
  };

  return Comic;
}());