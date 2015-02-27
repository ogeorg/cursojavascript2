var marvel = window.marvel || {};
marvel.model = marvel.model || {};
marvel.model.Character = (function () {
  'use strict';

  function Character(id, name) {
    this._data = {
      id: id,
      name: name
    };
  }

  Character.prototype.getId = function () {
    if (!this._data.id)
      throw Error("Missing id property on data for Character instance");
    return this._data.id;
  };

  Character.prototype.getName = function () {
    if (!this._data.name)
      throw Error("Missing name property on data for Character instance");
    return this._data.name;
  };

  return Character;
}());