import { useState } from "react";
import { useEffect } from "react";

const BASE_CURRENCIES_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

export default function App() {
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  const onConvertButtonClick = async () => {
    if (!fromCurrency || !toCurrency) {
      return;
    }

    try {
      const res = await fetch(
        `${BASE_CURRENCIES_URL}/currencies/${fromCurrency}.json`
      );

      const data = await res.json();
      const conversionRate = data[fromCurrency][toCurrency];

      setResult(amount * conversionRate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const res = await fetch(`${BASE_CURRENCIES_URL}/currencies.json`);
        const data = await res.json();

        setCurrencies(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrencies();
  }, []);

  return (
    <div className="App">
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setResult(null);
        }}
      />
      <select
        name="fromCurrency"
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value=""></option>
        {Object.entries(currencies).map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </select>
      <select name="toCurrency" onChange={(e) => setToCurrency(e.target.value)}>
        <option value=""></option>
        {Object.entries(currencies).map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </select>
      <button type="button" onClick={onConvertButtonClick}>
        Convert
      </button>
      {result && (
        <div>
          Converted amount: {amount} {fromCurrency} = {result} {toCurrency}
        </div>
      )}
    </div>
  );
}
