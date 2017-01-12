var mongoose = require('mongoose');

module.exports = mongoose.model('Client',{
	code: String,
	raisonsocial: String,
	address: String,
	phone: String,
  email: String
});
