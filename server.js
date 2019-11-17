//require all npm 
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var engine = require('express-dot-engine');
var path = require('path');
var session = require('express-session');
const nodemailer = require('nodemailer');
var htmlToPdf = require('html-to-pdf');

//require custom files
var config=require('./config');
var model = require('./model');
var allfunction = require('./allfunction');

//for using express
var app = express();

//for express-dot-engine
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, './public'));
app.set('view engine', 'dot');


//connect to database
mongoose.connect(config.db ,{ useNewUrlParser: true },function(err){
	if(err){
		console.log(err);
	}else{
		console.log('mongodb connected successfully');
	}
});

 //default body parser setting
 app.use(bodyParser.json());

// make a folder static which can be accessed from browser
 app.use('/',express.static('public'));
 
 //for session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//initialize variables in different file
model.mongoose = mongoose;
model.uniqueValidator=uniqueValidator;
model.initAllModel();//calling all schemas from model.js file
allfunction.model=model;
allfunction.nodemailer=nodemailer;

model.mongoose.set('useFindAndModify', false);

//goto loginpage directly
app.get('/',function(req,res){
	allfunction.goToLogin(req,res);
	
});

//goto each page
app.get('/:pagename',function(req,res){
	allfunction.goToPage(req,res);
});

//find user for login
app.post('/r/login',function(req,res){
	allfunction.Login(req,res);
	 
});

//save user details in database
app.post('/i/saveuserDetails',function(req,res){
	allfunction.saveUserDetails(req,res);
});
	
	//show all doctors in Doctors tab
app.post('/r/showAllDoctors',function(req,res){
		allfunction.showAllDoctors(req,res);  
});
	
	//update user details in database 
app.post('/u/updateuser',function(req,res){
	allfunction.updateUserdb(req,res);
});

//delete user details from database 
app.post('/i/deleteuserDetails',function(req,res){
	allfunction.deleteUser(req,res);
});

//show all operators in Operators tab
app.post('/r/showAllOperators',function(req,res){
		allfunction.showAllOperators(req,res);  
});

//show all patients in Patients tab
app.post('/r/showAllPatients',function(req,res){
		allfunction.showAllPatients(req,res);  
});

//show all appointments in Appointments Tab
app.post('/r/showAllAppointments',function(req,res){
		allfunction.showAllAppointments(req,res);  
});

//get doctor details to find available time for particular date
app.post('/r/getDoctorDetails',function(req,res){
	allfunction.getDoctorDetails(req,res);
});


//save appointment details  in database
app.post('/i/saveappointmentDetails',function(req,res){
	allfunction.addAppointment(req,res);
});

//get all patients of selected doctor id
app.post('/r/getrequiredPatientDetails',function(req,res){
	allfunction.getrequiredPatientDetails(req,res);
});


//update appointmentdetails in database 
app.post('/u/updateappointment',function(req,res){
	allfunction.updateappointment(req,res);
});


//delete appointment details from database 
app.post('/i/deleteappointmentDetails',function(req,res){
	allfunction.deleteappointment(req,res);
});

//get correct patient details for health update
app.post('/r/findcorrectpatient',function(req,res){
	allfunction.findcorrectpatient(req,res);
});


//update patient health
app.post('/u/updatepatienthealth',function(req,res){
	allfunction.updatePatienthealth(req,res);
});

//show all admins in Doctors tab
app.post('/r/showAllAdmins',function(req,res){
		allfunction.showAllAdmins(req,res);  
});
	
	////////////////////////
 

//for log out
app.post('/r/logout',function(req,res){
	
	allfunction.LogOut(req,res);
});




app.listen(config.accountingsPort);
console.log('app is running');