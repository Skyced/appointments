myApp.factory('userFactory', function($http, $location){
	var factory = {};
	var user;
	factory.newUser = function(info, callback){
		$http({
			url:'/user/create',
			method:'POST',
			data:{'user_info':info}
		})
		.success(function(data){
			user = info;
			callback(data);
			console.log('[USERFACTORY] user1',user);
			$location.path('/home')
		})
	}
	console.log('[USERFACTORY] user',user);
	return factory;
})