$(document).on('ready', function () {

  function loadCharactersInto(chars, $personaje) {
    $personaje.append(
      chars.map(function(char) {
        return "<option value='"+char.id+"'>"+char.name+"</option>";
      })
    );
  }

  function updateTable(idChar1, nameChar2) {
    api.comics(idChar1, function(comics) {
      fillTable(
        comics.filter(function(comic) {
          return comic.characters.some(function (nameChar) {
            return nameChar == nameChar2;
          });
        })
      )
    });
  }

  function updateTable2(id1, id2) {
    api.comics(id1, function (comics1) {
      api.comics(id2, function (comics2) {
        fillTable(
          comics1.filter(function(comic1) {
            return comics2.some(function(comic2) {
              return comic1.id == comic2.id;
            });
          })
        );
      });
    });
  }

  function fillTable(comics) {
    $('#resultados').append(comics.map(function (comic) {
      return "<tr><td>"+comic.id+"</td><td>"+comic.title+"</td><td>"+comic.characters.join(', ')+"</td></tr>";
    }));
  }

  var chars = api.characters();
  loadCharactersInto(chars, $('#personaje1'));
  loadCharactersInto(chars, $('#personaje2'));

  $('#boton-buscar2').on('click', function() {
    var idChar1 = $('#personaje1').val();
    var nameChar2 = $('#personaje2 option:selected').text();
    updateTable(idChar1, nameChar2);
    return false;
  });

  $('#boton-buscar').on('click', function() {
    var idChar1 = $('#personaje1').val();
    var idChar2 = $('#personaje2').val();
    updateTable2(idChar1, idChar2);
    return false;
  });


});