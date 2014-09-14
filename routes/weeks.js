var Week = require('../models/week').Week;
      
exports.index = function(req, res) {
  Week.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { weeks: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.create = function(req, res) {
      
  var week_name = req.body.week_name; // Name of week.
  var description = req.body.week_description; // Description of the week
      
  Week.findOne({ name: { $regex: new RegExp(week_name, "i") } },
  function(err, doc) { // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newWeek= new Week();
      
      newWeek.name = week_name;
      newWeek.description = description;
      
      newWeek.save(function(err) {
      
        if(!err) {
          res.json(201, {message: "Week created with name: " + newWeek.name });
        } else {
          res.json(500, {message: "Could not create week. Error: " + err});
        }
      
      });
      
    } else if(!err) {
      
      // User is trying to create a workout with a name that
      // already exists.
      res.json(403, {message: "Week with that name already exists, please update instead of create or create a new week with a different name."});
      
    } else {
      res.json(500, { message: err});
    }
  });
      
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the week the user wants to look up.
  Week.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading week." + err});
    } else {
      res.json(404, { message: "Week not found."});
    }
  });
}