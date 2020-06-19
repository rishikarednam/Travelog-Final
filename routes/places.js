var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Place = require("../models/place");


router.get("/places",isLoggedIn,function(req,res){
	Place.find({},function(err,allPlaces){
		if(err){
			console.log(err);
		} else{
			res.render("visitedlist",{places:allPlaces});
		}
	});
});


router.get("/places/bucketlist",isLoggedIn, function(req,res){
	Place.find({},function(err,allPlaces){
		if(err){
			console.log(err);
		} else{
			res.render("bucketlist",{places:allPlaces});
		}
	});
});


router.get("/places/new", isLoggedIn, function(req,res){
    res.render("new");
});


router.post("/places", isLoggedIn, function(req,res){
    var name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        isVisited = req.body.isVisited,
        isBucketlist = req.body.isBucketlist,
        username=username,
        date = req.body.date;
       
    var newPlace = { name: name, image: image, description: description, isVisited: isVisited, isBucketlist: isBucketlist, date: date, username: username }

    Place.create(newPlace, function(err, newlyCreated){
		if(err)
		{
			console.log(err)
		}else{
			res.redirect("/places");
		}
	});
});


router.get("/places/:id/show", isLoggedIn,  function(req,res){
		
    Place.findById(req.params.id,function(err, foundPlace){
            res.render("show",{place: foundPlace});
            });
    });


router.put("/places/:id", isLoggedIn, function(req,res){
    
    req.body.place.isVisited=Boolean(req.body.place.isVisited);
    req.body.place.isBucketlist=Boolean(req.body.place.isBucketlist);
	Place.findByIdAndUpdate(req.params.id,req.body.place,function(err,editedPlace){
		if(err){
            console.log(err);
			res.redirect("/places");
		} else{
            res.redirect("/places"); 
		}
	});
});

router.delete("/places/:id" , isLoggedIn,function(req,res){
	Place.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/places");
		} else{
			res.redirect("/places");
		}
	});
});

function isLoggedIn(req, res, next){	
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}

module.exports= router;