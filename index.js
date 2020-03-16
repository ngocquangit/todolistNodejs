const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var db = require('./db');
var controller = require('./controllers/index.controller');
const port = 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('views'));

app.get('/', controller.index);

app.post('/create', controller.create);
app.get('/delete/:id', controller.delete);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
