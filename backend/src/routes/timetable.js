const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const timetableController = require('../controllers/timetableController');

router.use(auth);

router.get('/', timetableController.getTimetable);
router.post('/', timetableController.addEvent);
router.put('/:id', timetableController.updateEvent);
router.delete('/:id', timetableController.deleteEvent);

module.exports = router; 