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