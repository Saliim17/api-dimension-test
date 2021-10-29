const Activity = require('../models/activities.js');

function getActivities(req, res) { // GET all activities
    Activity.find({}, (err, activities) => {
      if (err) return res.status(500).send({ err });
  
      return res.status(200).send(activities);
    });
  }
  
function getActivitiesById(req, res) { // GET activities by Id
  const { activityId } = req.params;

  Activity.findById(activityId, (err, activity) => {
    if (err) return res.status(404).send({ message: `Error ${err}. No activity found` });
    return res.status(200).send(activity);
  });
}

function createActivity(req, res) { // POST activity
  const newActivity = new Activity(req.body);
  newActivity.save((err, newActivityData) => {
    if (err) return res.status(400).send({ message: `Error ${err}. Activity creation failed!` });
    return res.status(200).send(newActivityData);
  });
}

function deleteActivity(req, res) { // DELETE Activity
  const { activityId } = req.params;
}

function updateActivity(req, res) { // PATCH Activity
const { activityId } = req.params;

Activity.findByIdAndUpdate(activityId, req.body, { new: true }, (err, activity) => {
  if (err) return res.status(500).send({ err });

  return res.status(200).send({ message: `Activity ${activity} updated` });
});
}

module.exports = {
getActivities,
getActivitiesById,
createActivity,
deleteActivity,
updateActivity,
}; 