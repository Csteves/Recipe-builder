const express = require('express'),
      bodyParser = require('body-parser'),
      config = require('./../config'),
      controller = require('./controller.js')
      app = express();

app.use(bodyParser.json());

app.get('/api',controller.read);



app.listen(config.port,()=>{
    console.log(`Im runnin on port ${config.port}`);
})