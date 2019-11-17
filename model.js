module.exports={
	
	mongoose:null,
	uniqueValidator: null,
	
	initAllModel:function(){
			
		var allusers =  this.mongoose.Schema({ 
            name:{type:String},id:{type:String,unique:true},password:{type:String},
			addr1:{type:String,default:null},
			addr2:{type:String,default:null},
			phone:{type:String,default:null},
			email:{type:String,default:null},
			role:{type:String},
			createdBy:{type:String}
		});
		allusers.plugin(this.uniqueValidator);
		this.users = this.mongoose.model('users', allusers,'users');
		
		var allpatients =  this.mongoose.Schema({ 
			id:{type:String},
			name:{type:String},
			createdBy:{type:String},
			details:{type:Object}
		});
		this.patients = this.mongoose.model('patients', allpatients,'patients');

		
		
		var allappointments =  this.mongoose.Schema({ 
            doctorId:{type:String},patientId:{type:String},appointmentDate:{type:String},appointmentTime:{type:String},
			updatedAt:{type:Date,default:new Date()},
		});
        this.appointments = this.mongoose.model('appointments', allappointments,'appointments');

		
	}
	

}