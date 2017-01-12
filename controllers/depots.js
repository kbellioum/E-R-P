var express = require('express');
var Depots = require('../models/depot');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Depots.find(function(err, depots){
		res.render('depots', {user: req.user, title: "Depots", depots: depots});
	});

});


router.get('/add', isAuthenticated, function(req, res, next) {
  res.render('adddepot', {user: req.user, title: "Depots", depots: null, mode:"add"});
});

router.post('/add', isAuthenticated, function(req, res, next){
	var depot = new Depots();

	depot.libelle = req.body.libelle;
	depot.surface = req.body.surface;
	depot.phone = req.body.phone;
	depot.address = req.body.address;


	depot.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/depots');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Depots.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/depots');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){
			Depots.findById(req.params.id, function(err, depot){
				res.render('editdepot', {user: req.user, title: "Depots", depots: depot, mode:"edit"});
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Depots.findById(req.params.id, function (err, depots) {
					depots.update({
										libelle: req.body.libelle,
										surface: req.body.surface,
										phone: req.body.phone,
										address: req.body.address
									},function (err, depotsID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/depots');
													}else{
														res.redirect("/depots/edit/" + depots._id);
													}
										})

					});

});






module.exports = router;
