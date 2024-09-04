import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantDetails } from "../service/restaurantService";

const RestaurantView = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRestaurant = () => {
    getRestaurantDetails().then((data) => {
      const restaurant = data.find((item) => item.id === id);
      setRestaurantData(restaurant);
    });
  };

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  return (
    <div className="container my-4">
      {restaurantData ? (
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">{restaurantData.name}</h1>
          </div>
          <img
            src={restaurantData.image}
            className="card-img-top"
            alt={restaurantData.name}
          />
          <div className="card-body">
            <p className="card-text">{restaurantData.description}</p>
            <p className="card-text">
              <strong>Location:</strong> {restaurantData.location}
            </p>
            <p className="card-text">
              <strong>Contact:</strong> {restaurantData.contact}
            </p>
            <p className="card-text">
              <strong>Rating:</strong> {restaurantData.rating} ⭐
            </p>
            {restaurantData.menu ? (
              <div>
                <h2 className="mt-4">Menu</h2>
                <ul className="list-group">
                  {restaurantData.menu.map((menuItem) => (
                    <li key={menuItem.id} className="list-group-item">
                      {menuItem.name} - ${menuItem.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-4">Edit Menu</button>
              </div>
            ) : (
              <button className="btn btn-primary mt-4">Add Menu</button>
            )}
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center">
          Loading restaurant details...
        </div>
      )}
      <button onClick={() => navigate("/")} className="btn btn-primary mt-4">
        Back
      </button>
    </div>
  );
};

export default RestaurantView;
