var marvel = window.marvel || {};
marvel.bootstrap = function (rootElement) {
  var view = new marvel.View(rootElement);

  view.addCharacters(marvel.api.characters());

  view.onsubmit(function (chars) {
    var comics1 = marvel.api.comics(chars.char1);
    var comics2 = marvel.api.comics(chars.char2);

    $.when(comics1, comics2)
        .then(marvel.model.Comics.intersection)
        .then(view.renderResults);
  });
};
