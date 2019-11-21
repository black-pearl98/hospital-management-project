module.exports={
	model: null,
	nodemailer: null,
	goToPage:function(req,res){
		if(req.params.pagename=="favicon.ico"){
			
		}else{
			if(!req.session.userDetails&&req.params.pagename!="signup"&&req.params.pagename!="login"){
				res.render('login',{});
				
			}
			else if(req.params.pagename!="signup"&&req.params.pagename!="login"){
				var AllDetails = {};
				var userDetails = req.session.userDetails[0];
				AllDetails['userDetails'] = userDetails;
					if((req.params.pagename=="admins"||req.params.pagename=="manageadmin" ||req.params.pagename=="dashboard")&& (userDetails.role=="superadmin") ){
					res.render(req.params.pagename,AllDetails);
					}
					else if((req.params.pagename=="doctors"||req.params.pagename=="operators"||req.params.pagename=="manageoperator"||req.params.pagename=="managedoctor"|| 
					req.params.pagename=="dashboard")&& (userDetails.role=="admin") ){
						res.render(req.params.pagename,AllDetails);
					}
					else if((req.params.pagename=="patients"||req.params.pagename=="managepatient"||req.params.pagename=="appointments"||req.params.pagename=="manageappointment"|| 
					req.params.pagename=="dashboard")&& (userDetails.role=="operator") ){
						res.render(req.params.pagename,AllDetails);
					}
					else if((req.params.pagename=="updatehealth"||req.params.pagename=="appointments"|| 
					req.params.pagename=="dashboard")&& (userDetails.role=="doctor") ){
						res.render(req.params.pagename,AllDetails);
					}
					else if((req.params.pagename=="updatehealth"||req.params.pagename=="appointments"|| 
					req.params.pagename=="dashboard")&& (userDetails.role=="patient") ){
						res.render(req.params.pagename,AllDetails);
					}
					else{
						return;
					}

			}
			
			else{
				res.render(req.params.pagename,{});
			}
		}
	},
	
	goToLogin:function(req,res){
		res.render('login',{});
	},
	
	Login:function(req,res){
		var responseObj = {};
		if(!("id" in req.body) || !("password" in req.body)){
		 responseObj={"success":false, message:"fields cannot be empty"};
		 res.send(responseObj);
		}
		else{
		 var finduser = this.model.users.find(req.body);
		 finduser.exec(function(err,data){
		    if(err){
			 responseObj={"success":false,message:"internal error occured in backend","error":err};
			 res.send(responseObj);
		    }
		    else{
			
			  if(data.length==0){
				
				responseObj={"success":false,message:"userid or password mismatched", "data": data};
				res.send(responseObj);
			  }
			  else{
				
				req.session.userDetails= data;
				responseObj={"success":true,message:"user found successfully", "data": data};
				//console.log(data);
				res.send(responseObj);
			  }
		    }
         });
	    }
	},
	
	///save User Details in database
	saveUserDetails:function(req,res){
		 var responseObj = {};
		 var me=this;
		 req.body.createdBy=req.session.userDetails[0].id;
		 var saveNewuser = new this.model.users(req.body);
		 saveNewuser.save(function (err,success) {
		  if(err){
		   responseObj={"success":false,message:"internal error occured","error":err};

		   res.send(responseObj);
		  }
		  else{
			  var data={"id": req.body.id,
			  			 "name": req.body.name,
						 "createdBy": req.session.userDetails[0].id, 
						"details": {"patientName": req.body.name,
											  "patientPhoneNo": req.body.phone,
											  "patientAddress": req.body.addr1,
											  "patientCity": req.body.addr2,
											  
											  "patientEmail": req.body.email
											 }
						}
			if(req.body.role=="patient"){
				var saveNewpatient = new me.model.patients(data);
				saveNewpatient.save(function (err,success) {
					if(err){
					responseObj={"success":false,message:"internal error occured in backend","error":err};
		
					res.send(responseObj);
					}
					else{
					responseObj={"success":true,message:"Data Saved successfully","data":success};
					me.sendemail(req.body.email,req.body.id,req.body.password);
					res.send(responseObj);
					}
	   
				})
			}
			else{
				responseObj={"success":true,message:"Data Saved successfully","data":success};
				me.sendemail(req.body.email,req.body.id,req.body.password);
				res.send(responseObj);
			}
		   
		  }

		 })
		 
		},
	
	sendemail:function(mail,id,pass){
		//console.log(mail);
		//console.log(id);
		//console.log(pass);
		var transporter = this.nodemailer.createTransport({
		  service: 'gmail',
		  tls: true,
		  auth: {
			user: 'swatijha0908@gmail.com',
			pass: '***************'
		  }
		});

		var mailOptions = {
		  from: 'swatijha0908@gmail.com',
		  to: mail,
		  subject: 'Sending Email using Node.js',
		  text: 'Thank you for signing in. Your userid is' + ' ' + id + ' and your password is' + ' ' + pass + 
		  '. Use this login credential to enter into the hospital management application',
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			//console.log(error);
		  } else {
			//console.log('Email sent: ' + info);
		  }
		});

	},
	
	//delete user from database
	deleteUser:function(req,res){
		var responseObj = {};
		var me=this;
		this.model.users.findByIdAndDelete(req.body._id, function (err,success){
			if(err)
			{
				responseObj={"success":false,message:"internal error occured in backend","error":err};
				console.log(err);
				res.send(responseObj);
			}
			else{
				
			  
				if(req.body.role=="patient"){
					me.model.patients.findOneAndRemove({id: req.body.id}, function (err,success){
						if(err)
						{
							responseObj={"success":false,message:"internal error occured in backend","error":err};
							console.log(err);
							res.send(responseObj);
						}
						else{
							responseObj={"success":true,message:"data deleted successfully in both db","success":success};
							res.send(responseObj);
						}
					});
				}
				else{
					responseObj={"success":true,message:"data deleted successfully in user db","success":success};
					res.send(responseObj);
				}
			   
		  

				
			}
			
			
		
		});
	},
	
	
	usersTab:function(req,res){
		var responseObj = {};
		var query={};
		if(req.session.userDetails[0].userid!="superadmin"){
			query={createdBy:req.session.userDetails[0].userid};
		}
		this.model.users.find(query).exec(function(err, result) {
			if(err){
				//console.log('error in backend');
			}
			else{
				//console.log(result);
				res.send(result);
			}
		});
	},
	
	//show all doctors in doctors tab
	showAllDoctors:function(req,res){
		var responseObj = {};
		this.model.users.find({"role" : "doctor"}).exec(function(err, result) {
			if(err){
				console.log('error in backend');
			}
			else{
				res.send(result);
			}
		});
	},
	
	//update users in database
	updateUserdb:function(req,res){
		var me=this;
		this.model.users.findByIdAndUpdate(req.body._id, req.body, function (err,success){
			if(err)
			{
				responseObj={"success":false,message:"internal error occured in backend","error":err};
				console.log(err);
				res.send(responseObj);
			}
			else{
				var data={"id": req.body.id,
			  			 "name": req.body.name,
						 "createdBy": req.session.userDetails[0].id, 
						"details": {"patientName": req.body.name,
											  "patientPhoneNo": req.body.phone,
											  "patientAddress": req.body.addr1,
											  "patientCity": req.body.addr2,
											  
											  "patientEmail": req.body.email
											 }
						}
				if(req.body.role=="patient"){
					me.model.patients.findOneAndUpdate({id: req.body.id}, data, {new: true}, function (err,success){
						if(err)
						{
							responseObj={"success":false,message:"internal error occured in backend","error":err};
							console.log(err);
							res.send(responseObj);
						}
						else{
							responseObj={"success":true,message:"data updated successfully in both db","success":success};
							res.send(responseObj);
						}
					});
				}
				else{
					responseObj={"success":true,message:"data updated successfully in user db","success":success};
					res.send(responseObj);
				}
				
			}
			
			
			
		});
	},
	
	//show all operators in operators tab
	showAllOperators:function(req,res){
		var responseObj = {};
		this.model.users.find({"role" : "operator"}).exec(function(err, result) {
			if(err){
				console.log('error in backend');
			}
			else{
				res.send(result);
			}
		});
	},
	
	//show all patients in patients tab
	showAllPatients:function(req,res){
		var responseObj = {};
		this.model.users.find({"role" : "patient"}).exec(function(err, result) {
			if(err){
				console.log('error in backend');
			}
			else{
				res.send(result);
			}
		});
	},
	
	
	//show all appointments in Appointment tab
	showAllAppointments:function(req,res){
		var responseObj = {};
		if(req.session.userDetails[0].role=="doctor"){
			var data={doctorId: req.session.userDetails[0].id};
		}
		else if(req.session.userDetails[0].role=="patient"){
			var data={patientId: req.session.userDetails[0].id};
		}
		else{
			var data={};
		}
			
		this.model.appointments.find(data).exec(function(err, result) {
			if(err){
				console.log('error in backend');
			}
			else{
				res.send(result);
			}
		});
	},
	
	//get doctor details to find available time for particular date
	getDoctorDetails:function(req,res){
		console.log(req.body);
		var showTime = this.model.appointments.find(req.body);	
		showTime.exec(function(err, success){
			if(err){
				console.log('error is'+err );
			}else{
				console.log('result is'+ success);
				res.send(success);
			}
		});
	},
	
	//save appointment in database
	addAppointment:function(req,res){
		var responseObj = {};
		var saveNewappointment = new this.model.appointments(req.body);
		saveNewappointment.save(function (err,success) {
		 if(err){
		  responseObj={"success":false,message:"internal error occured in backend","error":err};
			console.log(err);
		  res.send(responseObj);
		 }
		 else{
		  responseObj={"success":true,message:"Data Saved successfully","data":success};
		  res.send(responseObj);
		 }

		})
	   },


	//get doctor details to find available time for particular date
	getDoctorDetails:function(req,res){
		console.log(req.body);
		var showTime = this.model.appointments.find(req.body);	
		showTime.exec(function(err, success){
			if(err){
				console.log('error is'+err );
			}else{
				console.log('result is'+ success);
				res.send(success);
			}
		});
	},
	
	//get all patients of selected doctor id
	getrequiredPatientDetails:function(req,res){
		console.log(req.body);
		var finduser = this.model.appointments.find({doctorId: req.body.doctorId});	
		finduser.exec(function(err, success){
			if(err){
				console.log('error is'+err );
			}else{
				console.log('result is'+ success);
				res.send(success);
			}
		});
	},
	
	//update appointments in database
	updateappointment:function(req,res){
		this.model.appointments.findByIdAndUpdate(req.body._id, req.body, function (err,success){
			if(err)
			{
				responseObj={"success":false,message:"internal error occured in backend","error":err};
				console.log(err);
			}
			else{
				responseObj={"success":true,message:"data updated successfully","success":success};
			}
			
			res.send(responseObj);
			
		});
	},
	
	//delete appointment from database
	deleteappointment:function(req,res){
		var responseObj = {};
	
		this.model.appointments.findByIdAndDelete(req.body._id, function (err,success){
			if(err)
			{
				responseObj={"success":false,message:"internal error occured in backend","error":err};
				console.log(err);
			}
			else{
				responseObj={"success":true,message:"data deleted successfully","success":success};
			}
			
			res.send(responseObj);
		
		});
	},
	
	//get correct patient details for health update
	findcorrectpatient:function(req,res){
		//console.log(req.body);
		 if(req.session.userDetails[0].role=="patient"){
			var data={id: req.session.userDetails[0].id};
		}
		else{
			var data=req.body;
		}
		var editpatient = this.model.patients.find(data);	
		editpatient.exec(function(err, success){
			if(err){
				console.log('error is'+err );
			}else{
				//	console.log('result is'+ success);
					res.send(success);
			}
		});
	},
	
	//update patient health
	updatePatienthealth:function(req,res){
		//console.log(req.body);
		this.model.patients.findOneAndUpdate({id: req.body.id}, req.body , {new: true}, function (err,success){
			if(err)
			{
				responseObj={"success":false,message:"internal error occured in backend","error":err};
				console.log(err);
			}
			else{
				responseObj={"success":true,message:"data updated successfully","success":success};
			}
			
			res.send(responseObj);
			
		});
	},
	
	//show all admins in allAdmins tab
	showAllAdmins:function(req,res){
		var responseObj = {};
		this.model.users.find({"role" : "admin"}).exec(function(err, result) {
			if(err){
				console.log('error in backend');
			}
			else{
				res.send(result);
			}
		});
	},

	

	

	

	

	
	LogOut:function(req,res){
		if (req.session) {
			req.session.destroy(function(err,success) {
				if(err) {
				responseObj={"success":false,message:"internal error occured in server","error":err};
				console.log(err);
				res.send(responseObj);
				} 
				else{
				responseObj={"success":true,message:"Logged Out Successfully"};
				console.log(success);
				res.send(responseObj);
				}
			});
		}
	}
	
}