'use strict'
let mongoose = require('../Connections').db
let Schema = mongoose.Schema;

let UserSchema = Schema({  
   firstName:String,
   lastName:String,
   userName:{ type: String,unique:true},
   password:{type: String,unique:true},
   email : { type: String,unique:true},
   gender: String,
   country: String,
   createdDateTime: Date,
   modifiedDateTime: Date,
},{ versionKey: false , collection: "UserProfile" });

mongoose.model('UserProfile', UserSchema);
module.exports = mongoose.model('UserProfile');