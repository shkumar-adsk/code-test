import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import './App.css'

const queryFn = async () => {
  const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
  if (!(response.status >= 200 && response.status < 300)) {
    console.log('error')
    return
  }
  const result = await response.json()
  return result
}

function App() {
  // const [count, setCount] = useState(0)
  // const [currencyFrom, setCurrencyFrom] = useState('')
  // const [currencyTo, setCurrencyTo] = useState('usd')
  // const [amount, setAmount] = useState()
  const { data, error, loading } = useQuery({ queryFn, queryKey: ['currencies'] })

  const currencies = useMemo(() => { 
    return Object.entries(data ?? {}).map(([key, value]) => ({ key, value }))
  }, data)
  console.log('currencies', currencies)

  return (
    <>
      <header>
        <h1>Title</h1>
      </header>

      <form>
        <label htmlFor='amount'>Amount</label>
        <input id="amount" />

        <label htmlFor="currencyFrom">From</label>
        <select>
          {currencies.map((currency) => (
            <option value={currency.key as string}>{currency.value}</option>
          ))}
        </select>
        <input id="currencyFrom" />

        <label htmlFor='currencyTo'>To</label>
        <input id="currencyTo" />

        <button>Convert</button>
      </form>

      <h3>Converted amount</h3>
      <p></p>
    </>
  )
}

export default App
