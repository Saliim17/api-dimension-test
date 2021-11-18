const Activity = require('../models/activities.js');

function getActivities(req, res) { // GET all activities
    Activity.find({}, (err, activities) => {
      if (err) return res.status(500).send({ err });
  
      return res.status(200).send(activities);
    });
  }
  
function getActivitiesById(req, res) { // GET activities by Id
  const  {activityId} = req.params;

  Activity.findOne({id:activityId}, (err, act) => {
    if (err) return res.status(404).send({ message: `Error ${err}. No activity found` });
    return res.status(200).send(act);
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
  const  { activityId }  = req.params;
  Activity.findOneAndDelete({id: activityId}, (err, act) => {
    if (err) return res.status(500).send({ err });
    if (!act) return res.status(404).send({ message: 'Activity not found!' });

    return res.status(200).send({ message: `Activity ${act} deleted successfully!` });
  });
}

function updateActivity(req, res) { // PUT Activity
  const { activityId } = req.params;

  Activity.findOneAndUpdate({id:activityId}, req.body, { new: true }, (err, activity) => {
    if (err) return res.status(500).send({ err });
    if (!activity) return res.status(404).send({message: 'No activities found with that id.'});

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