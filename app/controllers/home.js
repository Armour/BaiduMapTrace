(function() {
	var Car, express, mongoose, router, bodyParser;
	express = require('express');
	mongoose = require('mongoose');
	router = express.Router();

	Car = mongoose.model('Car');

	module.exports = function(app) {
		return app.use('/', router);
	};

	router.get('/', function(req, res, next) {
		res.render('index', {
			title: 'Car',
		});
		var thor = new Car({
			Source: "wa!",
			Time: "2",
		});
		thor.save(function(err, thor) {
			if (err) return console.error(err);
			console.log(thor);
		});
		return console.log('hi');
	});

	router.get('/search', function(req, res, next) {
		/*var dataID = req.body.id,
			dataTime1 = req.body.time1,
			dataTime2 = req.body.time2;
		*/
		return Car.find({
				Source: "wa!", //dataID,
				Time: {
					$gte: "1", //dataTime1,
					$lt: "3" //dataTime2
				}
			},
			function(err, carData) {
				if (err) {
					return next(err);
				}
				/*console.log(dataID);
				console.log(dataTime1);
				console.log(dataTime2);*/
				console.log(carData);
				console.log(JSON.stringify(carData));
				res.render('map', {
					title: 'Car',
					position: carData,
				});
			});
	});

}).call(this);
