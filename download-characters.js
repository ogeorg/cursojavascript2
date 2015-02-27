var fs = require('fs'),
    http = require('http'),
    md5 = require('crypto-js/md5'),
    q = require('q');

function get(page) {
  var defer = q.defer(),
      privateKey = process.argv[2],
      publicKey = process.argv[3],
      ts = new Date().getTime(),
      hash = md5(ts + privateKey + publicKey),
      options = {
        hostname: 'gateway.marvel.com',
        port: 80,
        path: '/v1/public/characters?offset=' + (page * 100) + '&limit=100&ts=' + ts + '&hash=' + hash + '&apikey=' + publicKey,
        method: 'GET'
      };

  http.get(options, function (response) {
    var buffer = "";
    response.setEncoding('utf8');
    response.on('data', function (data) {
      buffer += data;
    });
    response.on('end', function () {
      console.log("HTTP GET COMPLETE");
      defer.resolve(JSON.parse(buffer).data);
    });
  }).on('error', function (e) {
    defer.reject(e);
  });

  return defer.promise;
}

function write(something) {
  var defer = q.defer();
  fs.writeFile("data/characters.json", JSON.stringify(something, null, ' '), function (err) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve();
    }
  });
  return defer.promise;
}

q.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    .map(get))
    .then(function (pages) {
      return pages
          .reduce(function (accum, page) {
            return accum.concat(page.results);
          }, [])
          .map(function (character) {
            return {
              id: character.id,
              name: character.name
            };
          });
    })
    .then(write)
    .then(function () {
      console.log("SUCCESS");
    }, function (error) {
      console.log("ERROR: ", error);
    });
