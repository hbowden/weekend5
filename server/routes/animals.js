var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/nah';

router.get('/fav', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    client.query('SELECT * FROM animals ORDER BY type ASC;', function (err, result) {
      done();
      if(err) {
        console.log("ERROR: ", err);
        res.sendStatus(500);
        return;
      }

      res.send(result.rows);
      return;
    });
  });
});

router.get('/count', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {
    if(err) {
      console.log("ERROR: ", err);
      res.sendStatus(500);
      return;
    }

    client.query('SELECT COUNT (*) FROM animals;', function (err, result) {
      done();

      if(err) {
        console.log("ERROR: ", err);
        res.sendStatus(500);
        return;
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var animal = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if(err) {
      res.sendStatus(500);
      return;
    }
    client.query('INSERT INTO animals (id, type, description, url, name) ' +
        'VALUES ($1, $2, $3, $4, $5)', [animal.animalId, animal.animalType, animal.description, animal.url, animal.name],
        function(err, result) {
          done();

          if(err) {
            res.sendStatus(500);
            return;
          }
          res.sendStatus(201);
        });
    });

});


module.exports = router;
