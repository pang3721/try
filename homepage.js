const express = require('express'),
    app = express();

//user defined module
const schema = require("./Schemas.js");

exports.loadHome = function(req,res){
    schema.User.findOne( {email: req.session.user}) .exec(function(err, user){    
        if (err) 
            res.send(err); 
        else{
            schema.Product.find().populate('seller').exec(function(err, products){    
                if (err) 
                    res.send(err); 
                else{
                    res.render(__dirname+'/homepage.ejs',{products: products, user:user});
                    }
            });     
            }
    });   
};
