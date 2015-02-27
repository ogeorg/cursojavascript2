var marvel = window.marvel || {};
marvel.api = (function () {
  'use strict';

  var api = {
    characters: function () {
      var json = [
        {id: 1009610, name: "Spider-Man"},
        {id: 1009220, name: "Captain America"},
        {id: 1009368, name: "Iron Man"},
        {id: 1009718, name: "Wolverine"},
        {id: 1009664, name: "Thor"},
        {id: 1009351, name: "Hulk"}
      ];
      var characters = [];
      for (var i = 0; i < json.length; i++) {
        characters.push(new marvel.model.Character(json[i].id, json[i].name));
      }
      return characters;
    },
    comics: function (charId, callback) {
      return $.get('/data/comics-' + charId + '.json', function (response) {
        var comics = [];
        for (var i = 0; i < response.length; i++) {
          comics.push(new marvel.model.Comic(response[i].id, response[i].title, response[i].characters));
        }
        callback(new marvel.model.Comics(comics));
      });
    }
  };

  return api;
}());