var express = require('express');
var Familles = require('../models/famille');
var Sousfamilles = require('../models/sousfamille');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Familles.find(function(err, familles){
		res.render('familles', {user: req.user, title: "Familles", familles: familles});
	});

});


router.get('/add', isAuthenticated, function(req, res, next) {
  res.render('addfamille', {user: req.user, title: "Famille", familles: null, mode:"add"});
});

router.post('/add', isAuthenticated, function(req, res, next){
	var famille = new Familles();

	famille.code = req.body.code;
	famille.nom = req.body.nom
	famille.observation = req.body.observation;


	famille.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/familles');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Familles.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/familles');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){
			Familles.findById(req.params.id, function(err, famille){
				res.render('editfamille', {user: req.user, title: "Familles", familles: famille, mode:"edit"});
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Familles.findById(req.params.id, function (err, familles) {
					familles.update({
										code: req.body.code,
										nom: req.body.nom,
										observation: req.body.observation
									},function (err, famillesID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/familles');
													}else{
														Sousfamilles.update({famille: req.body.oldfamille},
															{ famille: req.body.nom },{ multi: true },
															function(err, data){
															if (err) {
																		console.log('GET Error: There was a problem retrieving: ' + err);
																	 	res.redirect('/familles');
															    }
																	else {
															        res.redirect("/familles/edit/" + familles._id);
															    }
														});

													}
										});

					});

});



module.exports = router;
