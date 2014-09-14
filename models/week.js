var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var weekSchema = new Schema({
    name : { type: String, required: true, trim: true,
index: { unique: true } }
  , description : { type: String, required: true }
  , date_created : { type: Date, required: true, default: Date.now
}
});
      
var week = mongoose.model('week', weekSchema);
      
module.exports = {
  Week: week
};
