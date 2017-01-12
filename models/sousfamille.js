var mongoose = require('mongoose');

module.exports = mongoose.model('Sousfamille',{
	code: String,
	nom: String,
	famille: String,
	observation: String
});
