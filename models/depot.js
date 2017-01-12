var mongoose = require('mongoose');

module.exports = mongoose.model('Depot',{
	libelle: String,
	surface: String,
	address: String,
	phone: String
});
