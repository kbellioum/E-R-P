var express = require('express');
var Sousfamilles = require('../models/sousfamille');
var Familles = require('../models/famille');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res, next) {
  Sousfamilles.find(function(err, sousfamilles){
			res.render('sousfamilles', {user: req.user, title: "Sous familles", sousfamilles: sousfamilles});
	});

});


router.get('/add', isAuthenticated, function(req, res, next) {
	Familles.find(function(err, familles){
  	res.render('addsousfamille', {user: req.user, title: "Sous famille", sousfamilles: null, mode:"add", familles: familles});
	});
});

router.post('/add', isAuthenticated, function(req, res, next){
	var sousfamille = new Sousfamilles();

	sousfamille.code = req.body.code;
	sousfamille.nom = req.body.nom;
	sousfamille.famille = req.body.famille.split("|")[0].trim();
	sousfamille.observation = req.body.observation;


	sousfamille.save(function(err) {
					if (err){
					    res.send(err);
					    }
					else {
					    res.redirect('/sousfamilles');
					    }
					});
});


router.get('/delete/:id', isAuthenticated, function(req, res, next){

        Sousfamilles.remove({
          _id: req.params.id
        }, function(err, users) {
          if (err)
            res.send(err);
					res.redirect('/sousfamilles');
        });

});

router.get('/edit/:id', isAuthenticated, function(req, res, netx){
			Sousfamilles.findById(req.params.id, function(err, sousfamille){
				Familles.find(function(err, familles){
					res.render('editsousfamille', {user: req.user, title: "sousfamilles", sousfamilles: sousfamille, mode:"edit", familles: familles});
				});
			});
});

router.post('/edit/:id', isAuthenticated, function(req, res, next){

	Sousfamilles.findById(req.params.id, function (err, sousfamilles) {
					sousfamilles.update({
										code: req.body.code,
										nom: req.body.nom,
										famille: req.body.famille,
										observation: req.body.observation
									},function (err, sousfamillesID){
													if(err){
														console.log('GET Error: There was a problem retrieving: ' + err);
														res.redirect('/sousfamilles');
													}else{
														res.redirect("/sousfamilles/edit/" + sousfamilles._id);
													}
										})

					});

});



module.exports = router;
