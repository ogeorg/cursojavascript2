var view = (function() {
  var makeOption = function(character) {
    return "<option value='" + character + "'>" + character.name + "</option>";
  };

  var appendOption =  function(character) {
    var option = makeOption(character);
    $('#personaje1').append(option);
    $('#personaje2').append(option);
  };

  return {
    render: appendOption
  }
})();

$(document).on('ready', function () {

  function A(val) {
    this.value = val;
  }

  var a1 = new A(3);
  var a2 = A(4);
  console.log(a1, a2);

  function B(val) {
    this.value = val;
    return this;
  }

  var b1 = new B(5);
  var b2 = B(6);
  console.log(b1, b2);

  var characters = api.characters();
  for (var i = 0; i < characters.length; i++) {
    view.render(characters[i]);
  }

  $('#buscador').on('submit', function (e) {
    e.preventDefault();
    $('#resultados tbody').html("");

    if ($('#personaje1').val() === $('#personaje2').val())
      throw new Error("Los personajes son iguales");

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