$(document).on('ready', function () {

  var characters = api.characters();
  for (var i = 0; i < characters.length; i++) {
    $('#personaje1').append("<option value=\"" + characters[i].id + "\">" + characters[i].name + "</option>");
    $('#personaje2').append("<option value=\"" + characters[i].id + "\">" + characters[i].name + "</option>");
  }

  $('#buscador').on('submit', function (e) {
    e.preventDefault();
    $('#resultados tbody').html("");

    if ($('#personaje1').val() === $('#personaje2').val())
      throw Error("Los personajes son iguales");

    api.comics($('#personaje1').val(), function (comics1) {
      api.comics($('#personaje2').val(), function (comics2) {
        var ambos = [];

        for (var i = 0; i < comics1.length; i++) {
          for (var j = 0; j < comics2.length; j++) {
            if (comics1[i].id === comics2[j].id) {
              ambos.push(comics1[i]);
            }
          }
        }

        for (var i = 0; i < ambos.length; i++) {
          $('#resultados tbody').append('<tr><td>' + ambos[i].id + '</td><td>' + ambos[i].title + '</td><td>' + ambos[i].characters + '</td></li>');
        }
      });
    });
  });

});