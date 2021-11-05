const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './prod.env') });

const devMode = process.argv[2] === "dev";

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  SleepHour = require('./api/models/sleepHourModel'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;

if (devMode) {
  mongoose.connect('mongodb://localhost/SleephourDb').then(() => console.log('Connection to local database successful')); 
} else {
  mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
     auth: {
       username: process.env.COSMOSDB_USER,
       password: process.env.COSMOSDB_PASSWORD
     },
   useNewUrlParser: true,
   useUnifiedTopology: true,
   retryWrites: false
   })
   .then(() => console.log('Connection to CosmosDB successful'))
   .catch((err) => console.error(err));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var routes = require('./api/routes/sleepHourRoutes'); //importing route
routes(app); //register the route

app.listen(port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

console.log('sh RESTful API server started on: ' + port);
