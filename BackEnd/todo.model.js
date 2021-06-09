const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    task_title: {
        type: String
    },
    task_description:{
        type: String
    },
    task_priority:{
        type: String
    },
    task_completed:{
        type: Boolean
    }
})

module.exports = mongoose.model('Todo', TodoSchema)