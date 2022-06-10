const express = require('express');
const server = express()
const PORT = 4002;
const postTask = require("./routes/postTask");
const getTask = require('./routes/getTask')
const patchTask = require('./routes/patchTask')
const deleteTask = require('./routes/deleteTask')


const cors = require('cors')
server.use(express.json());
server.use(cors())
server.use("/postTask", postTask);
server.use('/getTask', getTask)
server.use('/patchTask', patchTask)
server.use('/deleteTask', deleteTask)
server.use(function(err, req, res, next){
    res.status(err.code).send({resp: {
        message: err.message,
        status: err.code
    }})
})
server.listen(process.env.PORT || PORT, () => {
    console.log(`Server start ${new Date} on port ${PORT}`);
})
