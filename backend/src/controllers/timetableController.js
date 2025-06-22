const Timetable = require('../models/Timetable');

exports.getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ userId: req.userId });
    res.json({ events: timetable ? timetable.events : [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch timetable', error: error.message });
  }
};

exports.addEvent = async (req, res) => {
  try {
    let timetable = await Timetable.findOne({ userId: req.userId });
    if (!timetable) {
      timetable = new Timetable({ userId: req.userId, events: [] });
    }
    timetable.events.push(req.body);
    await timetable.save();
    res.status(201).json({ event: timetable.events[timetable.events.length - 1] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add event', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ userId: req.userId });
    if (!timetable) return res.status(404).json({ message: 'Timetable not found' });
    const idx = timetable.events.findIndex(e => e._id.toString() === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Event not found' });
    timetable.events[idx] = { ...timetable.events[idx]._doc, ...req.body };
    await timetable.save();
    res.json({ event: timetable.events[idx] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ userId: req.userId });
    if (!timetable) return res.status(404).json({ message: 'Timetable not found' });
    timetable.events = timetable.events.filter(e => e._id.toString() !== req.params.id);
    await timetable.save();
    res.json({ message: 'Event deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
}; 