var marvel = window.marvel || {};
marvel.bootstrap = function (rootElement) {
  var view = new marvel.View(rootElement);

  view.addCharacters(marvel.api.characters());

  view.onsubmit(function (chars) {
    marvel.api.comics(chars.char1, function (comics1) {
      marvel.api.comics(chars.char2, function (comics2) {
        var interseccion = comics1.intersection(comics2);
        view.renderResults(interseccion);
      });
    });
  });
};
