import { Schema, model } from "mongoose";

const hotel = new Schema({
  display: { type: String, required: true, trim: true, unique: true },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: { type: String, required: true, trim: true }
});


// hotel.virtual

// hotel.static

// hotel.on('pre', ()=>{})

export default model("Hotel", hotel);
