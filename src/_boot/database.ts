import mongoose from "mongoose";

export const connect = async () => {
    try {

        // const user = process.env.user
        // const pass = process.env.pass
        // const database = process.env.database

        // await mongoose.connect(`mongodb://127.0.0.1:27017/${database}`, {
        //     auth: {
        //         username: user,
        //         password: pass,
        //     },
        //     authSource: "admin",
        // });

        await mongoose.connect('mongodb+srv://rafikandathuvayal:atlasPassword@cluster0.trekfmx.mongodb.net/CineSage?retryWrites=true&w=majority')
        console.log(`🍃 Database Established connection with MongoDB`);

    } catch (error: any) {
        console.error(`❌ Database Connection failed`);
        console.error(error.message);
    }
};
