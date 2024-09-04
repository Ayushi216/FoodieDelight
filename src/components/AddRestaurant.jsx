import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewRestaurant } from "../service/restaurantService";

const AddRestaurant = () => {
  const [imagePreview, setImagePreview] = useState("");

  const [errors, setErrors] = useState({});
  const [newRestaurant, setNewRestaurant] = useState({
    name:"",
    location:"",
    description:"",
    hours:"",
    rating:"",
    image:""
  })
const navigate = useNavigate();

const validate = () => {
  const newErrors = {};

  if (newRestaurant.contact.length < 10 || newRestaurant.contact.length > 10) {
    newErrors.contact = "Contact number must be exactly 10 digits.";
  }


  const hoursRegex = /^([01]\d|2[0-3]):([0-5]\d) [APM]{2} - ([01]\d|2[0-3]):([0-5]\d) [APM]{2}$/;
  if (!hoursRegex.test(newRestaurant.hours)) {
    newErrors.hours = "Hours format must be: hh:mm AM/PM - hh:mm AM/PM";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    addNewRestaurant(newRestaurant)
      .then(() => navigate('/'))
      .catch((error) => console.error("Failed to add restaurant:", error));
  }
};

  const handleBack = () => {
    navigate("/")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile));
      setNewRestaurant((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(selectedFile)
      }));
    }
  };

  return (
    <form className="container border mt-3" onSubmit={handleSubmit}>
      <div className="card-header">
        <h5 className="card-title">Add New Restaurant</h5>
      </div>

      <div className="mb-3 mt-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          type="text"
          className="form-control"
          id="location"
          name="location"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="contact" className="form-label">
          Contact
        </label>
        <input
          type="text"
          className="form-control"
          id="contact"
          name="contact"
          onChange={handleChange}
          required
        />
         {errors.contact && <div className="text-danger">{errors.contact}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="hours" className="form-label">
          Hours
        </label>
        <input
          type="text"
          className="form-control"
          id="hours"
          name="hours"
          onChange={handleChange}
          required
        />
        <div id="hoursHelp" className="form-text">
          Upload in this format: 9:00 AM - 9:00 PM
        </div>
        {errors.hours && <div className="text-danger">{errors.hours}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <input
          type="number"
          className="form-control"
          id="rating"
          name="rating"
          onChange={handleChange}
          required
          min="1"
          max="5"
          step="0.1"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Upload Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Preview" className="img-fluid" />
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
      <button type="submit" className="btn btn-secondary m-2" onClick={handleBack}>
        Back
      </button>
    </form>
  );
};

export default AddRestaurant;
