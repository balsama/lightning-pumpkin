var express = require('express');
var app = express();
var request = require('request');
var baseurl = 'http://headlessnightlyth3vcdx4ci.devcloud.acquia-sites.com';
var getblocks = '/jsonapi/block/block';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Get block information from Nightly Build (available to anon users)
request({
    url: baseurl + getblocks,
    json: true
}, function (error, response, body) {

  if (!error && response.statusCode === 200) {
    var blocks_all = body;
  }

  // Convert response into array.
  var blocks = [];
  blocks_all.data.forEach(function(item) {
    blocks.push(item);
  });

  // Make available to templates as a global var.
  app.locals.blockdata = blocks;

});
