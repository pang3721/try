const express = require('express'),
    app = express();

//user defined module
const schema = require("./Schemas.js");

exports.myProfile = function(req,res){
    schema.User.findOne( {email: req.session.user}) .exec(function(err, user){    
        if (err) 
            res.send(err); 
        else{
            res.render(__dirname+'/myprofile.ejs',{user: user});
            }
    });  
};
