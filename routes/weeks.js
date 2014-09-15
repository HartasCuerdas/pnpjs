var Week = require('../models/week').Week;
      
exports.index = function(req, res) {
  Week.find({}, function(err, docs) {
    if(!err) {
      res.status(200).json({ weeks: docs });
    } else {
      res.status(500).json({ message: err });
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
          res.status(201).json({ message: "Week created with name: " + newWeek.name });
        } else {
          res.status(500).json({ message: "Could not create week. Error: " + err });
        }
      
      });
      
    } else if(!err) {
      
      // User is trying to create a workout with a name that
      // already exists.
      res.status(403).json({ message: "Week with that name already exists, please update instead of create or create a new week with a different name." });
      
    } else {
      res.status(500).json({ message: err});
    }
  });
      
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the week the user wants to look up.
  Week.findById(id, function(err, doc) {
    if(!err && doc) {
      res.status(200).json(doc);
    } else if(err) {
      res.status(500).json({ message: "Error loading week." + err });
    } else {
      res.status(404).json({ message: "Week not found." });
    }
  });
}

exports.delete = function(req, res) {
      
  var id = req.body.id;
  Week.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.status(200).json({ message: "Week removed." });
    } else if(!err) {
      res.status(404).json({ message: "Could not find week." });
    } else {
      res.status(403).json({ message: "Could not delete week. " + err });
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.id;
  var week_name = req.body.week_name;
  var week_description = req.body.week_description;
      
  Week.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = week_name;
        doc.description = week_description;
        doc.save(function(err) {
          if(!err) {
            res.status(200).json({ message: "Week updated: " + week_name });
          } else {
            res.status(500).json({ message: "Could not update week. " + err });
          }
        });
      } else if(!err) {
        res.status(404).json({ message: "Could not find week." });
      } else {
        res.status(500).json({ message: "Could not update week. " + err });
      }
    });
}
