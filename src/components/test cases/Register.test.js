import { render, screen } from "@testing-library/react";
import RestaurantRegister from '../RegisterRestaurant'
import { Provider } from "react-redux";
import store from '../../store/store'
import userEvent from "@testing-library/user-event"
test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister/>
    </Provider>
  );
  const linkElement = screen.getByPlaceholderText("Enter password");
  expect(linkElement).toBeInTheDocument();
});
test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister />
    </Provider>
  );
  const linkElement = screen.getByPlaceholderText("contactnumber");
  expect(linkElement).toBeInTheDocument();
});
test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister />
    </Provider>
  );
  const linkElement = screen.getByPlaceholderText("Enter RestaurantName");
  expect(linkElement).toBeInTheDocument();
});
test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister />
    </Provider>
  );
  const linkElement = screen.getByRole("button");
  userEvent.click(linkElement);
  expect(linkElement).toBeVisible();
});