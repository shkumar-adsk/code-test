import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";

// Mock fetch API
const mockCurrencies = {
  usd: "US Dollar",
  eur: "Euro",
  gbp: "British Pound",
  jpy: "Japanese Yen",
};

const mockConversionData = {
  usd: {
    eur: 0.85,
    gbp: 0.75,
    jpy: 110.15,
  },
};

// Setup fetch mock
vi.stubGlobal("fetch", vi.fn());

function mockFetch(url) {
  if (url.includes("/currencies.json")) {
    return Promise.resolve({
      json: () => Promise.resolve(mockCurrencies),
    });
  }

  if (url.includes("/currencies/usd.json")) {
    return Promise.resolve({
      json: () => Promise.resolve(mockConversionData),
    });
  }

  return Promise.reject(new Error("Unhandled fetch mock"));
}

describe("Currency Converter App", () => {
  beforeEach(() => {
    fetch.mockImplementation(mockFetch);
  });

  it("renders initial UI elements", async () => {
    render(<App />);

    // Check for input field
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();

    // Check for both dropdowns
    expect(screen.getAllByRole("combobox").length).toBe(2);

    // Check for convert button
    expect(
      screen.getByRole("button", { name: /convert/i })
    ).toBeInTheDocument();

    // Wait for currencies to load
    await waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options.length).toBeGreaterThan(2); // 2 empty options + currency options
    });
  });

  it("allows selecting currencies", async () => {
    render(<App />);

    // Wait for currencies to load
    await waitFor(() => {
      expect(screen.getAllByRole("option").length).toBeGreaterThan(2);
    });

    // Select from currency
    const fromSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(fromSelect, { target: { value: "usd" } });

    // Select to currency
    const toSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(toSelect, { target: { value: "eur" } });

    expect(fromSelect.value).toBe("usd");
    expect(toSelect.value).toBe("eur");
  });

  it("allows changing amount", () => {
    render(<App />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "100" } });

    expect(input.value).toBe("100");
  });

  it("converts currency when button is clicked", async () => {
    render(<App />);

    // Wait for currencies to load
    await waitFor(() => {
      expect(screen.getAllByRole("option").length).toBeGreaterThan(2);
    });

    // Set amount
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "100" } });

    // Select currencies
    const [fromSelect, toSelect] = screen.getAllByRole("combobox");
    fireEvent.change(fromSelect, { target: { value: "usd" } });
    fireEvent.change(toSelect, { target: { value: "eur" } });

    // Click convert button
    const convertButton = screen.getByRole("button", { name: /convert/i });
    fireEvent.click(convertButton);

    // Check result display
    await waitFor(() => {
      expect(
        screen.getByText(/Converted amount: 100 usd = 85 eur/i)
      ).toBeInTheDocument();
    });
  });

  it("doesn't show result before conversion", () => {
    render(<App />);

    expect(screen.queryByText(/Converted amount:/i)).not.toBeInTheDocument();
  });

  it("clears result when amount is changed", async () => {
    render(<App />);

    // Setup for conversion
    await waitFor(() => {
      expect(screen.getAllByRole("option").length).toBeGreaterThan(2);
    });

    const input = screen.getByRole("spinbutton");
    const [fromSelect, toSelect] = screen.getAllByRole("combobox");
    const convertButton = screen.getByRole("button", { name: /convert/i });

    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.change(fromSelect, { target: { value: "usd" } });
    fireEvent.change(toSelect, { target: { value: "eur" } });
    fireEvent.click(convertButton);

    // Wait for result
    await waitFor(() => {
      expect(screen.getByText(/Converted amount:/i)).toBeInTheDocument();
    });

    // Change amount
    fireEvent.change(input, { target: { value: "200" } });

    // Result should be gone
    expect(screen.queryByText(/Converted amount:/i)).not.toBeInTheDocument();
  });
});
