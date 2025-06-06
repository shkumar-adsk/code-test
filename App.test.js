import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("App Component - Currency Converter", () => {
  const mockCurrencies = {
    usd: { inr: 82.5 },
    inr: { usd: 0.012 },
  };

  const mockCurrencyList = {
    usd: "United States Dollar",
    inr: "Indian Rupee",
    eur: "Euro",
  };

  beforeEach(() => {
    // Mock currency list API response
    axios.get.mockImplementation((url) => {
      if (url.includes("currencies.json")) {
        return Promise.resolve({ data: mockCurrencyList });
      } else if (url.includes("usd.json")) {
        return Promise.resolve({ data: { usd: mockCurrencies.usd } });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Currency Converter heading", async () => {
    render(<App />);
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();
  });
});
