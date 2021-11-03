'use strict';


var mongoose = require('mongoose'),
  SleepHour = mongoose.model('SleepHour');

exports.list_all_sleephours = function(req, res) {
  SleepHour.find({}, function(err, sleephour) {
    if (err)
      res.send(err);
    res.json(sleephour);
  });
};

exports.create_a_sleephour = function(req, res) {
    try{
        const duration = getUpdatedDuration(req.body);
        var new_sleephour = new SleepHour({ ...req.body, duration});
        new_sleephour.save(function(err, sleephour) {
            if (err)
                res.status(500).send(err);
            res.status(200).json(sleephour);
        
        });
    } catch (err){
        console.log('Here with ', err);
        res.status(500).send({ smessage: err?.message });
    }
};

exports.list_a_sleephour = function(req, res) {
  SleepHour.findById(req.params.sleephourId, function(err, sleephour) {
    if (err)
        res.send(err);
    res.json(sleephour);
  });
};


exports.update_a_sleephour = function(req, res) {
    try{
        const updatedPayload = { ...req.body, duration: getUpdatedDuration(req.body)};
        SleepHour.findOneAndUpdate({_id: req.params.sleephourId}, updatedPayload, {new: true}, function(err, sleephour) {
            if (err)
                res.send(err);
            res.json(sleephour);
    });
    } catch(err){
        res.send(err);
    }
  };


exports.delete_a_sleephour = function(req, res) {
  SleepHour.remove({
    _id: req.params.sleephourId
  }, function(err, sleephour) {
    if (err)
      res.send(err);
    res.json({ message: 'Sleephour successfully deleted' });
  });
};

function getUpdatedDuration(body) {
    const { sleepTime, wakeTime } = body;
    console.log(`ST: `, sleepTime, ` and WT: `, wakeTime);
    if (wakeTime < sleepTime){
        throw new Error(`You cant wake up before you fall asleep`);
    }
    return wakeTime - sleepTime;
}