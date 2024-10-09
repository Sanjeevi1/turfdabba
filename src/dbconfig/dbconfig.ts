import mongoose from "mongoose";

export async function connect(){
  try{//since we are using typescript dbt of not resolving !-i will take care of it
    mongoose.connect(process.env.MONGO_URI!);
    const connection=mongoose.connection;
    //event-connected
    connection.on('connected',()=>{
      console.log('MongoDB connected successfully');
    })
    connection.on('error',(err)=>{
      console.log('MongoDB connection error.Please make sure MongoDB is running '+err);
      process.exit();
    })
  }catch(error){
    console.log('Something goes wrog!');
    console.log(error);
  }
}