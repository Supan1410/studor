import React, { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Filter from './components/Filter';
import './App.css';

const API_URL = 'http://localhost:5000/api/activities';

function App() {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch activities from backend
  const fetchActivities = async (category = 'All') => {
    setLoading(true);
    try {
      const url = category === 'All' 
        ? API_URL 
        : `${API_URL}?category=${category}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      setActivities(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load activities on mount
  useEffect(() => {
    fetchActivities();
  }, []);

  const addActivity = async (activity) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      });
      if (!response.ok) throw new Error('Failed to add activity');
      await fetchActivities(filter);
    } catch (err) {
      setError(err.message);
      console.error('Error adding activity:', err);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete activity');
      await fetchActivities(filter);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting activity:', err);
    }
  };

  const clearAllActivities = async () => {
    if (window.confirm('Are you sure you want to delete all activities? This cannot be undone.')) {
      try {
        const response = await fetch(API_URL, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to clear activities');
        await fetchActivities('All');
        setFilter('All');
      } catch (err) {
        setError(err.message);
        console.error('Error clearing activities:', err);
      }
    }
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    fetchActivities(category);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>PathCredit Logger</h1>
      </header>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="container">
        <div className="form-section">
          <h2>Log New Activity</h2>
          <ActivityForm addActivity={addActivity} />
        </div>

        <div className="feed-section">
          <div className="feed-header">
            <h2>Activity Feed</h2>
            {activities.length > 0 && (
              <button className="clear-btn" onClick={clearAllActivities}>
                Clear All
              </button>
            )}
          </div>
          
          <Filter setFilter={handleFilterChange} currentFilter={filter} />
          
          {loading ? (
            <p className="loading">Loading activities...</p>
          ) : activities.length === 0 ? (
            <p className="empty-state">No activities logged yet. Start by adding one!</p>
          ) : (
            <ActivityList activities={activities} onDelete={deleteActivity} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
