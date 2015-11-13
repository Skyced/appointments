myApp.controller('appointmentController', function(appointmentFactory){
	var that = this;

	this.createAppointment = function(){
		console.log('this.newAppoint', this.newAppoint)
		appointmentFactory.createAppointment(this.newAppoint, function(data){
			that.appointmentmsg = data;
		})
	}
	this.destroyAppoint = function(info){
		console.log('delete', info)
		appointmentFactory.deleteAppoint(info, function(data){
			that.deletemsg = data;
			getAppointments();
		})
	}

	var getAppointments = function(){
		appointmentFactory.getAppointments(function(data){
			console.log('Controller data', data)
			that.appointments = data;
		})
	}
	var getCurrentdate = function(){
		that.currdate = new Date();
		console.log(that.currdate);
	}
	getCurrentdate();
	getAppointments();
})