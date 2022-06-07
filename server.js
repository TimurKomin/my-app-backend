const express = require('express');
const server = express()
const PORT = 4002;
const postTask = require("./routes/postTask");
const getTask = require('./routes/getTask')
const patchTask = require('./routes/patchTask')
const arrTasks = require('./routes/postTask')
const deleteTask = require('./routes/deleteTask')
const deleteTasks = require('./routes/deleteTasks')
const checkAll = require('./routes/checkAll')

const cors = require('cors')
server.use(express.json());
server.use(cors())
server.use("/postTask", postTask);
server.use('/getTask', getTask)
server.use('/patchTask', patchTask)
server.use('/deleteTask', deleteTask)
server.use('/deleteTasks', deleteTasks)
server.use('/checkAll', checkAll)
server.listen(process.env.PORT || PORT, () => {
    console.log(`Server start ${new Date} on port ${PORT}`);
})
