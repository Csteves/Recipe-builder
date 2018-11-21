const express = require('express'),
      bodyParser = require('body-parser'),
      config = require('./../config'),
      controller = require('./controller.js')
      app = express();

app.use(bodyParser.json());

app.get('/api',controller.read);
app.post('/api/',controller.create);
app.delete('/api/:id',controller.delete)
app.put('/api/:id',controller.update)


app.listen(config.port,()=>{
    console.log(`Im runnin on port ${config.port}`);
})