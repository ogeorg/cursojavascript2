$(document).on('ready', function () {

  var view = View($('.container'));

  view.addCharacters(api.characters());

  view.onsubmit(function (ids) {
    $.when(api.comics(ids.char1), api.comics(ids.char2))
        .done(function (comics1, comics2) {
          var intersection = [];

          for (var i = 0; i < comics1[0].length; i++)
            for (var j = 0; j < comics2[0].length; j++)
              if (comics1[0][i].id === comics2[0][j].id)
                intersection.push(comics2[0][i]);

          view.renderResults(intersection);
        });
  });
});