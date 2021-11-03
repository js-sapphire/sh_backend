'use strict';
module.exports = function(app) {
  var sleepHourController = require("../controllers/sleepHourController");

  // sleepHour Routes
  app.route('/sleephours')
    .get(sleepHourController.list_all_sleephours)
    .post(sleepHourController.create_a_sleephour);


  app.route('/sleephours/:sleephourId')
    .get(sleepHourController.list_a_sleephour)
    .put(sleepHourController.update_a_sleephour)
    .delete(sleepHourController.delete_a_sleephour);
};
