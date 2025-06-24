import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimetable, addEvent, updateEvent, deleteEvent } from '../store/slices/timetableSlice';
import Modal from '../components/UI/Modal';

const Timetable = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.timetable);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'class',
    courseName: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    recurring: 'none',
    color: '#3b82f6'
  });

  useEffect(() => {
    dispatch(fetchTimetable());
  }, [dispatch]);

  const today = new Date();

  // Convert events to calendar format
  const getEventsByDate = () => {
    const eventsByDate = {};
    events.forEach(event => {
      const dateKey = new Date(event.startTime).toISOString().split('T')[0];
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    });
    return eventsByDate;
  };

  const eventsByDate = getEventsByDate();

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isOtherMonth = date.getMonth() !== month;
      const isToday = date.toDateString() === today.toDateString();
      const dateKey = date.toISOString().split('T')[0];
      const dayEvents = eventsByDate[dateKey] || [];
      
      days.push({
        date,
        isOtherMonth,
        isToday,
        events: dayEvents
      });
    }
    
    return days;
  };

  const prevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleAddEvent = () => {
    setShowAddModal(true);
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setEventForm(prev => ({ 
      ...prev, 
      startTime: `${today}T09:00`,
      endTime: `${today}T10:00`
    }));
  };

  const handleFormChange = (e) => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    
    const eventData = {
      title: eventForm.title,
      type: eventForm.type,
      courseName: eventForm.courseName,
      startTime: new Date(eventForm.startTime).toISOString(),
      endTime: new Date(eventForm.endTime).toISOString(),
      location: eventForm.location,
      description: eventForm.description,
      recurring: eventForm.recurring,
      color: eventForm.color
    };

    try {
      await dispatch(addEvent(eventData)).unwrap();
    setShowAddModal(false);
    setEventForm({
      title: '',
      type: 'class',
        courseName: '',
        startTime: '',
        endTime: '',
        location: '',
      description: '',
        recurring: 'none',
      color: '#3b82f6'
    });
    } catch (error) {
      console.error('Failed to add event:', error);
      alert('Failed to add event. Please try again.');
    }
  };

  const handleEditEvent = () => {
    alert('Edit functionality would open here');
  };

  const handleDeleteEvent = () => {
    alert('Delete functionality would open here');
  };

  const getEventClass = (event) => {
    const eventLower = event.title.toLowerCase();
    if (eventLower.includes('math')) return 'math';
    if (eventLower.includes('science') || eventLower.includes('chemistry') || eventLower.includes('physics')) return 'science';
    if (eventLower.includes('english')) return 'english';
    if (eventLower.includes('history')) return 'history';
    return '';
  };

  const formatEventTime = (event) => {
    const startTime = new Date(event.startTime);
    return startTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const calendarDays = renderCalendar();
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (loading) return <div className="loading">Loading timetable...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="timetable-page">
      <div className="timetable-content">
        <div className="calendar-container">
          <div className="calendar-header">
            <h1>Timetable</h1>
            <div className="calendar-controls">
              <div className="calendar-nav">
                <button onClick={prevMonth}>‹</button>
                <span className="month-year">{monthYear}</span>
                <button onClick={nextMonth}>›</button>
              </div>
              <button className="add-event" onClick={handleAddEvent}>+ Add Event</button>
            </div>
          </div>
          
          <div className="calendar-grid">
            {/* Day headers */}
            <div className="calendar-day-header">Sun</div>
            <div className="calendar-day-header">Mon</div>
            <div className="calendar-day-header">Tue</div>
            <div className="calendar-day-header">Wed</div>
            <div className="calendar-day-header">Thu</div>
            <div className="calendar-day-header">Fri</div>
            <div className="calendar-day-header">Sat</div>
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${day.isOtherMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''}`}
                onClick={() => setSelectedDate(day.date)}
              >
                <div className="calendar-day-number">{day.date.getDate()}</div>
                {day.events.map((event, eventIndex) => (
                  <div
                    key={event._id || eventIndex}
                    className={`calendar-event ${getEventClass(event)}`}
                    title={`${event.title} - ${formatEventTime(event)}`}
                    style={{ backgroundColor: event.color || '#3b82f6' }}
                  >
                    <div className="event-title">{event.title}</div>
                    <div className="event-time">{formatEventTime(event)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Event"
      >
        <form onSubmit={handleSubmitEvent} className="event-form">
          <div className="form-group">
            <label className="form-label">Event Title</label>
            <input
              type="text"
              name="title"
              value={eventForm.title}
              onChange={handleFormChange}
              className="form-input"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Event Type</label>
            <select
              name="type"
              value={eventForm.type}
              onChange={handleFormChange}
              className="form-select"
            >
              <option value="class">Class</option>
              <option value="exam">Exam</option>
              <option value="assignment">Assignment</option>
              <option value="study">Study Session</option>
              <option value="break">Break</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={eventForm.courseName}
              onChange={handleFormChange}
              className="form-input"
              placeholder="Enter course name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={eventForm.startTime}
              onChange={handleFormChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={eventForm.endTime}
              onChange={handleFormChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={eventForm.location}
              onChange={handleFormChange}
              className="form-input"
              placeholder="Enter location"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Recurring</label>
            <select
              name="recurring"
              value={eventForm.recurring}
              onChange={handleFormChange}
              className="form-select"
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={eventForm.description}
              onChange={handleFormChange}
              className="form-textarea"
              placeholder="Enter event description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <input
              type="color"
              name="color"
              value={eventForm.color}
              onChange={handleFormChange}
              className="form-input"
              style={{ width: '60px', height: '40px', padding: '2px' }}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Timetable; 