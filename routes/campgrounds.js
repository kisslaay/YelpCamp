var express = require("express");
var router  = express.Router();

var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds}); 
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newCampground = {name: name, price:price, image: image, description: desc, author: author};
    
    Campground.create(newCampground, function(err, newlyAddedCampground) {
       if(err) {
           console.log(err);
       } else {
           res.redirect("campgrounds");
       }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

router.get("/:id", function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err  || !foundCampground) {
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err  || !foundCampground) {
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});


//update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//destroy campgrounds
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;