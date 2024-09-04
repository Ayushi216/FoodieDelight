
const API_URL = "http://localhost:5000/restaurants";
const getRestaurantDetails = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  const updateRestaurantDetails = async (restaurant) => {
    try {
      const response = await fetch(`${API_URL}/${restaurant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      });
      if (!response.ok) {
        throw new Error("Failed to update restaurant details");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const deleteRestaurantDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete restaurant details");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const addNewRestaurant = async (restaurantData) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add new restaurant");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  export { getRestaurantDetails, updateRestaurantDetails, deleteRestaurantDetails, addNewRestaurant };