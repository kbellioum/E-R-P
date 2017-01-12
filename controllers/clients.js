var express = require('express');
var Clients = require('../models/client');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Clients.find(function(err, clients){
		res.render('clients', {user: req.user, title: "Clients", clients: clients});
	});

});


router.get('/add', isAuthenticated, function(req, res, next) {
  res.render('addclient', {user: req.user, title: "Client", clients: null, mode:"add"});
});

router.post('/add', isAuthenticated, function(req, res, next){
	var client = new Clients();

	client.code = req.body.code;
	client.raisonsocial = req.body.raisonsocial;
	client.phone = req.body.phone;
	client.email = req.body.email;
	client.address = req.body.address;


	client.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/clients');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Clients.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/clients');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){
			Clients.findById(req.params.id, function(err, client){
				res.render('editclient', {user: req.user, title: "Clients", clients: client, mode:"edit"});
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Clients.findById(req.params.id, function (err, clients) {
					clients.update({
										code: req.body.code,
										raisonsocial: req.body.raisonsocial,
										phone: req.body.phone,
										address: req.body.address,
										email: req.body.email
									},function (err, clientsID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/clients');
													}else{
														res.redirect("/clients/edit/" + clients._id);
													}
										})

					});

});






module.exports = router;
