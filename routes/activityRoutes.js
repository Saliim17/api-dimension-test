const router = require('express').Router();

const activityController = require('../controllers/activityController');

router.get('/', activityController.getActivities);
router.get('/:activityId', activityController.getActivitiesById);
router.post('/', activityController.createActivity);
router.put('/:activityId', activityController.updateActivity);
router.delete('/:activityId', activityController.deleteActivity);

module.exports = router;