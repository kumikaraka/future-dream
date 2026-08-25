require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
//import your staff routes here once created
//const staffRoutes=require('./routes/staffRoutes');

const authRoutes=require('./routes/authRoutes');//ADDED: importing the auth routes

const app=express();
//---middleware---
app.use(cors());//allows frontend react app to make requests to this ApI
app.use(express.json());//Parse incoming JSON payloads (e.g., from post/put requests)
app.use(express.urlencoded({extended:true}));//Parse URL-encoded dtaa

//---Database connection---
const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[database] connected to MongoDB: ${conn.connection.host}`);
    } catch(error) {
        console.error(`[database] connection error: ${error.message}`);
        //exit the node process if the database connection fails to avoid silent errors
        process.exit(1);
    }
}; 
//initialize the database connection
connectDB();    

//---API routes---
//Mount your staff routes to a specific endpoint 
//app.use('/api/staff',staffRoutes);
//ADDED: Mount the auth routes to =handle login and register requests
app.use('/api/auth', authRoutes);

//Basic health check route to verify server is up
app.get('/',(req,res)=>{
    res.status(200).json({message:'Hope for Her is software system API is running ...'});
});
//catch-all route for undefined endpoints
app.use((req,res)=>{
    res.status(404).json({error:'Endpoint not found'});
});

//Global error handler (catches eorrors thrown in routes)
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        error:process.env.NODE_ENV==='development'?err.message:'something went wrong'});
}); 

//---server initialization---
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`[server] Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});