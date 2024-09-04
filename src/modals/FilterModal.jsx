import React, { useState } from 'react'

const FilterModal = ({ data, setFilteredData, setShowFilterModal}) => {
    const [filters, setFilters] = useState({
      locations: [],
      ratings: []
    });
    const uniqueLocations = [...new Set(data.map((item) => item.location))];
    const availableRatings = [4, 4.5, 5];


    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          if (checked) {
            updatedFilters[name].push(value);
          } else {
            updatedFilters[name] = updatedFilters[name].filter(
              (item) => item !== value
            );
          }
          return updatedFilters;
        });
      };
    
      const applyFilters = () => {
        let filtered = data;
    
        if (filters.locations.length > 0) {
          filtered = filtered.filter((item) =>
            filters.locations.includes(item.location)
          );
        }
    
        if (filters.ratings.length > 0) {
          filtered = filtered.filter((item) =>
            filters.ratings.some((rating) => item.rating >= rating)
          );
        }
    
        setFilteredData(filtered);
        setShowFilterModal(false);
      };
    
      const resetFilters = () => {
        setFilters({ locations: [], ratings: [] }); 
        setFilteredData(data);
      };
  
  return (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filter Restaurants</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowFilterModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    {uniqueLocations.map((location) => (
                      <div key={location} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="locations"
                          value={location}
                          onChange={handleCheckboxChange}
                          checked={filters.locations.includes(location)}
                        />
                        <label className="form-check-label">{location}</label>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    {availableRatings.map((rating) => (
                      <div key={rating} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="ratings"
                          value={rating}
                          onChange={handleCheckboxChange}
                          checked={filters.ratings.includes(String(rating))}
                        />
                        <label className="form-check-label">Above {rating}</label>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={resetFilters}>
                  Reset
                </button>
                <button className="btn btn-primary" onClick={applyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )
  
}

export default FilterModal