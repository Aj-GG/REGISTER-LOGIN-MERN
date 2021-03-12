const express = require("express");
const path = require("path");
const app=express();
const hbs= require("hbs");
require("./db/conn"); 

const Register = require("./models/registers");
const { url } = require("inspector");
const port=process.env.port || 3000;

const static_path =path.join(__dirname , "../public");
const template_path =path.join(__dirname , "../templates/views");
const partials_path =path.join(__dirname , "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
  
app.use(express.static(static_path));
app.set("view engine" ,"hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res) =>{
    res.render("index")
});
app.get("/login",(req,res) =>{
    res.render("login");
})
app.get("/register",(req,res) =>{
    res.render("register");
})
app.get("/cultivo",(req,res) =>{
    res.render("cultivo");
})
app.post("/register", async(req,res) =>{
    try {

        const age=req.body.age;
        if (age >= 18 ) 
        {
            const registerEmployee= new Register({
                organizationid : req.body.organizationid,
                fullname : req.body.fullname,
                age : req.body.age,
                designation : req.body.designation
            }) 
            const registered= await registerEmployee.save();
    
            res.status(201).render("login");    
        } else {
            res.send("age should be greater than 18");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/login", async(req,res) =>{
   try {
       const orgid=req.body.organizationid;
       const fulname=req.body.fullname;

       const employeeid = await Register.findOne({organizationid : orgid});
      
      if (employeeid.fullname === fulname ){
          res.status(201).render("cultivo");    
      }else{
          res.send("Invalid Login Details"); 
      }
       
   } catch (error) {
       res.status(400).send("Invalid Login Details");
   }
})
app.listen(port ,()=>{
    console.log(`server is running at port at ${port}`);
});