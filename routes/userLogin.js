var express = require('express')
var router = express.Router()
var logger = require('../logger')
var utils = require('./Utils')
var messageModel = require('../mongodb/schemas/messages')
var userProfile = require('../mongodb/schemas/UserProfile')
var ObjectId = require('mongodb').ObjectID;

router.get('/', function (req, res) {
    var input = req.query
    logger.debug(' ::: getMessages ::: ')
    var response = {
        statusCode: 1,
        statusMessage: "Success"
    }
    //messageValidation(input, response)
    if (response.statusCode != 0) {
        userProfile.find({$and:[{'userName':input.userName},{'password':input.password}]}, function (err, data) {
            if (err) {
                logger.debug('userProfileModel Error');
                logger.debug(err);
                res.json({ statussCode: 0, statusMessage: "ERROR" })
            } else if (!data) {
                logger.debug("InValid UserId");
                res.json({ statusCode: 0, statusMessage: "No User Found" })
            }
            else{
            res.json({
                statusCode: 1,
                statusMessage: "SUCCESS",
                data: data
            })
        }
})
    }
    else{
        res.json(data);
    }
})

function messageValidation(input, response) {
    if (!utils.isValidObjectID(input.userName)) {
        response.statusCode = 0;
        response.statusMessage = "InValid username"
    } 
    else if (!utils.isValidObjectID(input.password)) {
        response.statusCode = 0;
        response.statusMessage = "InValid password"
    }else if (!utils.isValidObjectID(input.userId)) {
        response.statusCode = 0;
        response.statusMessage = "InValid UserId"
    }
}

module.exports = router;