const express = require('express');
// const apiRoute = require('./routes/api');
const app = express();
app.get('/', function(req, res){
	res.send('hello world')
});

app.use('/api', apiRoute);
app.listen('3000');