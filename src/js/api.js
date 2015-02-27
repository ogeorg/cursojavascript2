var marvel = window.marvel || {};
marvel.api = (function () {
  'use strict';

  var api = {
    characters: function () {
      return[
        {id: 1009610, name: "Spider-Man"},
        {id: 1009220, name: "Captain America"},
        {id: 1009368, name: "Iron Man"},
        {id: 1009718, name: "Wolverine"},
        {id: 1009664, name: "Thor"},
        {id: 1009351, name: "Hulk"}
      ].map(marvel.model.Character.fromJson);
    },
    comics: function (charId) {
      return $.get('/data/comics-' + charId + '.json')
          .then(marvel.model.Comics.fromJson);
    }
  };

  return api;
}());