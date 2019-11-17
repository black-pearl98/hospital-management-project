
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $timeout) {
	$scope.allOrganisation = [];
	$scope.timeoutFunction = function () {
		$timeout(function () {
			$("input.form-control").trigger("change"); 	//DOM has finished rendering
			$('.mdb-select').material_select('destroy');
			$('.mdb-select').material_select();
		});
	};
	
	//show all doctors in Alldoctors tab
	
	$scope.allDoctors = [];
	$scope.showAllDoctors  = function () {
		var dtable = {
			method: 'POST',
			url: '/r/showAllDoctors',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log(result);
					 $scope.allDoctors = result.data;
					
				},
				function (error) {
					console.log(error);
					alert('internal error occured in client side');
				}
			);

	}

	//open  modal to add user
	$scope.addnewuser = function () {
		$('#userdialog').modal('show');
		$scope.timeoutFunction();
	}
	
	$scope.userDetails={};
	
	//open  modal to edit user
	$scope.editnewuser = function () {
		$('#userdialog').modal('show');
		$scope.timeoutFunction();
	}
	
	
	//update doctor details in database
	$scope.updatedoctor = function () {
		
		var json = JSON.stringify($scope.userDetails, function (key, value) {
			if (key === "$$hashKey") {
				return undefined;
			}

			return value;
		});
		
		var updateuser = {
			method: 'POST',
			url: '/u/updateuser',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(JSON.parse(json))
		}
		$http(updateuser)
			.then(
				function (result) {
					//console.log(result.data.message);
					alert(result.data.message);
					$('#userdialog').modal('hide');
					location.href="doctors";
				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);
	}
	
	//add user in database
	$scope.adduser = function () {

		if (!("name" in $scope.userDetails) || !("id" in $scope.userDetails) || !("password" in $scope.userDetails) || !("addr1" in $scope.userDetails) || !("addr2" in $scope.userDetails) || !("phone" in $scope.userDetails) || !("email" in $scope.userDetails) || !("role" in $scope.userDetails)) {
			alert("fields cannot be empty");


		}

		else {
			var saverequest = {
				method: 'POST',
				url: '/i/saveuserDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify($scope.userDetails)
			}

			$http(saverequest)
				.then(
					function (result) {
						console.log(result);
						if (result.data.success == true) {
							alert(result.data.message);
							$('#userdialog').modal('hide');
							location.reload(true);
						} else if (result.data.success == false && result.data.error.name == 'ValidationError') {
							alert('user with this ID already exist');
						} else {
							alert(result.data.error);
							console.log(result);
						}
					},
					function (error) {
						console.log(error);
						alert('internal error occured in frontend');
					}
				);



		}
	};

	//open modal for delete confirmation
	$scope.deleteuserconfirmation = function () {
		$('#deletedialog').modal('show');
	}

	$scope.DuserDetails={};
	//delete doctor from database
	$scope.deletedoctor = function () {
		
		
		
			var dltrequest = {
				method: 'POST',
				url: '/i/deleteuserDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify($scope.DuserDetails)

			}
			$http(dltrequest)
				.then(
					function (result) {
						console.log(result);
						alert(result.data.message);
						location.href="doctors";
					},
					function (error) {
						console.log(error);
						alert('internal error occured in frontend');
					}
				);
		
	};
	
	//show all operators in Alloperators tab
	
	$scope.allOperators = [];
	$scope.showAllOperators  = function () {
		var dtable = {
			method: 'POST',
			url: '/r/showAllOperators',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log(result);
					 $scope.allOperators = result.data;
					
				},
				function (error) {
					console.log(error);
					alert('internal error occured in client side');
				}
			);

	}
	
	//update operator details in database
	$scope.updateoperator = function () {
		
		var json = JSON.stringify($scope.userDetails, function (key, value) {
			if (key === "$$hashKey") {
				return undefined;
			}

			return value;
		});
		
		var updateuser = {
			method: 'POST',
			url: '/u/updateuser',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(JSON.parse(json))
		}
		$http(updateuser)
			.then(
				function (result) {
					//console.log(result.data.message);
					alert(result.data.message);
					$('#userdialog').modal('hide');
					location.href="operators";
				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);
	}
	
	$scope.DuserDetails={};
	//delete operator from database
	$scope.deleteoperator = function () {
		
		
		
			var dltrequest = {
				method: 'POST',
				url: '/i/deleteuserDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify($scope.DuserDetails)

			}
			$http(dltrequest)
				.then(
					function (result) {
						console.log(result);
						alert(result.data.message);
						location.href="operators";
					},
					function (error) {
						console.log(error);
						alert('internal error occured in frontend');
					}
				);
		
	};
	
	//show all patients in AllPatients tab
	
	$scope.allPatients = [];
	$scope.showAllPatients  = function () {
		var dtable = {
			method: 'POST',
			url: '/r/showAllPatients',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log(result);
					 $scope.allPatients = result.data;
					
				},
				function (error) {
					console.log(error);
					alert('internal error occured in client side');
				}
			);

	}
	
	
	
	//update patient details in database
	$scope.updatepatient = function () {
		
		var json = JSON.stringify($scope.userDetails, function (key, value) {
			if (key === "$$hashKey") {
				return undefined;
			}

			return value;
		});
		
		var updateuser = {
			method: 'POST',
			url: '/u/updateuser',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(JSON.parse(json))
		}
		$http(updateuser)
			.then(
				function (result) {
					//console.log(result.data.message);
					alert(result.data.message);
					$('#userdialog').modal('hide');
					location.href="patients";
				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);
	}

	$scope.DuserDetails={};
	//delete patient from database
	$scope.deletepatient = function () {
		
		
		
			var dltrequest = {
				method: 'POST',
				url: '/i/deleteuserDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify($scope.DuserDetails)

			}
			$http(dltrequest)
				.then(
					function (result) {
						console.log(result);
						alert(result.data.message);
						location.href="patients";
					},
					function (error) {
						console.log(error);
						alert('internal error occured in frontend');
					}
				);
		
	};
	
	//show all appointments in AllAppointments tab
	
	$scope.allAppointments = [];
	$scope.showAllAppointments  = function () {
		var dtable = {
			method: 'POST',
			url: '/r/showAllAppointments',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log(result);
					 $scope.allAppointments  = result.data;
					
				},
				function (error) {
					console.log(error);
					alert('internal error occured in client side');
				}
			);

	}
	
	//open  modal to add appointment
	$scope.addnewappointment = function () {
		$('#userdialog').modal('show');
		$scope.timeoutFunction();
		//$scope.showtimeforupdate();
	}
	
	//call on load of appointment page
	
	$scope.appointmentDetails={};
	$scope.Appointmentpage = function () {
		$scope.showAllAppointments();
		$scope.showAllDoctors();
		$scope.showAllPatients();
		
	}
	
	//show available time slots for particular date and particular doctor
	$scope.allTimes={
		nine:{time:"9 am to 10 am","displayTime":false},
		ten:{time:"10 am to 11 am","displayTime":false},
		eleven:{time:"11 am to 12 pm","displayTime":false},
		twelve:{time:"12 pm to 1 pm","displayTime":false},
		thirteen:{time:"1 pm to 2 pm","displayTime":false},
		fifteen:{time:"3 pm to 4 pm","displayTime":false},
		sixteen:{time:"4 pm to 5 pm","displayTime":false},
		seventeen:{time:"5 pm to 6 pm","displayTime":false},
		eighteen:{time:"6 pm to 7 pm","displayTime":false}
	}
	$scope.arr=[];
	$scope.showtime=function(){
		$scope.allTimes={
			nine:{time:"9 am to 10 am","displayTime":false},
			ten:{time:"10 am to 11 am","displayTime":false},
			eleven:{time:"11 am to 12 pm","displayTime":false},
			twelve:{time:"12 pm to 1 pm","displayTime":false},
			thirteen:{time:"1 pm to 2 pm","displayTime":false},
			fifteen:{time:"3 pm to 4 pm","displayTime":false},
			sixteen:{time:"4 pm to 5 pm","displayTime":false},
			seventeen:{time:"5 pm to 6 pm","displayTime":false},
			eighteen:{time:"6 pm to 7 pm","displayTime":false}
		}
		var dtable = {
			method: 'POST',
			url: '/r/getDoctorDetails',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({"doctorId" : $scope.appointmentDetails.doctorId, "appointmentDate" : $scope.appointmentDetails.appointmentDate})
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log('appointments are');
					//console.log(result.data);
					$scope.arr = result.data;
					
					for(x in $scope.arr){
							var c=$scope.arr[x].appointmentTime;
							for(y in $scope.allTimes){
								if($scope.allTimes[y].time==c){
									$scope.allTimes[y].displayTime=true;
								}
							}	
					}
					$scope.timeoutFunction();
				},
				function (error) {
					console.log(error);
					alert('internal error occured');
				}
			);
	}
	
	//add appointment details in database
	$scope.addappointment= function(){
		var saverequest = {
			method: 'POST',
			url: '/i/saveappointmentDetails',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify($scope.appointmentDetails)
		}

		$http(saverequest)
			.then(
				function (result) {
					console.log(result);
					if (result.data.success == true) {
						alert(result.data.message);
						$('#userdialog').modal('hide');
						location.reload(true);
					} else if (result.data.success == false && result.data.error.name == 'ValidationError') {
						alert('appointment already done');
					}
					 else {
						alert(result.data.message);
					}
				},
				function (error) {
					console.log("error is");
					console.log(error);
					alert('internal error occured');
				}
			);



	};

	//get all patients of selected doctor id
	
	$scope.allrequiredPatients = [];
	$scope.doctorDetails={};
	$scope.getrequiredPatientDetails  = function () {
		var dtable = {
			method: 'POST',
			url: '/r/getrequiredPatientDetails',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify($scope.doctorDetails)
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log(result);
					 $scope.allrequiredPatients  = result.data;
					
				},
				function (error) {
					console.log(error);
					alert('internal error occured in client side');
				}
			);

	}
	
	//show available time slots for appointment update
	$scope.allTimes={
		nine:{time:"9 am to 10 am","displayTime":false},
		ten:{time:"10 am to 11 am","displayTime":false},
		eleven:{time:"11 am to 12 pm","displayTime":false},
		twelve:{time:"12 pm to 1 pm","displayTime":false},
		thirteen:{time:"1 pm to 2 pm","displayTime":false},
		fifteen:{time:"3 pm to 4 pm","displayTime":false},
		sixteen:{time:"4 pm to 5 pm","displayTime":false},
		seventeen:{time:"5 pm to 6 pm","displayTime":false},
		eighteen:{time:"6 pm to 7 pm","displayTime":false}
	}
	$scope.arr=[];
	$scope.showtimeforupdate=function(){
		$scope.allTimes={
			nine:{time:"9 am to 10 am","displayTime":false},
			ten:{time:"10 am to 11 am","displayTime":false},
			eleven:{time:"11 am to 12 pm","displayTime":false},
			twelve:{time:"12 pm to 1 pm","displayTime":false},
			thirteen:{time:"1 pm to 2 pm","displayTime":false},
			fifteen:{time:"3 pm to 4 pm","displayTime":false},
			sixteen:{time:"4 pm to 5 pm","displayTime":false},
			seventeen:{time:"5 pm to 6 pm","displayTime":false},
			eighteen:{time:"6 pm to 7 pm","displayTime":false}
		}
		$scope.appointmentDetails=$scope.patientDetails;
		var dtable = {
			method: 'POST',
			url: '/r/getDoctorDetails',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({"doctorId" : $scope.appointmentDetails.doctorId, "appointmentDate" : $scope.appointmentDetails.appointmentDate})
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log('appointments are');
					//console.log(result.data);
					$scope.arr = result.data;
					
					for(x in $scope.arr){
							var c=$scope.arr[x].appointmentTime;
							for(y in $scope.allTimes){
								if($scope.allTimes[y].time==c){
									$scope.allTimes[y].displayTime=true;
								}
							}	
					}
					$scope.timeoutFunction();
				},
				function (error) {
					console.log(error);
					alert('internal error occured');
				}
			);
	}
	
	//update appointment details in database
	$scope.updateappointment = function () {
		
		var json = JSON.stringify($scope.patientDetails, function (key, value) {
			if (key === "$$hashKey") {
				return undefined;
			}

			return value;
		});
		
		var updatedetails = {
			method: 'POST',
			url: '/u/updateappointment',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(JSON.parse(json))
		}
		$http(updatedetails)
			.then(
				function (result) {
					//console.log(result.data.message);
					alert(result.data.message);
					$('#userdialog').modal('hide');
					location.href="appointments";
				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);
	}
	
	
	//delete appointment from database
	
	$scope.DpatientDetails={};
	$scope.deleteAppointment = function () {
		
		
		
			var dltrequest = {
				method: 'POST',
				url: '/i/deleteappointmentDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify($scope.DpatientDetails)

			}
			$http(dltrequest)
				.then(
					function (result) {
						console.log(result);
						alert(result.data.message);
						location.href="appointments";
					},
					function (error) {
						console.log(error);
						alert('internal error occured in frontend');
					}
				);
		
	};
	
	//update health condition of patient
	$scope.patientDetails={};
	$scope.healthpage  = function () {
		
		$scope.showAllPatients();
		$scope.findcorrectpatient();

	}

	$scope.findcorrectpatient = function () {
		
		var findrequest = {
			method: 'POST',
			url: '/r/findcorrectpatient',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({ "id": $scope.userDetails.id})

		}
		$http(findrequest)
			.then(
				function (result) {
					console.log(result);
					$scope.patientDetails = result.data[0];
					var d=new Date();
					var m=d.getMonth()+1;
					$scope.patientDetails.todaysDate=d.getDate()+"/"+m+"/"+d.getFullYear();
					var name=$scope.patientDetails['details'].patientName.split(' ');
					if(name.length==1){
						$scope.patientDetails['details'].patientFirstName=name[0];
					}
					else if(name.length==2){
						$scope.patientDetails['details'].patientFirstName=name[0];
						$scope.patientDetails['details'].patientLastName=name[1];
					}
					else if(name.length==3){
						$scope.patientDetails['details'].patientFirstName=name[0];
						$scope.patientDetails['details'].patientMiddleName=name[1];
						$scope.patientDetails['details'].patientLastName=name[2];
					}


					$scope.timeoutFunction();
				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);

	};
	
	//updatehealth of patient
	$scope.updatehealth = function () {

		var json = JSON.stringify($scope.patientDetails, function (key, value) {
			if (key === "$$hashKey") {
				return undefined;
			}

			return value;
		});
	
		var updtorg = {
			method: 'POST',
			url: '/u/updatepatienthealth',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(JSON.parse(json))
		}
		$http(updtorg)
			.then(
				function (result) {
					console.log(result.data.message);
					alert(result.data.message);
					location.href = "updatehealth";
				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);

	}
	

//show all admins in AllAdmins tab
	
	$scope.allAdmins = [];
	$scope.showAllAdmins  = function () {
		var dtable = {
			method: 'POST',
			url: '/r/showAllAdmins',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		$http(dtable)
			.then(
				function (result) {
					//console.log(result);
					 $scope.allAdmins = result.data;
					
				},
				function (error) {
					console.log(error);
					alert('internal error occured in client side');
				}
			);

	}
	
	//update admin details in database
	$scope.updateadmin = function () {
		
		var json = JSON.stringify($scope.userDetails, function (key, value) {
			if (key === "$$hashKey") {
				return undefined;
			}

			return value;
		});
		
		var updateuser = {
			method: 'POST',
			url: '/u/updateuser',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(JSON.parse(json))
		}
		$http(updateuser)
			.then(
				function (result) {
					//console.log(result.data.message);
					alert(result.data.message);
					$('#userdialog').modal('hide');
					location.href="admins";
				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);
	}

	$scope.DuserDetails={};
	//delete admin from database
	$scope.deleteadmin = function () {
		
		
		
			var dltrequest = {
				method: 'POST',
				url: '/i/deleteuserDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify($scope.DuserDetails)

			}
			$http(dltrequest)
				.then(
					function (result) {
						console.log(result);
						alert(result.data.message);
						location.href="admins";
					},
					function (error) {
						console.log(error);
						alert('internal error occured in frontend');
					}
				);
		
	};
	$scope.logout = function () {

		var dtable = {
			method: 'POST',
			url: '/r/logout',
			headers: {
				'Content-Type': 'application/json'
			}

		}

		$http(dtable)
			.then(
				function (result) {
					console.log(result.data);
					if (result.data.success == true) {
						alert(result.data.message);
						location.href = "login";
					}
					else {
						alert(result.data.message);
					}

				},
				function (error) {
					console.log(error);
					alert('internal error occured in frontend');
				}
			);

	}

	

	

//////////////////////////////////////////
	
	$scope.loginDetails = {};
	$scope.signup = function () {

		if (!("username" in $scope.userDetails) || !("userid" in $scope.userDetails) || !("password" in $scope.userDetails)) {
			alert("fields cannot be empty");


		}

		else {
			var saverequest = {
				method: 'POST',
				url: '/i/saveUserDetails',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify($scope.userDetails)
			}

			$http(saverequest)
				.then(
					function (result) {
						console.log(result);
						if (result.data.success == true) {
							alert(result.data.message);
							$('#userdialog').modal('hide');
							location.reload(true);
						} else if (result.data.success == false && result.data.error.name == 'ValidationError') {
							alert('user already exist');
						} else {
							alert(result.data.message);
						}
					},
					function (error) {
						console.log(error);
						alert('internal error occured');
					}
				);



		}
	};

	$scope.login = function () {
		var saverequest = {
			method: 'POST',
			url: '/r/login',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify($scope.loginDetails)
		}

		$http(saverequest)
			.then(
				function (result) {

					if (result.data.success == true) {

						console.log(result.data.data[0]);
						//$scope.model.sellerInfo= result.data.data[0]; deleted when page refreshed
						location.href = '/dashboard';

					} else {
						alert(result.data.message);
					}

				},
				function (error) {
					console.log('error');
					alert('internal error occured');
				}
			);
	}


	

});