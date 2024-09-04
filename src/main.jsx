import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Restaurant from "./components/Restaurant.jsx";
import AddRestaurant from "./components/AddRestaurant.jsx";
import RestaurantView from "./components/RestaurantView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "/",
      element: <Restaurant />
    },
    {
      path: "/restaurant/:id",
      element: <RestaurantView/>
    },
  {
    path: "/add-new-restaurant",
    element: <AddRestaurant />
  }]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
