import mongoose from "mongoose";
import User from "@/models/user";

export const connectDb = async() => {

    try{
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URI,{dbName:"SharedPlate"});

        console.log("db connected...");
        //console.log(connection);

        // const user = new User({
        //     name:"maryam",
        //     email:"maryam@gmail.com",
        //     password:"ayesha123"
        // })

        // await user.save();
        // console.log("**************user created******************");

    }
    catch(error){
        console.log("failed to connect to db");
        console.log(error);
    }
};