var mongoose = require('mongoose');

module.exports = mongoose.model('Fournisseur',{
	code: String,
	raisonsocial: String,
	address: String,
	phone: String,
  email: String
});
