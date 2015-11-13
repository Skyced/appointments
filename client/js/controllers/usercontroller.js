myApp.controller('userController', function(userFactory){
	var that= this;

	this.createUser = function(){
		console.log(this.newUser)
		userFactory.newUser(this.newUser, function(data){
			that.user=data;
		})
	}
})