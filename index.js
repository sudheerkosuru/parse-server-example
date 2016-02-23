// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://mongodbparse:mongoDBparse*123@ds062898.mongolab.com:62898/demoparse',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'Q3Fl3GUl7OwduaIdPW5HTwTyxRr48r8QG7uDRXyY',
  masterKey: process.env.MASTER_KEY || 'By9rsjZEH3dawmjThI1oC9m5eDXsKoLQIujJAA97' //Add your master key here. Keep it secret!
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Hosted Parse Server in Azure.');
});

var port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
