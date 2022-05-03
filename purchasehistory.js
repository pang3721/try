const schema = require("./Schemas.js");

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://CSCI3100:Ab123456@cluster0.wkhhe.mongodb.net/User?retryWrites=true&w=majority');
    
exports.displayhistory = function(req,res){
        schema.User.findOne( {email: req.session.user}).exec((err, currentuser)=>{    
            if (err) 
                return res.send(err); 
            else{
                schema.History.find({buyer:currentuser._id}).populate('product').sort({Date:-1}).exec((err,histories)=>{
                    if (err) {
                        return res.send(err); 
                    }
                    else{
                        res.render(__dirname+'/purchasehistory.ejs',{histories: histories});
                    }
                });
            }    
        });       
};
