var express = require('express');
var Fournisseurs = require('../models/fournisseur');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Fournisseurs.find(function(err, fournisseurs){
		res.render('fournisseurs', {user: req.user, title: "Fournisseurs", fournisseurs: fournisseurs});
	});

});


router.get('/add', isAuthenticated, function(req, res, next) {
  res.render('addfournisseur', {user: req.user, title: "Fournisseur", fournisseurs: null, mode:"add"});
});

router.post('/add', isAuthenticated, function(req, res, next){
	var fournisseur = new Fournisseurs();

	fournisseur.code = req.body.code;
	fournisseur.raisonsocial = req.body.raisonsocial;
	fournisseur.phone = req.body.phone;
	fournisseur.email = req.body.email;
	fournisseur.address = req.body.address;


	fournisseur.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/fournisseurs');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Fournisseurs.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/fournisseurs');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){
			Fournisseurs.findById(req.params.id, function(err, fournisseur){
				res.render('editfournisseur', {user: req.user, title: "Fournisseurs", fournisseurs: fournisseur, mode:"edit"});
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Fournisseurs.findById(req.params.id, function (err, fournisseurs) {
					fournisseurs.update({
										code: req.body.code,
										raisonsocial: req.body.raisonsocial,
										phone: req.body.phone,
										address: req.body.address,
										email: req.body.email
									},function (err, fournisseursID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/fournisseurs');
													}else{
														res.redirect("/fournisseurs/edit/" + fournisseurs._id);
													}
										})

					});

});






module.exports = router;
