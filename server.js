const express = require('express');
const server = express()
const PORT = 4002;
const things = require("./routes/things");
const  {  v4 : uuidv4  }  =  require ( 'uuid' );

const { join } = require('path');

const path = require('path');



server.use(express.json());
server.use("/things", things);

server.get('/', (req, res) => {
    
})

server.listen(PORT)
