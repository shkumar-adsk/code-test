import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState("usd");
  const [currencyTo, setCurrencyTo] = useState("inr");
  const [conversionRates, setConversionRates] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const res = await axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
        );
        setCurrencyList(Object.keys(res.data));
      } catch (err) {
        console.error("Error fetching currency list:", err);
        setError("Failed to load currency list.");
      }
    };
    fetchCurrencyList();
  }, []);

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyFrom}.json`
        );
        setConversionRates(res.data[currencyFrom]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching conversion rate:", err);
        setError("Failed to fetch conversion rate.");
        setLoading(false);
      }
    };
    fetchConversionRates();
  }, [currencyFrom]);

  const handleConvert = () => {
    if (
      !amount ||
      isNaN(amount) ||
      amount <= 0 ||
      !conversionRates?.[currencyTo]
    ) {
      setError("Please enter a valid amount and select currencies.");
      return;
    }
    const convertedAmount = (conversionRates[currencyTo] * amount).toFixed(2);
    setResult(`$${amount} ${currencyFrom} = ${convertedAmount} ${currencyTo}`);
    setError("");
  };

  return (
    <div className="App">
      <h2>Currency Converter</h2>

      <div>
        <input
          type="number"
          value={amount}
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label>From:</label>
        <select
          value={currencyFrom}
          onChange={(e) => setCurrencyFrom(e.target.value)}
        >
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>To:</label>
        <select
          value={currencyTo}
          onChange={(e) => setCurrencyTo(e.target.value)}
        >
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConvert}
        disabled={loading || !currencyList.length}
      >
        {loading ? "Loading..." : "Convert Currency"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <h3>{result}</h3>}
    </div>
  );
}

export default App;
