var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Camp under sun",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "bla bla bla"
    },
    {
        name: "Camp on grass",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "bla bla bla"
    },
    {
        name: "Camp with people",
        image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
        description: "bla bla bla"
    }
];

function seedDB() {
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground){
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground!");
                    Comment.create({
                        text: "this place is good. wish we had internet.",
                        author: "Homer"
                    }, function(err, comment){
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    });
                }
            });
        });
    }
})}

module.exports = seedDB;