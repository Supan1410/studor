import React from 'react';

const ActivityList = ({ activities, onDelete }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Academic: '#3498db',
      Technical: '#2ecc71',
      Cultural: '#2196F3',
      Sports: '#f39c12'
    };
    return colors[category] || '#95a5a6';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (activities.length === 0) {
    return <p className="empty-state">No activities logged yet.</p>;
  }

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div key={activity._id} className="activity-card">
          <div className="activity-content">
            <h3>{activity.name}</h3>
            <div className="activity-meta">
              <span 
                className="category-badge"
                style={{ backgroundColor: getCategoryColor(activity.category) }}
              >
                {activity.category}
              </span>
              <span className="date">{formatDate(activity.date)}</span>
            </div>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDelete(activity._id)}
            title="Delete activity"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
