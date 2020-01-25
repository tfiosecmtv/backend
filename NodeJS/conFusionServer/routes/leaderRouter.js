const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/').get((req,res,next) => {
	Leaders.find({})
	.then((leaders) => {
		console.log("Everything's FINE");
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(leaders);
	}, (err) => next(err))
	.catch((err) => next(err));
}).post((req,res,next) => {
	Leaders.create(req.body)
	.then((leaders) => {
		console.log('Leader Created ', leaders);
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(leaders);

	}, (err) => next(err))
	.catch((err) => next(err));
}).put((req,res,next) => {
	res.statusCode = 403; //403 - operation is not supported
	res.end('PUT operation is not supported');
}).delete((req,res,next) => {
	Leaders.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

leaderRouter.route('/:leaderId').get((req, res, next) => {
	Leaders.findById(req.params.leaderId)
	.then((leader) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(leader);
	}, (err) => next(err))
	.catch((err) => next(err));
}).post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation is not supported');
}).put((req, res, next) => {
	Leaders.findByIdAndUpdate(req.params.leaderId, {
		$set: req.body
	}, {new: true})
	.then((leader) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(leader);
	}, (err) => next(err))
	.catch((err) => next(err));
	
}).delete((req, res, next) => {
	Leaders.findByIdAndRemove(req.params.leaderId)
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});


module.exports = leaderRouter;

