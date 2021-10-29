const router = require('express').Router();

const activityController = require('../controllers/activityController');

router.get('/activities/', activityController.getActivities);
router.get('/activities/:activityId', activityController.getActivitiesById);
router.post('/activities/', activityController.createActivity);
router.patch('/activities/:activityId', activityController.updateActivity);
router.delete('/activities/:activityId', activityController.deleteActivity);

module.exports = router;