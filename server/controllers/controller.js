var mongoose = require('mongoose')
var User = mongoose.model('User')
var Appointment = mongoose.model('Appointment')

module.exports = (function(){
	return{
		createUser: function(req, res){
			console.log('req.body@createUser',req.body)
			var user = new User({
				name:req.body.user_info.name
			})
			console.log(user);
			req.session.curr = {};
			req.session.curr.id = user._id;
			user.save(function(err){
				if(err){
					console.log('Error@createUser', err)
					return res.json({})
				}
				else{
					console.log('Added User')
					res.json({})
				}
			})
		},
		createAppointment: function(req, res){
			console.log('req.body@createAppointment', req.body.info)
			Appointment.find({date:req.body.info.date}, function(err, results){
				if(err){
					console.log('Error finding appoint', err)

				}
				else{
					console.log(results)
					for(var i = 0; i < results.length; i++){
						console.log(i);
						if(results[i]._user == req.session.curr.id){
							return res.json('You have already made an appointment for this day')
						}
						else if(i > 1){
							console.log('too many')
							return res.json('There are already 3 appointments for that date')

						}
					}
					User.findOne({_id: req.session.curr.id}, function(err, user){
				var appointment = new Appointment({
					_user:user._id,
					user:user.name,
					date:req.body.info.date,
					time:req.body.info.time,
					complain:req.body.info.complain
				})
				user.appointments.push(appointment);
				appointment.save(function(err){
					if(err){
						console.log('Error@appointmentsave', err.errors.complain.properties.message)
						return res.json(err.errors.complain.properties.message);
					}
					else{
						user.save(function(err){
							if(err){
								console.log('Error@savinguser', err)
							}
							else{
								console.log('Added Appointment')
								return res.json('Appointment Added')
							}
						})
					}
				})
			})
				}
			})
			
			
		},
		fetchAppointments: function(req, res){
			Appointment.find({date:{$gte:new Date()}}, function(err, results){
				if(err){
					console.log('Error@fetching', err)
				}
				else{
					console.log('Successfull fetch', results)
					res.json(results);
				}
			})
		},
		deleteAppointment: function(req, res){
			console.log(req.body.info)
			Appointment.find({_id:req.body.info}, function(err, results){
				if(err){
					console.log('Error@delete', err)

				}
				else{
					console.log('results', results)
					console.log('results._user', results[0]._user)
					console.log('session id', req.session.curr.id)
					if(results[0]._user == req.session.curr.id){
						console.log('If?')
						Appointment.remove({_id:req.body.info}, function(err, results){
								if(err){
									console.log('Error', err)
								}
								else{
									console.log('deleted')
									return res.json('Appointment Cancelled')
								}
						})
					}
					else{
						console.log('skipped if')
						return res.json('You can only cancel your appointments')
					}
					
				}
			})
		}
	}
})();