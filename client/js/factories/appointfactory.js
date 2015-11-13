myApp.factory('appointmentFactory', function($http, $location){
	var factory = {};
	factory.createAppointment = function(info, callback){
		$http({
			url:'/appointment/create',
			method:'POST',
			data:{'info':info}
		})
		.success(function(data){
			console.log('[FACTORY] data', data)
			callback(data)
		})
	}
	factory.getAppointments = function(callback){
		$http.get('/appointment/fetch').success(function(data){
			callback(data)
		})
	}
	factory.deleteAppoint = function(info, callback){
		$http({
			url:'/appointment/destroy',
			method:'POST',
			data:{'info':info}
		})
		.success(function(data){
			callback(data);
		})
	}
	return factory;
})