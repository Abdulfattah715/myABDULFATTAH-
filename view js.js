module.exports = function(app, passport) {
    app.get('/', function(req, res){
     res.render('index.html');
    });



    //-SQL QUERY
    var express = require('express')
     , http = require('http')
     , mysql = require('mysql'); // <---- HERE

    var app = express();

    app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "http://localhost:8080"); 
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       next();
     });

    var connection = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: "password",
       database: 'db'
    });

    connection.connect(); // <---- AND HERE

    // all environments
    app.set('port', process.env.PORT || 7003);


   connection.query('SELECT * FROM testtable', function(err, rows, fields){  
      if(err) {
            console.log(err); 
            res.json({"error":true});
      }
      else { 
           //    console.log(result); 
          console.log(JSON.stringify(rows));
        //   response.writeHead(200, {'Content-Type': 'application/json'});
          res.json(rows); 
        //   response.end(JSON.stringify(rows));

      }

      });



   http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
   });

    };

