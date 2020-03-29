import { Schema, model } from "mongoose";

const task = new Schema({
  taskType: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    unique: false
  },

  deadline: {
    type: Date,
    required: true,
    default: Date.now()
  },
  responsibility: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    unique: false
  },
  status: {
    type: String,
    trim: true,
    required: true,
    unique: false
  }
});

// task.virtual

// task.static

// task.on('pre', ()=>{})

export default model("Task", task);
