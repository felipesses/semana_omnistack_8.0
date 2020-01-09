const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');


const server = express();

mongoose.connect(`mongodb+srv://felipe:felipe@semanaomistack-btvqt.mongodb.net/ominstack8?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
});

server.use(cors()); // pode ser utilizada em qualquer endereço
server.use(express.json());
server.use(routes);

server.listen(3333);
