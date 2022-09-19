import mongoose from "mongoose";

const imageSchema= new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        data:Buffer,
        contentType:String
    }
})
export default mongoose.model("image", imageSchema);
