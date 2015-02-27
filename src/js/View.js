var marvel = window.marvel || {};
marvel.View = (function () {
  'use strict';

  function View(rootElement) {
    var dom = {
          form: $('#buscador'),
          char1: $(rootElement).find('#personaje1'),
          char2: $(rootElement).find('#personaje2'),
          results: $(rootElement).find('#resultados').find('tbody'),
          charOption: function (character) {
            return "<option value=\"" + character.getId() + "\">" + character.getName() + "</option>"
          },
          comicRow: function (comic) {
            return '<tr><td>' + comic.getId() + '</td><td>' + comic.getTitle() + '</td><td>' + comic.getCharacters() + '</td></li>'
          }
        },
        callbacks = {
          onsubmit: undefined
        };

    function submit() {
      if (dom.char1.val() === dom.char2.val())
        throw Error("Los personajes son iguales");
      if (!callbacks.onsubmit)
        throw Error("No onsubmit callback defined");
      callbacks.onsubmit({
        char1: dom.char1.val(),
        char2: dom.char2.val()
      });
    }

    function addCharacters(characters) {
      characters
          .map(dom.charOption)
          .forEach(function (option) {
            dom.char1.append(option);
            dom.char2.append(option);
          });
    }

    function onsubmit(callback) {
      callbacks.onsubmit = callback;
    }

    function clearResults() {
      dom.results.html("");
    }

    function renderResults(comics) {
      clearResults();
      comics.all()
          .map(dom.comicRow)
          .forEach(function (row) {
            dom.results.append(row);
          });
    }

    dom.form.on('submit', function (e) {
      e.preventDefault();
      submit();
    });

    return {
      submit: submit,
      onsubmit: onsubmit,
      addCharacters: addCharacters,
      renderResults: renderResults
    }
  }

  return View;
}());