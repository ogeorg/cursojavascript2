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
    return this._comics.some(function (candidate) {
      return candidate.equals(comic);
    });
  };

  Comics.prototype.intersection = function (otherComics) {
    var intersection = this._comics.filter(function (comic) {
      return otherComics.contains(comic);
    });
    return new Comics(intersection);
  };

  Comics.prototype.size = function () {
    return this._comics.length;
  };

  Comics.prototype.get = function (idx) {
    return this._comics[idx];
  };

  Comics.create = function (comics) {
    return new Comics(comics);
  };

  Comics.intersection = function (comics1, comics2) {
    return comics1.intersection(comics2);
  };

  Comics.fromJson = function (json) {
    return new Comics(json.map(marvel.model.Comic.fromJson));
  };

  return Comics;
}());