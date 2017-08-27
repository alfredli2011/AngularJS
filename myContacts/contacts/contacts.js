'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/contacts', {
		templateUrl: 'contacts/contacts.html',
		controller: 'ContactsCtrl'
	});
}])

.controller('ContactsCtrl', ['$scope','$firebaseAuth','$firebaseArray',function($scope,$firebaseAuth,$firebaseArray) {
	$firebaseAuth().$signInWithEmailAndPassword('user@user.com', 'password').catch(function(error) {
		console.log(error);
	});
	let ref=firebase.database().ref().child('contacts');
	$scope.contacts=$firebaseArray(ref);
	$scope.showAddForm=function(){
		$scope.addFormShow=true;
	};
	$scope.showEditForm=function(contact){
		$scope.id=contact.$id;
		$scope.name=contact.name;
		$scope.email=contact.email;
		$scope.company=contact.company;
		$scope.work_phone=contact.phones.work;
		$scope.mobile_phone=contact.phones.mobile;
		$scope.home_phone=contact.phones.home;
		$scope.street_address=contact.address.street_address;
		$scope.city=contact.address.city;
		$scope.state=contact.address.state;
		$scope.zipcode=contact.address.zipcode;
		$scope.editFormShow=true;
	};
	$scope.hide=function(){
		$scope.addFormShow=false;
		$scope.contactShow=false;
		$scope.editFormShow=false;
	};
	$scope.addFormSubmit=function(){
		console.log('Adding Contact...');
		if($scope.name){var name=$scope.name;}else{var name=null;}
		if($scope.email){var email=$scope.email;}else{var email=null;}
		if($scope.company){var company=$scope.company;}else{var company=null;}
		if($scope.work_phone){var work_phone=$scope.work_phone;}else{var work_phone=null;}
		if($scope.mobile_phone){var mobile_phone=$scope.mobile_phone;}else{var mobile_phone=null;}
		if($scope.home_phone){var home_phone=$scope.home_phone;}else{var home_phone=null;}
		if($scope.street_address){var street_address=$scope.street_address;}else{var street_address=null;}
		if($scope.city){var city=$scope.city;}else{var city=null;}
		if($scope.state){var state=$scope.state;}else{var state=null;}
		if($scope.zipcode){var zipcode=$scope.zipcode;}else{var zipcode=null;}
		$scope.contacts.$add({
			name:name,
			email:email,
			company:company,
			phones:{
				work:work_phone,
				mobile:mobile_phone,
				home:home_phone
			},
			address:{
				street_address:street_address,
				city:city,
				state:state,
				zipcode:zipcode
			}
		}).then(function(ref){
			console.log('Added Contact with ID:'+ref.key);
			$scope.clearFields();
			$scope.addFormShow=false;
			$scope.msg='Contact Added';
		});
	};
	$scope.clearFields=function(){
		console.log('Clearing All Fields...');
		$scope.name="";
		$scope.email="";
		$scope.company="";
		$scope.work_phone="";
		$scope.mobile_phone="";
		$scope.home_phone="";
		$scope.street_address="";
		$scope.city="";
		$scope.state="";
		$scope.zipcode="";
	};
	$scope.showContact=function(contact){
		console.log('Getting Contact...');
		$scope.name=contact.name;
		$scope.email=contact.email;
		$scope.company=contact.company;
		$scope.work_phone=contact.phones.work;
		$scope.mobile_phone=contact.phones.mobile;
		$scope.home_phone=contact.phones.home;
		$scope.street_address=contact.address.street_address;
		$scope.city=contact.address.city;
		$scope.state=contact.address.state;
		$scope.zipcode=contact.address.zipcode;
		$scope.contactShow=true;
	};
	$scope.editFormSubmit=function(){
		console.log('Updating Contact...');
		var id=$scope.id;
		var record=$scope.contacts.$getRecord(id);
		record.name=$scope.name;
		record.email=$scope.email;
		record.company=$scope.company;
		record.phones.work=$scope.work_phone;
		record.phones.mobile=$scope.mobile_phone;
		record.phones.home=$scope.home_phone;
		record.address.street_address=$scope.street_address;
		record.address.city=$scope.city;
		record.address.state=$scope.state;
		record.address.zipcode=$scope.zipcode;
		$scope.contacts.$save(record).then(function(ref){
			console.log('Updated Contact with ID:'+ref.key);
		});
		$scope.clearFields();
		$scope.editFormShow=false;
		$scope.msg='Contact Updated';
	};
	$scope.removeContact=function(contact){
		console.log('Removing Contact...');
		$scope.contacts.$remove(contact);
		$scope.msg='Contact Removed';
	}
}])
.directive('contactForm',function(){
	return{
		restrict:'E',
		templateUrl:'contacts/form.html'
	}
})