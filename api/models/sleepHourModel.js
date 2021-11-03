
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SleepHourSchema = new Schema({
  userId: {
    type: String,
    required: 'Empty userId'
  },
  date: {
    type: Date,
    required: 'Kindly enter the date of the sleep session'
  },
  sleepTime: {
    type: Date,
    required: "Enter sleep time"
  },
  wakeTime: {
    type: Date,
    required: "Enter wake time"
  },
  duration: {
      type: Number
  }
});

module.exports = mongoose.model('SleepHour', SleepHourSchema);