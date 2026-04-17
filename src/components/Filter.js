import React from 'react';

const Filter = ({ setFilter, currentFilter }) => {
  return (
    <div className="filter-section">
      <label htmlFor="category-filter">Filter by Category:</label>
      <select 
        id="category-filter"
        value={currentFilter} 
        onChange={(e) => setFilter(e.target.value)}
        className="filter-select"
      >
        <option value="All">All</option>
        <option value="Academic">Academic</option>
        <option value="Technical">Technical</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
      </select>
    </div>
  );
};

export default Filter;
