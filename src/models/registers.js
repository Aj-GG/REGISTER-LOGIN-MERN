const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    organizationid : {
        type : Number,
        required : true,
        unique:true
    },
    fullname : {
        type : String,
        required : true
    },

    age :{
        type : Number,
        required : true
    },
    designation:{
        type:String,
        required:true
    }

})

const Register= new mongoose.model("Register",employeeSchema);

module.exports = Register; 