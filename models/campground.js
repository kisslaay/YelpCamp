var mongoose    = require("mongoose");

var campgroundSchems = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ]
});

module.exports = mongoose.model("Campground", campgroundSchems);