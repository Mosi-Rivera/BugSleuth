const express = require('express');
const morgan = require('morgan');
const http = require('http');
const debug = require('debug')('backend:server');
const bodyParser = require('body-parser');
const ticket_routes = require('./db/routes/ticket_routes');
const project_routes = require('./db/routes/project_routes');
const auth_routes = require('./db/routes/auth_routes');
const {
    normalizePort,
    onError,
    onListening
} = require('./helpers/server');
const app = express();

require('./db/models/db');

app.use(morgan('dev'));
require('./config/passport')(app);
auth_routes(app);
ticket_routes(app);
project_routes(app);

app.use("/*",(req,res,next) => {
    res.send('express running.');
});

const port = normalizePort(process.env.PORT || '4200');
app.set('port',port);

const server = http.createServer(app);
server.listen(port);

server.on('error',onError);
server.on('listening',onListening(server));