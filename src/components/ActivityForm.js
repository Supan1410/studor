import React, { useState } from 'react';

const ActivityForm = ({ addActivity }) => {
  const [activityName, setActivityName] = useState('');
  const [category, setCategory] = useState('Academic');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!activityName || !date) {
      alert('Please fill in all fields');
      return;
    }
    
    // Validate date
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
      alert('Date cannot be in the future');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addActivity({ name: activityName, category, date });
      setActivityName('');
      setCategory('Academic');
      setDate('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <div className="form-group">
        <label htmlFor="activity-name">Activity Name</label>
        <input
          id="activity-name"
          type="text"
          placeholder="e.g., Completed Studor Assignment"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select 
          id="category"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="Academic">Academic</option>
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? 'Adding...' : 'Log Activity'}
      </button>
    </form>
  );
};

export default ActivityForm;
