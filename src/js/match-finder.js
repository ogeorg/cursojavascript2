$(document).on('ready', function () {

  var view = View($('.container'));

  view.addCharacters(api.characters());

  view.onsubmit(function (ids) {
    $.when(api.comics(ids.char1), api.comics(ids.char2))
        .done(function (comics1, comics2) {
          var intersection = [];

          for (var i = 0; i < comics1.length; i++) {
            var c1 = comics1[i];
            for (var j = 0; j < comics2.length; j++) {
              var c2 = comics2[j];
              if (c1.getId() === c2.getId()) {
                intersection.push(c1);
                break;
              }
            }
          }

          view.renderResults(intersection);
        });
  });
});