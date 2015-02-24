var fs = require('fs'),
    http = require('http'),
    md5 = require('crypto-js/md5'),
    q = require('q');

// http://gateway.marvel.com:80/v1/public/characters/{charId}/comics?apikey=ae8d94a84e725be1d26ff19b89b1b0ab
// ts - a timestamp (or other long string which can change on a request-by-request basis)
// hash - a md5 digest of the ts parameter, your private key and your public key (e.g. md5(ts+privateKey+publicKey)

function get(page) {
  var request = require('requestretry');

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

  //options = {
  //  hostname: 'gateway.marvel.com',
  //  port: 80,
  //  path: '/v1/public/characters/' + process.argv[4] + '/comics?offset=' + (page * 100) + '&limit=100&ts=' + ts + '&hash=' + hash + '&apikey=' + publicKey,
  //  method: 'GET'
  //};

  //http.get(options, function (response) {
  //  var buffer = "";
  //  response.setEncoding('utf8');
  //  response.setTimeout(0);
  //  response.on('data', function (data) {
  //    process.stdout.write('.');
  //    buffer += data;
  //  });
  //  response.on('end', function () {
  //    console.log("HTTP GET OF PAGE " + page + " COMPLETE");
  //    defer.resolve(JSON.parse(buffer).data);
  //  });
  //}).on('error', function (e) {
  //  defer.reject(e);
  //});

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
