'use strict'
let mongoose = require('../Connections').db
let Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
let MessageSchema = Schema({  
   message:String,
   reciverId:{ type: Schema.Types.ObjectId, ref: 'UserProfile' },
   senderId:{ type: Schema.Types.ObjectId, ref: 'UserProfile' },
   createdDateTime: Date,
   modifiedDateTime: Date,
},{ versionKey: false , collection: "Messages" });

mongoose.model('Messages', MessageSchema);
module.exports = mongoose.model('Messages');