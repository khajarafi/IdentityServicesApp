let express = require('express');
let mongoose = require('../mongodb/Connections');
let router = express.Router();
let logger = require('../logger')
let utils = require('../routes/Utils')
let userProfile = require('../mongodb/schemas/UserProfile');
mongoose.promise = global.promise;

//http://localhost:8080/userLogin
router.post('/', function (req, res) {
    let input = req.body;
    console.log(input);
    let response = { statusCode: 1, statusMessage: "success" }
    userValidation(input, response)
    if (response.statusCode != 0) {
        userProfile.findOne({ email: input.email }, function (err, userprofile) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            else if (userprofile) {
                let tempProfile = userprofile.toObject()
                tempProfile.userId = userprofile._id
                //tempProfile.username = tempProfile.username
                delete tempProfile._id
                console.log('Already Registered User');
                res.json({ statusCode: 1, statusMessage: 'Already Registered User', data: tempProfile })
            }
             else {
                let userprofile1 = new userProfile({})
                userprofile1.email = input.email
                userprofile1.firstName = input.firstName
                userprofile1.lastName = input.lastName
                userprofile1.userName = input.userName
                userprofile1.password = input.password
                userprofile1.gender = input.gender
                userprofile1.country = input.country
                userprofile1.createdDateTime = utils.dateInUTC()
                saveUser(userprofile1, res);
            }
        });
    }else{
        res.send(response)
    }
});

let saveUser = function (userprofile, res) {
    userprofile.save(function (err, userdata) {
        if (err) {
            logger.debug('userprofile save Error');
            res.json({ statusCode: 0, statusMessage: "something went wrong" })
        }
       let tempUserProfile = userprofile.toObject()
       tempUserProfile.userId = userdata._id
       delete tempUserProfile._id
        res.json({ statusCode: 1, statusMessage: 'New User', data: tempUserProfile })
    })
}

function userValidation(input, response) {
    if (utils.isStringBlank(input.email)) {
        response.statusCode = 0; response.statusMessage = "email is Mandatory"
    } 
    else if(utils.isStringBlank(input.firstName)) {
        response.statusCode = 0; response.statusMessage = "firstName is Mandatory"
    }
    else if(utils.isStringBlank(input.lastName)) {
        response.statusCode = 0; response.statusMessage = "lastName is Mandatory"
    }
     else if(utils.isStringBlank(input.userName)) {
        response.statusCode = 0; response.statusMessage = "userName is Mandatory"
    }
    else if(utils.isStringBlank(input.password)) {
        response.statusCode = 0; response.statusMessage = "password is Mandatory"
    }
    else if(utils.isStringBlank(input.gender)) {
        response.statusCode = 0; response.statusMessage = "gender is Mandatory"
    }
    else if(utils.isStringBlank(input.country)) {
        response.statusCode = 0; response.statusMessage = "country is Mandatory"
    }
}

module.exports = router;
