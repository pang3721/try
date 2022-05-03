/*
     module to change password in backend
     module name: changepassword
     
     programmer: cheng yee han, wong ngou shan
     version: 2.0 (11 April 22)
*/

const schema = require("./Schemas.js");
const session = require('express-session');
const path = require("path");


exports.changepassword =  function(req, res) {
  //find user by email for changing password
  schema.User.findOne( {email: req.session.user} ,(err,user)=>{
        if(err) return res.send(err);
        //comparing old and new password, and comparing new and confirm password 
        if(req.body.current == user.passWord && req.body.new==req.body.confirm){
            user.passWord = req.body.new;
            user.save();
            req.session.destroy();
            res.render(path.join(__dirname + '/toLogin.ejs'),{message:"<h1>Password Updated!</h1><p>A re-login is required.</p>"});
        }
        else{
           //display error message
            res.render(path.join(__dirname + '/changepassword.ejs'),{message:"<p style=\"color:red\">Sorry, but it seems that the old password is not correct or the confirmation does not match. Please try again.</p>"});
        }
    });
  };
