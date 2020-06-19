var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/",function(req,res){
    res.render("landing");
});


router.post("/register",function(req,res){
    var newUser = new User({
        yname: req.body.yname,
        email: req.body.email,
        phone: req.body.phoneno,
        username: req.body.username
    });


User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("landing");
		}

		passport.authenticate("local")(req ,res, function(){
            
            res.redirect("/places");
		});
	});
});


router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/places",
		failureRedirect: "/login"
	}), function(req,res){
});


router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});


module.exports = router;