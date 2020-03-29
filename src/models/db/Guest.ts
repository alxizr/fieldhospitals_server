import { Schema, model } from "mongoose";

const guest = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minlength: 2
  },
  city: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minlength: 2
  },
  address: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minlength: 2
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 10
  },
  IDNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5
  }
});

// guest.virtual

// guest.static

// guest.on('pre', ()=>{})

export default model("Guest", guest);
