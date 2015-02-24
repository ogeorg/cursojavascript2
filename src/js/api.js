var api = {
  characters: function () {
    return [
      {id: 1009610, name: "Spider-Man"},
      {id: 1009220, name: "Captain America"},
      {id: 1009368, name: "Iron Man"},
      {id: 1009718, name: "Wolverine"}
    ];
  },
  comics: function (characterId, callback) {
    return $.get('/data/comics-' + characterId + '.json', function (response) {
      callback(response);
    });
  }
};