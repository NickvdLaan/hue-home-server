var properties = require('./hueProperties');
var request = require('request');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 8090;
  var bodyParser = require('body-parser');
const bridgeIP = properties.bridgeIP;
const username = properties.username;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/api/:hueFunction', function (req, res) {
  if (req.body.username != username) {
    console.log(req.body);
    res.status(403);
    res.send("Access forbidden. username not correct")
  }
  if (!req.params.hueFunction) {
   res.status(500);
   res.send({"Error": "Looks like you are not sending the product id to get the product details."});
   console.log("Looks like you are not sending the hueFunction.");
 }
 const options = {
  url: "http://" + bridgeIP + "/api/" + username + "/" + req.params.hueFunction,
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      }
  };
 request.get(options, function(error, response, body) {
      res.send(JSON.parse(body));
 });
})
app.post('/api/:hueFunction/:hueMethod', function (req, res) {
  if (req.body.username != username) {
    console.log(req.body);
    res.status(403);
    res.send("Access forbidden. username not correct")
  }
  if (!req.params.hueFunction || !req.params.hueMethod) {
   res.status(500);
   res.send({"Error": "Looks like you are not sending the product id to get the product details."});
   console.log("Looks like you are not sending the hueFunction.");
 }
 const options = {
  url: "http://" + bridgeIP + "/api/" + username + "/" + req.params.hueFunction + "/" + req.params.hueMethod,
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      }
  };
 request.get(options, function(error, response, body) {
      res.status(response.statusCode).send(JSON.parse(body));
 });
})

app.listen(port);

console.log('hue RESTful API server started on: ' + port);
