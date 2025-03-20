import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import cors from "cors";
const { Client } = require("pg");
require("dotenv").config();
var emailable = require("emailable")(process.env.VerifEmailKey);
const PORT = process.env.PORT;
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
const app = express();
app.use(express.json()); 
app.use(cors());
async function verifyEmail(email) {
  try {
    const response = await emailable.verify(email);
    console.log(response);
    return response;
  } catch (e) {
    console.log("Connection to emailable failed");
    return null;
  }
}
async function connect() {
  try {
    await client.connect();
    console.log("connection to postgres Successful");
  } catch (e) {
    console.log("connection to postgres failed. Specific Error: ", e);
  }
}
app.post("/handleLogin",async(req,res)=>{
  
 try{
    const { email, password } = req.body;
    const databaseResponse = await client.query(`Select * from users where username = '${email}' and password= '${password}'`);
    if(databaseResponse.rows!=0){
        res.send({status: "accepted",reason:""});
    }else{
        res.send({status: "rejected",reason:"User does not exist"});
    }
 }catch(e){
        res.send({status: "rejected",reason:"Server error"});
 }
});
app.post("/handleSignup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const check = await verifyEmail(email);
    if(check.score===undefined){
        return;
    }
    if(check.score>80){
        try{
             const databaseResponse = await client.query(`insert into users values ('${email}','${password}')`);
             if(databaseResponse.rowCount!=undefined&&databaseResponse.rowCount!=0){
                res.send({status: "accepted",reason:""});
             }else{
                res.send({status: "rejected",reason:"Server error"});
             }
        }catch(e){
            console.log(e);
        }
    }else{
        res.send({status: "rejected",reason:"Email not real"});
    }
  } catch (e) {
    res.send({status: "accepted",reason:"Server error"});
    console.log(e);
  }
});
connect();
async function checkTableExists() {
 
  try {
    const result = await client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users')");
    if (result.rows[0].exists) {
      console.log("Table 'users' exists.");
    } else {
      console.log("Table 'users' does not exist.");
    }
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking table existence:", error);
    return false;
  }
}
async function createUsers() {
  const exists=  await checkTableExists();
  if(!exists){
    try{
      client.query("create table users (username varchar(55) not null primary key,password varchar(55) not null)");
    }catch(e){
      console.log("failed to create table users");
    }
  }
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
