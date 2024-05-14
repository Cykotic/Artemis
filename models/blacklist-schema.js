const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    userID: {
        type: String
    },
    guildID: {
        type: String
    }
    
})

module.exports = mongoose.model('blacklist', Schema)