const express           = require('express');
const morgan            = require('morgan');
const http              = require('http');
const cors              = require('cors');
const debug             = require('debug')('backend:server');
const ticket_routes     = require('./db/routes/ticket_routes');
const project_routes    = require('./db/routes/project_routes');
const auth_routes       = require('./db/routes/auth_routes');
const worker_routes     = require('./db/routes/worker_routes');
const expressStaticGzip = require('express-static-gzip');
const path              = require('path');
const {
    normalizePort,
    onError,
    onListening
} = require('./helpers/server');
const app = express();
app.use(cors({origin: 'http://localhost:3000',credentials: true}));

require('./db/models/db');

app.use(morgan('dev'));
require('./config/passport')(app);
auth_routes(app);
ticket_routes(app);
project_routes(app);
worker_routes(app);

app.use((req, res, next) => {
    if (req.method == 'GET')
        res.set('Cache-control', 'public, max-age=31536000');
    else
        res.set('Cache-control', `no-store`);
    next()
},
expressStaticGzip(path.join(__dirname, 'build'), {
    enableBrotli: true,
   })
);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = normalizePort(process.env.PORT || '4200');
app.set('port',port);

const server = http.createServer(app);
server.listen(port);

server.on('error',onError);
server.on('listening',onListening(server));