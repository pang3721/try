//this is admin.js
const schema = require("./Schemas.js");


exports.displayUsers = display;
function display(req,res,message){
    schema.User.find().exec(function(err, users){
        if (err){
            res.send(err);
        }
        else{
            res.render(__dirname+'/admin.ejs',{users: users,message:message});
        }
    });
}

exports.resetPW=function(req,res){
    if (req.body.action == 'Reset'){
        let conditions={email: req.body.userToChange}, update={$set:{passWord: req.body.passwordReset}};
        schema.User.updateOne(conditions, update, (err,e)=>{
            if (err){
                res.send(err);
            }
            else if(e.modifiedCount == 0){
                display(req,res,"<p style=\"color:red\" class=\"container\">Error: none updated.</p>");
            }
            else{
                display(req,res,"<p style=\"color:green\" class=\"container\">Password of "+ req.body.userToChange +" has been updatted.</p>");
            }
        });
    }
    else if(req.body.action == 'Delete'){
        let foundUserable = schema.User.findOne({ email: req.body.userToChange, isAdmin: false });
        foundUserable.remove((err,e)=>{
            if (err){
                res.send(err);
            }
            else if(e.deletedCount == 0){
                display(req,res,"<p style=\"color:red\" class=\"container\"> Error: none deleted. Note: You cannot delete an admin.</p>");
            }
            else{
                console.log(e);
                display(req,res,"<p style=\"color:green\" class=\"container\"> Delete successful.</p>");
            }
        });
    }
    else
    display(req,res,"<p style=\"color:red\" class=\"container\"> Error: unknown action.</p>");
}
