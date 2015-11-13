var mongoose = require('mongoose')

var methods = require('./../controllers/controller.js')
module.exports = function(app){
	app.post('/user/create', function(req, res){
		methods.createUser(req, res);
	})
	app.post('/appointment/create', function(req, res){
		methods.createAppointment(req, res);
	})
	app.get('/appointment/fetch', function(req, res){
		methods.fetchAppointments(req, res);
	})
	app.post('/appointment/destroy', function(req, res){
		methods.deleteAppointment(req, res);
	})
}