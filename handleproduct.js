//this is handleproduct.js
const express = require('express'),
  app = express(),
  session = require('express-session');
//user defined module
const schema = require("./Schemas.js");

exports.handleProd = function(req,res){
    if (req.body.action == 'Buy'){
        let conditions={productId: req.body.product},update={$inc:{remain:-1}}
        schema.Product.updateOne(conditions, update, (err,e)=>{
            if (err){
                res.send(err);
            }

            else{
                schema.Product.findOne(conditions,(err,e)=>{
                    if (err){
                        res.send(err);
                    }
                    else{
                        schema.User.findOne({email:req.session.user},(err,f)=>{
                            if (err){
                                res.send(err);
                            }
                            else{
                                schema.History.create({
                                    buyer: f._id,
                                    product: e._id,
                                    quantity: 1,
                                    date: Date()
                                },(err,g)=>{
                                    if (err){
                                        res.send(err);
                                    }
                                    else{
                                        res.redirect('/purchasehistory');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    else if(req.body.action == 'Delete'){
        schema.Product.findOne({ productId: req.body.product}).remove((err,e)=>{
            if (err){
                res.send(err);
            }
            else if(e.deletedCount == 0){
                alert("Error : Nothing deleted");
                res.redirect('/home');
            }
            else{
                res.redirect('/home');
            }
        });
    }
    else{
        res.send("Error: unknown action");
    }
};
