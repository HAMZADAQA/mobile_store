import "@testing-library/jest-dom";

jest.spyOn(console, "error").mockImplementation(() => {});

jest.spyOn(console, "warn").mockImplementation(() => {});

jest.spyOn(console, "log").mockImplementation(() => {});
