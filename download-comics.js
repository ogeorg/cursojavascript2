var fs = require('fs'),
    request = require('requestretry'),
    md5 = require('crypto-js/md5'),
    q = require('q');

function get(page) {
  console.log("GETTING PAGE " + page);
  var defer = q.defer(),
      privateKey = process.argv[2],
      publicKey = process.argv[3],
      ts = new Date().getTime(),
      hash = md5(ts + privateKey + publicKey);

  request({
    url: 'http://gateway.marvel.com/v1/public/characters/' + process.argv[4] + '/comics?offset=' + (page * 100) + '&limit=100&ts=' + ts + '&hash=' + hash + '&apikey=' + publicKey,
    json: true,
    maxAttempts: 5,
    retryDelay: 1000,
    retryStrategy: request.RetryStrategies.HTTPOrNetworkError
  }, function (err, response, body) {
    if (err) {
      console.log("HTTP GET OF PAGE " + page + " FAILED");
      defer.reject(err);
    } else {
      console.log("HTTP GET OF PAGE " + page + " COMPLETE");
      defer.resolve(body.data);
    }
  });

  return defer.promise;
}

function write(charId) {
  return function (something) {
    var defer = q.defer();
    fs.writeFile("data/comics-" + charId + ".json", JSON.stringify(something, null, ' '), function (err) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve();
      }
    });
    return defer.promise;
  };
}

function getPages() {
  var pages = [];
  while (pages.length < parseInt(process.argv[5], 10))
    pages.push(pages.length);
  return pages;
}

q.all(getPages().map(get))
    .then(function (pages) {
      return pages
          .reduce(function (accum, page) {
            return accum.concat(page.results);
          }, [])
          .map(function (comic) {
            return {
              id: comic.id,
              title: comic.title,
              characters: comic.characters.items.map(function (character) {
                return character.name;
              })
            };
          });
    })
    .then(write(process.argv[4]))
    .then(function () {
      console.log("SUCCESS");
    }, function (error) {
      console.log("ERROR: ", error);
    });
