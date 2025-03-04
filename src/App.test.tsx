import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/Home/Home", () => () => <div>Home Page</div>);
jest.mock("./pages/Detail/Detail", () => () => <div>Detail Page</div>);
jest.mock("./pages/Cart/Cart", () => () => <div>Cart Page</div>);
jest.mock("./components/Navbar/Navbar", () => () => <nav>Navbar</nav>);

describe("App Component", () => {
  test("renders Navbar and Home page by default", () => {
    render(<App />);

    expect(screen.getByText("Navbar")).toBeInTheDocument();

    expect(screen.getByText("Home Page")).toBeInTheDocument();

    const mainElement = document.querySelector("main.container");
    expect(mainElement).toBeInTheDocument();
  });
});
