import mongoose from "mongoose";

const turfSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please provide a turf name"],

  },
  category:{
    type:String,
    required:[true,"Please provide a category"],
  },
  
  size:{
    type:String,
    required:[true,"Please provide a size"],
  },
  location:{
    type:String,
    required:[true,"Please provide a location"],
  },
  address:{
    type:String,
    required:[true,"Please provide a address"],
  },
  characteristics:{
    type:String, 

  },
  image:{
    type:String,
    required:[true,"Please provide a image"],
  },
  slots:[
    {
      startTime: {
        type: String,
        required: [true, "Please provide a start time for the slot"],
      },
      endTime: {
        type: String,
        required: [true, "Please provide an end time for the slot"],
      },
      isBooked: {
        type: Boolean,
        default: false,
      },
  }],
  rate:{
    type:Number,
    required: [true, "Please provide rate"],
  }
})
const Turf=mongoose.models.turfs || mongoose.model("turfs",turfSchema);
export default Turf;