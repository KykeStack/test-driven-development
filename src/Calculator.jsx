import { useState } from 'react'
import './Calculator.css'
import { GRID_NUMBERS, GRID_OPERATORS } from '../global/values'

function Calculator () {
  const [value, setValue] = useState('')
  const [sequence, setSequence] = useState(false)

  const handleClick = symbol => () => {
    if (symbol === 'CE') {
      setValue('')
      return
    }

    if (sequence === true) {
      setValue('')
      if (GRID_OPERATORS.indexOf(symbol) !== -1) {
        setValue('0' + symbol)
      } else {
        setValue(symbol.toString())
      }
      setSequence(false)
      return
    }

    if (symbol === '=') {
      if (value === '') {
        return
      }
      const result = eval(value)
      setValue(result.toString())
      setSequence(true)
      return
    }

    if (value.length === 0 && GRID_OPERATORS.indexOf(symbol) !== -1) {
      setValue('0' + symbol)
      return
    }

    setValue(value + symbol)
    let pasreValue = ''
    for (const letter of value) {
      if ((GRID_OPERATORS.indexOf(letter) !== -1
      ) && (GRID_OPERATORS.indexOf(symbol) !== -1) && (
        (pasreValue.length === value.length - 1)
      )) {
        pasreValue = pasreValue + symbol
        setValue(pasreValue)
        continue
      }
      pasreValue += letter
    }
  }
  return (
    <section>
      <h1>Calculator</h1>
      <input className='screenText' value={value} readOnly />
      <div className='card' role='grid'>
        <div key='numbers' role='column'>
          {
            GRID_NUMBERS.map((row, idx) => (
              <div key={idx} role='row' className='child'>
                {row.map(number => <button className='child' key={number} onClick={handleClick(number)}>{number}</button>)}
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Calculator
