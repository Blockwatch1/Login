import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from 'express';
import cors from 'cors';
const {Client} = require('pg');
require("dotenv").config();
var emailable = require("emailable")(process.env.VerifEmailKey);
const client = new Client({
    user : "postgres",
    password : "Sussy",
    host: "localhost",
    port: '5432',
	database: 'Test-Login',
});
const app =express();
app.use(cors());
async function verifyEmail(){
    try{
    const resu = await emailable.verify('sigmasigmaboy@gmail.com');
    console.log(resu);
     return resu; 
}catch(e){
    console.log("Connection to emailable failed");
    return null;
}
}
async function getUser(){
    try{
    let resu = await client.query('Select * from users');
   return resu.rows;
}catch(e){
     return null;
}

}

app.get("/getUser", async(req, res) => {
    const rep = await getUser();
    res.send(rep);
});
async function connect() {
    try{
        await client.connect();
        console.log("connection to postgres Successful");
    }catch(e){
        console.log("connection to postgres failed");
    }
}
app.get("/verifyEmail", async(req, res) => {
    const resu = await verifyEmail();
    res.send(resu);
});
connect();
app.listen(3050,()=>{console.log('Server is listening on port 3050');});