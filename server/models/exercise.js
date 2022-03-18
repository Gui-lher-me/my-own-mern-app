const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
