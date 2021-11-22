const router = require('express').Router();
const auth = require('../middleware/auth.js');
const activityController = require('../controllers/activityController');

router.get('/',activityController.getActivities);
router.get('/:activityId', activityController.getActivitiesById);
router.post('/', auth.verifyTokenIsAdmin, activityController.createActivity);
router.put('/:activityId', auth.verifyTokenIsAdmin, activityController.updateActivity);
router.delete('/:activityId', auth.verifyTokenIsAdmin, activityController.deleteActivity);

module.exports = router;