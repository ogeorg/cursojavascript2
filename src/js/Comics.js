var marvel = window.marvel || {};
marvel.model = marvel.model || {};
marvel.model.Comics = (function () {
  'use strict';

  function Comics(comics) {
    this._comics = comics;
  }

  Comics.prototype.all = function () {
    return this._comics;
  };

  Comics.prototype.contains = function (comic) {
    for (var i = 0; i < this._comics.length; i++) {
      if (comic.equals(this._comics[i])) {
        return true;
      }
    }
    return false;
  };

  Comics.prototype.intersection = function (otherComics) {
    var intersection = [];
    for (var i = 0; i < this._comics.length; i++) {
      if (otherComics.contains(this._comics[i])) {
        intersection.push(this._comics[i]);
      }
    }
    return intersection;
  };

  Comics.create = function (comics) {
    return new Comics(comics);
  };

  Comics.intersection = function (comics1, comics2) {
    return comics1.intersection(comics2);
  };

  return Comics;
}());