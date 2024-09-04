import React, { lazy, Suspense, useEffect, useState } from "react";
import "./Restaurant.css";
import {
  deleteRestaurantDetails,
  getRestaurantDetails,
  updateRestaurantDetails,
} from "../service/restaurantService";
import EditRestaurantModal from "../modals/EditRestaurantModal";
import { useNavigate } from "react-router-dom";
import FilterModal from "../modals/FilterModal";

const Restaurant = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const EditRestaurantModal = lazy(() => import('../modals/EditRestaurantModal'));

  const navigate = useNavigate();

  useEffect(() => {
    getRestaurantDetails()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setError(null);
      })
      .catch((error) =>
        setError(`Failed to fetch details. Please try again later. ${error}`)
      );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleEdit = (restaurant, e) => {
    e.stopPropagation();
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    deleteRestaurantDetails(id)
      .then(() => {
        const updateData = data.filter((item) => item.id !== id);
        setData(updateData);
        setFilteredData(updateData);
      })
      .catch((error) =>
        setError(
          `Failed to delete restaurant. Please try again later. ${error}`
        )
      );
  };

  const handleSave = (updatedRestaurant) => {
    updateRestaurantDetails(updatedRestaurant)
      .then((updatedData) => {
        const updatedList = data.map((item) =>
          item.id === updatedRestaurant.id ? updatedData : item
        );
        setData(updatedList);
        setFilteredData(updatedList);
        setShowModal(false);
      })
      .catch((error) =>
        setError(
          `Failed to update restaurant. Please try again later. ${error}`
        )
      );
  };

  const handleView = (id) => {
    navigate(`/restaurant/${id}`);
  };
  return (
    <div className="container">
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      <form className="d-flex mt-4" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2 w-50"
          type="search"
          placeholder="Search Restaurant"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
        <button
          className="btn bg-dark text-white ms-2"
          type="button"
          onClick={() => setShowFilterModal(true)}
        >
          <i className="bi bi-funnel"></i>
        </button>
      </form>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="col"
              onClick={() => handleView(item.id)}
              role="button"
            >
              <div className="card restaurant-cards">
                <img
                  src={item.image}
                  className="card-img-top img-height"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Location: {item.location}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Rating: {item.rating} ⭐</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Contact: {item.contact}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Hours: {item.hours}</small>
                  </p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={(e) => handleEdit(item, e)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(item.id, e)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-danger">Oops! Nothing here.</div>
        )}
      </div>

      {showModal && (
         <Suspense fallback={<div>Loading...</div>}>
          <EditRestaurantModal
          restaurant={selectedRestaurant}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
       </Suspense>
       
      )}
      {showFilterModal && (
        <FilterModal
          data={data}
          setFilteredData={setFilteredData}
          setShowFilterModal={setShowFilterModal}
        />
      )}
    </div>
  );
};

export default Restaurant;
