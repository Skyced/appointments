var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator')

var complainValidator = [
  validate({
    validator: 'isLength',
    arguments: [10, 500],
    message: 'Complain should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var UserSchema = new mongoose.Schema({
	name:{type:String, required:true},
	appointments: [{type:Schema.Types.ObjectId, ref:'Appointment'}]
})
var User = mongoose.model('User', UserSchema);

var AppointmentSchema = new mongoose.Schema({
	_user:{type: Schema.ObjectId, ref:'User'},
	user:{type:String},
	date:{type:Date},
	time:{type:Schema.Types.Mixed},
	complain:{type:String, validate: complainValidator}
})
var Appointment = mongoose.model('Appointment', AppointmentSchema);