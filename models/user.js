var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	role: String,
	permissions: {
		gp: Boolean,
		gs: Boolean,
		su: Boolean
	}
});
