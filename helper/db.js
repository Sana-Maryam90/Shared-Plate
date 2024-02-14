import mongoose from "mongoose";

export const connectDb = async() => {

    try{
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URI,{dbName:"SharedPlate"});

        console.log("db connected...");
        console.log(connection);

    }
    catch(error){
        console.log("failed to connect to db");
        console.log(error);
    }
};