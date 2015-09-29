var api = {
  characters: function () {
    var characters = [
      {id: 1009610, name: "Spider-Man"},
      {id: 1009220, name: "Captain America"},
      {id: 1009368, name: "Iron Man"},
      {id: 1009718, name: "Wolverine"},
      {id: 1009664, name: "Thor"},
      {id: 1009351, name: "Hulk"}
    ];
    return characters.map(function (json) {
      return new Character(json.id, json.name);
    });
  },
  comics: function (characterId) {
    return $.get('/data/comics-' + characterId + '.json');
  }
};