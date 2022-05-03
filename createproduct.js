//this is createproduct.js
const fs = require('fs'),
  express = require('express'),
  app = express(),
  path = require("path");

const schema = require("./Schemas.js");

exports.createProduct =  function(req, res) {
  schema.Product.findOne()
    .sort({ productId: -1 })
    .exec((err,e)=>{
      if (err)
      res.send(err);
      else{
        schema.User.findOne({email:req.session.user})
        .exec((err,f)=>{
          if (err)
          res.send(err);
          else if(f == null){
            res.send("error: user does not exist");
          }
          else{
            if(e == null)
              newId = 0;
            else
              newId = e.productId+1;
            postUserId = f._id;
            schema.Product.create({
              productId: newId,
              name: req.body.productname,
              remain: req.body.quantity,
              price: req.body.price,
              seller: f._id,
              picture: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: req.file.mimetype
              },
              contact: req.body.contact
            },(err,g)=>{
              if (err) 
                res.send(err);
              else
                console.log("1 product inserted");
                res.redirect("home");
            });
          }
        });
      }
    });
  };

