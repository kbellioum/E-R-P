var mongoose = require('mongoose');

module.exports = mongoose.model('Famille',{
	code: String,
	nom: String,
	observation: String
});
